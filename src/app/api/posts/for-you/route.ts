import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;//postid
    const {user} = await validateRequest();

    const pageSize = 10;


    if(!user){
      return Response.json({error: "Unauthorized"}, {status: 401});
    }

    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: {createdAt: "desc"},
      take: pageSize + 1,
      cursor: cursor ? {id: cursor} : undefined
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}