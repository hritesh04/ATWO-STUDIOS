import { NextRequest, NextResponse } from "next/server";
import { calendar, calendar_v3 } from "@googleapis/calendar";
import { OAuth2Client } from "google-auth-library";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, name, email, message } = body;

    if (!date || !time || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: date, time, name, email" },
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

    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(
      startDateTime.getTime() + SLOT_DURATION_MINUTES * 60 * 1000
    );

    const event: calendar_v3.Schema$Event = {
      summary: `Discovery Call — ${name}`,
      description: [
        `Name: ${name}`,
        `Email: ${email}`,
        message ? `Message: ${message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: timezone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: timezone,
      },
      attendees: [{ email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 15 },
        ],
      },
    };

    const result = await cal.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: "all",
    });

    return NextResponse.json({
      success: true,
      eventId: result.data.id,
      htmlLink: result.data.htmlLink,
    });
  } catch (error: unknown) {
    console.error("Calendar booking error:", error);
    const message = "INTERNAL SERVER ERROR";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
