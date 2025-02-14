"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { createPost } from "@/actions/post.action";
import toast from "react-hot-toast";

const CreatePost = () => {
  const { user } = useUser(); // The useUser() hook provides access to the current user's User object, which contains all the data for a single user in your application and provides methods to manage their account.

  // Need state
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false); // this will be for a dropzone component where you can drop images to upload

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      const result = await createPost(content, imageUrl);

      if (result?.success) {
        // reset the form
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);

        toast.success("Post created successfully");
      }
    } catch (err) {
      console.error("Failed to create post: ", err);
      toast.error("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };

  console.log(user);

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.imageUrl || "/avatar.png"} />
          </Avatar>
          <Textarea
            placeholder={`What's on your mind, ${user?.firstName}?`}
            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPosting}
          />
        </div>

        {/* TODO: HANDLE IMAGE UPLOADS */}

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
              onClick={() => setShowImageUpload(!showImageUpload)}
              disabled={isPosting}
            >
              <ImageIcon />
              Photo
            </Button>
          </div>
          <Button
            className="flex items-center"
            onClick={handleSubmit}
            disabled={(!content.trim() && !imageUrl) || isPosting}
          >
            {isPosting ? (
              <>
                <Loader2Icon className="size-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <SendIcon className="size-4 mr-2" />
                Post
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
