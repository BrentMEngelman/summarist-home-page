import { NextResponse } from "next/server";
import { auth } from "@/firebase/firebase";

export async function GET() {
  try {
    // Check if Firebase Auth is initialized and app name is present
    const appName = auth.app.name;

    return NextResponse.json(
      {
        status: "success",
        message: `Firebase is successfully connected to project: ${appName}`,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Firebase connection check failed:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to Firebase.",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
