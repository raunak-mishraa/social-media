import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { unstable_cache } from "next/cache";

export default function TrendsSidebar() {
    return <div className="sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-5">
       <Suspense fallback={<Loader2 className="mx-auto animate-spin"/>}>
        <WhoToFollow />
        <TrendingTopics />
       </Suspense>{/* Suspense only works in child components and server side rendering */}
        {/* <Trends /> */}
    </div>
}

async function WhoToFollow() {
    const {user} = await validateRequest();//current user, its duplicate of catch function so it will only be calld once
    if(!user) return null;  
    const usersToFollow = await prisma.user.findMany({
        where: {
            NOT: {
                id: user.id//exclude current user 
            }
        },
        select: userDataSelect,
        take: 5
    });
    return <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-xl font-bold">Who to follow</div>
        {usersToFollow.map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-3">
                <Link
                    href={`/users/${user.username}`}
                    className="flex items-center gap-3"
                >
                    <UserAvatar avatarUrl={user.avatarUrl} className="flex-none"/>
                    <div>
                        <p className="line-clamp-1 break-all font-semibold hover:underline">
                            {user.displayName}
                        </p>
                        <p className="line-clamp-1 break-all text-muted-foreground">
                            @{user.username}
                        </p>
                    </div>
                </Link>
                <Button>Follow</Button>
            </div>
        ))}
    </div>
}

const getTrendingTopics = unstable_cache()

async function TrendingTopics() {

}