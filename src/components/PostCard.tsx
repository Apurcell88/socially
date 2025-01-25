"use client";

import React, { useState } from "react";
import { Post } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

// useUser() provides access to the current user's User object, which contains all the data for a single user in your application and provides methods to manage their account. This hook also allows you to check if the user is signed in and if Clerk has loaded and initialized.
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

  return <div>PostCard</div>;
};

export default PostCard;
