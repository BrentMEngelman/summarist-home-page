import { NextResponse } from "next/server";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
// If using SQL pool instead: import pool from "@/services/db";

export async function GET() {
  try {
    // 1. Test Firestore Connection (reads a test document)
    const docRef = doc(db, "_health_check", "test");
    await getDoc(docRef);

   
    // // 2. If testing Cloud SQL instead, uncomment below:
    // const client = await pool.connect();
    // const result = await client.query('SELECT NOW()');
    // client.release();
  

    return NextResponse.json({
      status: "success",
      message: "Database connection is active and responding!",
      timestamp: new Date().toISOString(),
    }, { status: 200 });

  } catch (error: any) {
    console.error("Database connection check failed:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to connect to the database.",
      details: error.message,
    }, { status: 500 });
  }
}