import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Contact from "@/models/Contact";

export const GET = async (request) => {
  try {
    await connect();
    const posts = await Contact.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
