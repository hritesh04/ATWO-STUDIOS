import { NextRequest, NextResponse } from "next/server";
import { calendar, calendar_v3 } from "@googleapis/calendar";
import { OAuth2Client } from "google-auth-library";

const BOOKING_HOURS = [10, 11, 12, 14, 15, 16, 17];
const SLOT_DURATION_MINUTES = 30;

function getCalendarClient(): calendar_v3.Calendar {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Calendar credentials not configured");
  }

  const oauth2Client = new OAuth2Client(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return calendar({ version: "v3", auth: oauth2Client });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    if (!dateStr) {
      return NextResponse.json(
        { error: "Date parameter is required (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const timezone = process.env.GOOGLE_CALENDAR_TIMEZONE || "Asia/Kolkata";

    if (!calendarId) {
      return NextResponse.json(
        { error: "Calendar not configured" },
        { status: 500 }
      );
    }

    const cal = getCalendarClient();

    // Build time range for the requested date
    const dayStart = new Date(`${dateStr}T00:00:00`);
    const dayEnd = new Date(`${dateStr}T23:59:59`);

    // Fetch existing events for the day
    const eventsRes = await cal.events.list({
      calendarId,
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      timeZone: timezone,
    });

    const busySlots = (eventsRes.data.items || []).map(
      (event: calendar_v3.Schema$Event) => ({
        start: new Date(event.start?.dateTime || event.start?.date || ""),
        end: new Date(event.end?.dateTime || event.end?.date || ""),
      })
    );

    // Generate available slots
    const availableSlots: { time: string; label: string }[] = [];

    for (const hour of BOOKING_HOURS) {
      const slotStart = new Date(
        `${dateStr}T${String(hour).padStart(2, "0")}:00:00`
      );
      const slotEnd = new Date(
        slotStart.getTime() + SLOT_DURATION_MINUTES * 60 * 1000
      );

      // Skip slots in the past
      if (slotStart < new Date()) continue;

      // Check if slot overlaps with any busy period
      const isConflict = busySlots.some(
        (busy: { start: Date; end: Date }) =>
          slotStart < busy.end && slotEnd > busy.start
      );

      if (!isConflict) {
        const label = slotStart.toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: timezone,
        });
        availableSlots.push({
          time: `${String(hour).padStart(2, "0")}:00`,
          label,
        });
      }
    }

    return NextResponse.json({ slots: availableSlots, date: dateStr });
  } catch (error: unknown) {
    console.error("Calendar slots error:", error);
    const message = "INTERNAL SERVER ERROR";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
