"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { handleTagClick } from "../func/handleTagClick";

interface HashTagsProps {
  tags: string[];
}

const HashTags = ({ tags }: HashTagsProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-start flex-wrap gap-x-2 gap-y-4 mx-auto">
      {tags.map((tag) => (
        <button
          className="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
          key={tag}
          onClick={() => handleTagClick(tag, router)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default HashTags;
