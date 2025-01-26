"use client";

import React, { useState } from "react";
// import { Post } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { getPosts, toggleLike } from "@/actions/post.action";

// useUser() provides access to the current user's User object, which contains all the data for a single user in your application and provides methods to manage their account. This hook also allows you to check if the user is signed in and if Clerk has loaded and initialized.
type Posts = Awaited<ReturnType<typeof getPosts>>; // we use Awaited since this returns a Promise. ReturnType gives the return type of the getPosts function which is a Promise. typeof getPosts gets the type of the getPosts function itself.
type Post = Posts[number];

const PostCard = ({
  post,
  dbUserId,
}: {
  post: Post;
  dbUserId: string | null;
}) => {
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false); // keeps track of loading
  const [isLiking, setIsLiking] = useState(false); // keeps track of loading
  const [isDeleting, setIsDeleting] = useState(false); // keeps track of loading
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === dbUserId)
  ); // keeps track of loading
  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes); // this will display the number of likes on the client side. The server side needs time to load and we don't want to wait for that. That's why we use "optimistic".

  const handleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptimisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(post.id);
    } catch (err) {
      setOptimisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === dbUserId));
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {};

  const handleDeletePost = async () => {};

  return <div>PostCard</div>;
};

export default PostCard;
