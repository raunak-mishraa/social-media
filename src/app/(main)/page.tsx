import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {//include the user object in the post object, prisma way to join tables
      user: {
        select: {
            username: true,
            displayName: true,
            avatarUrl: true,
        },
      }
    },
    orderBy: {createdAt: "desc"},
  });
  return (
    <main className="h-[200vh] w-full">
      <div className="w-full min-w-0 space-y-5">
      <PostEditor />
      {posts.map((post) => (
        <Post key={post.id} post={post}/>
      )
      )}
      </div>
    </main>
  );
}
