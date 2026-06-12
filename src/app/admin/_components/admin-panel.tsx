"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MessageSquare, Trash2, UserCircle2 } from "lucide-react";
import type { ForumPostView } from "@/lib/forums-types";

type ForumUserMapping = {
  id: string;
  username: string;
  email: string;
};

async function requestJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorText =
      typeof payload?.error === "string" ? payload.error : "Something went wrong.";
    throw new Error(errorText);
  }

  return payload as T;
}

export function AdminPanel() {
  const [pendingForums, setPendingForums] = useState<ForumPostView[]>([]);
  const [publishedForums, setPublishedForums] = useState<ForumPostView[]>([]);
  const [mappedUsers, setMappedUsers] = useState<ForumUserMapping[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const loadAdminData = async () => {
    const [published, pending, mapping] = await Promise.all([
      requestJson<{ forums: ForumPostView[] }>("/api/forums/posts", { cache: "no-store" }),
      requestJson<{ forums: ForumPostView[] }>("/api/forums/admin/pending", {
        cache: "no-store",
      }),
      requestJson<{ users: ForumUserMapping[] }>("/api/forums/admin/user-mapping", {
        cache: "no-store",
      }),
    ]);

    setPublishedForums(published.forums);
    setPendingForums(pending.forums);
    setMappedUsers(mapping.users);
  };

  useEffect(() => {
    const boot = async () => {
      setLoading(true);
      try {
        await loadAdminData();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load admin panel.";
        setStatus(message);
      } finally {
        setLoading(false);
      }
    };

    void boot();
  }, []);

  const approveForum = async (forumId: string) => {
    setBusy(true);
    setStatus("");
    try {
      await requestJson(`/api/forums/posts/${forumId}/approve`, { method: "POST" });
      setStatus("Forum approved and published.");
      await loadAdminData();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not approve forum.";
      setStatus(message);
    } finally {
      setBusy(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    setBusy(true);
    setStatus("");
    try {
      await requestJson(`/api/forums/comments/${commentId}`, { method: "DELETE" });
      setStatus("Comment deleted.");
      await loadAdminData();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not delete comment.";
      setStatus(message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="pixel-card-light p-6">
        <p className="font-pixel-readable text-lg text-[#5a5d66]">&gt; Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] pixel-grid-light px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_260px] gap-8">
        <main className="space-y-8">
          <section className="pixel-card-light p-6">
            <h1 className="font-pixel text-base silver-text-dark mb-2">ADMIN PANEL</h1>
            <p className="font-pixel-readable text-lg text-[#5a5d66]">
              Forums moderation, approvals, and comment controls
            </p>
            {status ? (
              <p className="font-pixel-readable text-base text-[#030213] mt-3">&gt; {status}</p>
            ) : null}
          </section>

          <section className="pixel-card-light p-6">
            <h2 className="font-pixel text-[11px] silver-text-dark mb-4">
              PENDING FORUMS ({pendingForums.length})
            </h2>
            <div className="space-y-4">
              {pendingForums.length === 0 ? (
                <p className="font-pixel-readable text-base text-[#8a8d96]">No pending forums.</p>
              ) : (
                pendingForums.map((forum) => (
                  <article key={forum.id} className="border-2 border-[#030213] p-4 bg-white">
                    <p className="font-pixel text-[9px] mb-2">{forum.category.toUpperCase()}</p>
                    <h3 className="font-pixel text-[12px] mb-2">{forum.title}</h3>
                    <p className="font-pixel-readable text-lg mb-3">{forum.body}</p>
                    <p className="font-pixel-readable text-base text-[#5a5d66] mb-4">
                      by {forum.author}
                    </p>
                    <button
                      className="pixel-btn text-[11px] inline-flex items-center gap-2"
                      onClick={() => void approveForum(forum.id)}
                      disabled={busy}
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve & Publish
                    </button>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="pixel-card-light p-6">
            <h2 className="font-pixel text-[11px] silver-text-dark mb-4">
              PUBLISHED FORUMS ({publishedForums.length})
            </h2>
            <div className="space-y-6">
              {publishedForums.map((forum) => (
                <article key={forum.id} className="border-2 border-[#030213] p-4 bg-white">
                  <h3 className="font-pixel text-[12px] mb-2">{forum.title}</h3>
                  <p className="font-pixel-readable text-lg mb-3">{forum.body}</p>
                  <p className="font-pixel-readable text-base text-[#5a5d66] mb-3">
                    by {forum.author}
                  </p>
                  <div className="space-y-3">
                    {forum.comments.length === 0 ? (
                      <p className="font-pixel-readable text-base text-[#8a8d96]">No comments.</p>
                    ) : (
                      forum.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start justify-between gap-4 border-2 border-[#d8d9de] p-3"
                        >
                          <div>
                            <p className="font-pixel-readable text-base text-[#5a5d66]">
                              {comment.author}
                            </p>
                            <p className="font-pixel-readable text-lg">{comment.text}</p>
                          </div>
                          <button
                            className="pixel-btn text-[11px] inline-flex items-center gap-2"
                            onClick={() => void deleteComment(comment.id)}
                            disabled={busy}
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="pixel-card-light p-6">
            <h2 className="font-pixel text-[11px] silver-text-dark mb-4">
              USERNAME TO EMAIL MAP ({mappedUsers.length})
            </h2>
            <div className="border-2 border-[#030213] bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#030213]">
                    <th className="text-left px-3 py-2 font-pixel text-[10px]">Username</th>
                    <th className="text-left px-3 py-2 font-pixel text-[10px]">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {mappedUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#d8d9de]">
                      <td className="px-3 py-2 font-pixel-readable text-base">{user.username}</td>
                      <td className="px-3 py-2 font-pixel-readable text-base">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        <aside className="pixel-card-light p-5 h-fit lg:sticky lg:top-24 order-first lg:order-last">
          <p className="font-pixel text-[11px] silver-text-dark mb-4">NAVIGATION</p>
          <nav className="space-y-2">
            <a
              href="#"
              className="w-full px-3 py-3 border-2 border-[#030213] bg-[#030213] text-[#f4f4f6] font-pixel text-[10px] inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Forums
            </a>
            <div className="w-full px-3 py-3 border-2 border-[#d8d9de] bg-white text-[#5a5d66] font-pixel text-[10px] inline-flex items-center gap-2">
              <UserCircle2 className="w-4 h-4" />
              User Mapping
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default AdminPanel;
