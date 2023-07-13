import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";

export const GET = async (request) => {
  try {
    await connect();
    await User.find();
    return new NextResponse({ status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
