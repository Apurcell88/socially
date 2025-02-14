import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export async function generateMetadata({
  // this function comes from nextjs docs
  params,
}: {
  params: { username: string };
}) {
  const user = await getProfileByUsername(params.username);
  if (!user) return;

  return {
    title: user.name ?? user.username,
    description: user.bio || `Check out ${user.username}'s profile`,
  };
}

const ProfilePageServer = async ({
  params,
}: {
  params: { username: string };
}) => {
  //   console.log(params);
  const user = await getProfileByUsername(params.username);

  if (!user) notFound(); // comes built into next.js. Shows a 404 page error

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  ); // this is a client component. We need this separate because the code above is server side (obviously)
};

export default ProfilePageServer;
