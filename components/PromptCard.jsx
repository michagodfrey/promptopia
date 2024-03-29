"use client";
import  { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <p></p>
      <div className="flex justify-between items-start gap-5">
        <Link
          href={
            session?.user.id === post.creator._id
              ? "/profile"
              : `/profile/${post.creator._id}?name=${post.creator.username}`
          }
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3>{post.creator.username}</h3>
            <p>{post.creator.email}</p>
          </div>
        </Link>
        <div onClick={handleCopy} className="copy_btn">
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        #{post.tag}
      </p>

      {session?.user._id === post.creator.id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            onClick={handleEdit}
            className="font-inter text-sm green_gradient cursor-pointer"
          >
            Edit
          </p>
          <p
            onClick={handleDelete}
            className="font-inter text-sm orange_gradient cursor-pointer"
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard