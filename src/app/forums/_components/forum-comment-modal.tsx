"use client";

import React from "react";
import { Send, Trash2, X } from "lucide-react";
import type { ForumPostView } from "@/lib/forums-types";

interface Props {
  open: ForumPostView | null;
  onClose: () => void;
  newComment: string;
  setNewComment: (v: string) => void;
  addComment: () => Promise<void> | void;
  busy: boolean;
  canModerateComments?: boolean;
  onDeleteComment?: (commentId: string) => Promise<void> | void;
}

export default function ForumCommentModal({
  open,
  onClose,
  newComment,
  setNewComment,
  addComment,
  busy,
  canModerateComments = false,
  onDeleteComment,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 overflow-y-auto anim-fade-in">
      <div className="pixel-card-light p-8 max-w-2xl w-full my-10 anim-pop">
        <div className="flex items-center justify-between mb-4">
          <span className="font-pixel text-[9px] px-2 py-1 bg-[#030213] text-[#f4f4f6]">{open.category.toUpperCase()}</span>
          <button onClick={onClose} className="text-[#5a5d66] hover:text-[#030213]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2 className="font-pixel text-base silver-text-dark leading-relaxed mb-2">{open.title}</h2>
        <p className="font-pixel-readable text-lg text-[#8a8d96] mb-5">by {open.author} - {open.time}</p>
        <p className="font-pixel-readable text-xl text-[#030213] mb-8 leading-snug">{open.body}</p>

        <div className="border-t-2 border-[#b9bbc2] pt-6">
          <h3 className="font-pixel text-[11px] silver-text-dark mb-5">COMMENTS ({open.comments.length})</h3>
          <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
            {open.comments.map((comment) => (
              <div key={comment.id} className="border-l-2 border-[#030213] pl-4 pr-2 py-2 anim-fade-up">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-pixel-readable text-lg text-[#5a5d66] mb-1">
                      {comment.author} - {comment.time}
                    </p>
                    <p className="font-pixel-readable text-xl text-[#030213]">{comment.text}</p>
                  </div>
                  {canModerateComments ? (
                    <button
                      type="button"
                      className="pixel-btn text-[10px] inline-flex items-center gap-2"
                      onClick={() => void onDeleteComment?.(comment.id)}
                      disabled={busy}
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            {open.comments.length === 0 ? (
              <p className="font-pixel-readable text-xl text-[#8a8d96]">&gt; No comments yet. Be the first!</p>
            ) : null}
          </div>
          <div className="flex gap-3">
            <label htmlFor="new-comment" className="sr-only">Add a comment</label>
            <input
              id="new-comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="pixel-input-light flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void addComment();
                }
              }}
              aria-label="Add a comment"
            />
            <button
              onClick={() => void addComment()}
              className="pixel-btn flex items-center gap-2 text-[11px]"
              aria-label="Post comment"
              disabled={busy}
            >
              <Send className="w-3 h-3" /> Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
