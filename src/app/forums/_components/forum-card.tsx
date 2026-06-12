"use client";

import { MessageCircle } from "lucide-react";
import type { ForumPostView } from "@/lib/forums-types";

type ForumCardProps = {
  forum: ForumPostView;
  index: number;
  onOpen: (forumId: string) => void;
  showAdminActions?: boolean;
  onApprove?: (forumId: string) => void;
  onDelete?: (forumId: string) => void;
  busy?: boolean;
};

export function ForumCard({
  forum,
  index,
  onOpen,
  showAdminActions = false,
  onApprove,
  onDelete,
  busy = false,
}: ForumCardProps) {
  const isPending = forum.status === "PENDING";

  return (
    
    <div role="button" onClick={() => onOpen(forum.id)} className={`pixel-card-light p-6 text-left anim-fade-up forum-delay-${index}`}>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-pixel text-[9px] px-2 py-1 bg-[#030213] text-[#f4f4f6]">
            {forum.category.toUpperCase()}
          </span>
          {isPending ? (
            <span className="font-pixel text-[9px] px-2 py-1 border-2 border-[#f59e0b] text-[#b45309] bg-[#fffbeb]">
              PENDING
            </span>
          ) : null}
          <span className="font-pixel-readable text-lg text-[#8a8d96]">
            by {forum.author} - {forum.time}
          </span>
        </div>
        {showAdminActions && isPending ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="pixel-btn text-[10px]"
              onClick={(e) => {
                e.stopPropagation();
                onApprove?.(forum.id);
              }}
              disabled={busy}
            >
              Approve
            </button>
            <button
              type="button"
              className="pixel-btn text-[10px]"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(forum.id);
              }}
              disabled={busy}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
      <h3 className="font-pixel text-[13px] silver-text-dark mb-3 leading-relaxed">
        {forum.title}
      </h3>
      <p className="font-pixel-readable text-xl text-[#030213] mb-4 leading-snug">{forum.body}</p>
      <div className="flex items-center gap-2 font-pixel-readable text-lg text-[#5a5d66]">
        <MessageCircle className="w-4 h-4" /> {forum.comments.length} comments
      </div>
    </div>
  );
}

export default ForumCard;
