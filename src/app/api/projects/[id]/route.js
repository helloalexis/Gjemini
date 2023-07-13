import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Projects";

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();
    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
