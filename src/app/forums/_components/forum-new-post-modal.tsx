"use client";

import React, { FormEvent } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  newTitle: string;
  setNewTitle: (v: string) => void;
  newBody: string;
  setNewBody: (v: string) => void;
  newCat: string;
  setNewCat: (v: string) => void;
  categories: readonly string[];
  onSubmit: (e: FormEvent) => void;
  busy: boolean;
}

export default function ForumNewPostModal({
  open,
  onClose,
  newTitle,
  setNewTitle,
  newBody,
  setNewBody,
  newCat,
  setNewCat,
  categories,
  onSubmit,
  busy,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 anim-fade-in">
      <div className="pixel-card-light p-8 max-w-2xl w-full anim-pop">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-pixel text-base silver-text-dark">NEW FORUM</h2>
          <button onClick={onClose} className="text-[#5a5d66] hover:text-[#030213]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="new-title" className="font-pixel text-[10px] silver-text-dark mb-2 block">
              TITLE
            </label>
            <input
              id="new-title"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="pixel-input-light"
              placeholder="Short, descriptive title"
            />
          </div>
          <div>
            <label htmlFor="new-cat" className="font-pixel text-[10px] silver-text-dark mb-2 block">
              CATEGORY
            </label>
            <select
              id="new-cat"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className="pixel-input-light"
              aria-label="Select category"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="new-body" className="font-pixel text-[10px] silver-text-dark mb-2 block">
              BODY
            </label>
            <textarea
              id="new-body"
              required
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              rows={5}
              className="pixel-input-light resize-vertical"
              placeholder="Write your question or discussion prompt here"
            />
          </div>
          <button type="submit" className="pixel-btn w-full text-[11px]" disabled={busy}>
            {busy ? "Submitting..." : "Submit For Approval"}
          </button>
        </form>
      </div>
    </div>
  );
}
