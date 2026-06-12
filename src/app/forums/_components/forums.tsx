"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import ForumAuthModal from "./forum-auth-modal";
import ForumCommentModal from "./forum-comment-modal";
import ForumNewPostModal from "./forum-new-post-modal";
import ForumCard from "./forum-card";
import type { ForumAuthUser, ForumPostView } from "@/lib/forums-types";
import { requestJson } from "@/lib/request";

const interests = [
  "GII Mocks",
  "CAT Coaching Online",
  "WAT & GDPI Preparation",
  "None",
] as const;

const categories = ["Strategy", "Admissions", "Mocks", "Interviews", "Alumni"] as const;



export function Forums() {
  const [publishedForums, setPublishedForums] = useState<ForumPostView[]>([]);
  const [pendingForums, setPendingForums] = useState<ForumPostView[]>([]);
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCat, setNewCat] = useState("Strategy");
  const [newComment, setNewComment] = useState("");

  const [sessionUser, setSessionUser] = useState<ForumAuthUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  const [authMessage, setAuthMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    undergraduateCollege: "",
    undergraduateCourse: "",
    city: "",
    interestedIn: [] as string[],
    currentOccupation: "",
    workExperienceMonths: "",
  });

  const isAdmin = sessionUser?.role === "ADMIN";
  const visibleForums = useMemo(
    () => (isAdmin ? [...pendingForums, ...publishedForums] : publishedForums),
    [isAdmin, pendingForums, publishedForums],
  );

  const open = useMemo(
    () => (openId ? visibleForums.find((forum) => forum.id === openId) ?? null : null),
    [visibleForums, openId],
  );

  const filtered = useMemo(
    () =>
      visibleForums.filter(
        (forum) =>
          forum.title.toLowerCase().includes(query.toLowerCase()) ||
          forum.body.toLowerCase().includes(query.toLowerCase()) ||
          forum.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [visibleForums, query],
  );

  const loadPublishedForums = async () => {
    const data = await requestJson<{ forums: ForumPostView[] }>("/api/forums/posts", {
      cache: "no-store",
    });
    setPublishedForums(data.forums);
  };

  const loadPendingForums = async () => {
    const data = await requestJson<{ forums: ForumPostView[] }>("/api/forums/admin/pending", {
      cache: "no-store",
    });
    setPendingForums(data.forums);
  };

  const refreshForumsForRole = async (role: ForumAuthUser["role"] | null) => {
    if (role === "ADMIN") {
      await Promise.all([loadPublishedForums(), loadPendingForums()]);
      return;
    }
    await loadPublishedForums();
    setPendingForums([]);
  };

  useEffect(() => {
    const boot = async () => {
      setLoading(true);
      try {
        let role: ForumAuthUser["role"] | null = null;
        try {
          const data = await requestJson<{ user: ForumAuthUser }>("/api/forums/me", {
            cache: "no-store",
          });
          setSessionUser(data.user);
          role = data.user.role;
        } catch {
          setSessionUser(null);
        }
        await refreshForumsForRole(role);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load forums.";
        setAuthMessage(message);
      } finally {
        setLoading(false);
      }
    };

    void boot();
  }, []);

  const toggleInterest = (interest: string) => {
    setSignupForm((current) => {
      if (interest === "None") {
        return { ...current, interestedIn: ["None"] };
      }

      const withoutNone = current.interestedIn.filter((item) => item !== "None");
      const next = withoutNone.includes(interest)
        ? withoutNone.filter((item) => item !== interest)
        : [...withoutNone, interest];

      return { ...current, interestedIn: next };
    });
  };

  const onForumLogin = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setAuthMessage("");

    try {
      const data = await requestJson<{ user: ForumAuthUser }>("/api/forums/auth/login", {
        method: "POST",
        body: JSON.stringify(loginForm),
      });
      setSessionUser(data.user);
      setAuthModalOpen(false);
      await refreshForumsForRole(data.user.role);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed. Please try again.";
      setAuthMessage(message);
    } finally {
      setBusy(false);
    }
  };

  const onForumSignup = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setAuthMessage("");

    try {
      const data = await requestJson<{ user: ForumAuthUser }>("/api/forums/auth/signup", {
        method: "POST",
        body: JSON.stringify(signupForm),
      });
      setSessionUser(data.user);
      setAuthModalOpen(false);
      setAuthMessage("Signup complete. Forum account created.");
      await refreshForumsForRole(data.user.role);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Signup failed. Please try again.";
      setAuthMessage(message);
    } finally {
      setBusy(false);
    }
  };

  const onForumLogout = async () => {
    setBusy(true);
    try {
      await requestJson("/api/forums/auth/logout", { method: "POST" });
      setSessionUser(null);
      setPendingForums([]);
      setAuthMessage("Logged out from forums.");
      setOpenId(null);
      setCreating(false);
    } finally {
      setBusy(false);
    }
  };

  const createForum = async (e: FormEvent) => {
    e.preventDefault();
    if (!sessionUser) {
      setAuthMessage("Please log in to create a new forum.");
      setAuthModalOpen(true);
      return;
    }

    setBusy(true);
    setAuthMessage("");
    try {
      const response = await requestJson<{ message: string }>("/api/forums/posts", {
        method: "POST",
        body: JSON.stringify({
          title: newTitle,
          body: newBody,
          category: newCat,
        }),
      });

      setNewTitle("");
      setNewBody("");
      setNewCat("Strategy");
      setCreating(false);
      setAuthMessage(response.message);
      await refreshForumsForRole(sessionUser.role);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not submit forum for approval.";
      setAuthMessage(message);
    } finally {
      setBusy(false);
    }
  };

  const addComment = async () => {
    if (!open || !newComment.trim()) return;
    if (!sessionUser) {
      setAuthMessage("Please log in to post a comment.");
      setAuthModalOpen(true);
      return;
    }

    setBusy(true);
    try {
      await requestJson("/api/forums/comments", {
        method: "POST",
        body: JSON.stringify({
          forumId: open.id,
          text: newComment.trim(),
        }),
      });
      setNewComment("");
      await refreshForumsForRole(sessionUser.role);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not add comment.";
      setAuthMessage(message);
    } finally {
      setBusy(false);
    }
  };

  const approveForum = async (forumId: string) => {
    if (!isAdmin) return;
    setBusy(true);
    try {
      await requestJson(`/api/forums/posts/${forumId}/approve`, { method: "POST" });
      setAuthMessage("Forum approved successfully.");
      await refreshForumsForRole("ADMIN");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not approve forum.";
      setAuthMessage(message);
    } finally {
      setBusy(false);
    }
  };

  const deleteForum = async (forumId: string) => {
    if (!isAdmin) return;
    setBusy(true);
    try {
      await requestJson(`/api/forums/posts/${forumId}`, { method: "DELETE" });
      if (openId === forumId) setOpenId(null);
      setAuthMessage("Forum deleted successfully.");
      await refreshForumsForRole("ADMIN");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not delete forum.";
      setAuthMessage(message);
    } finally {
      setBusy(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!isAdmin) return;
    setBusy(true);
    try {
      await requestJson(`/api/forums/comments/${commentId}`, { method: "DELETE" });
      setAuthMessage("Comment deleted successfully.");
      await refreshForumsForRole("ADMIN");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not delete comment.";
      setAuthMessage(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[80vh] pixel-grid-light px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-6xl mx-auto relative z-2">
        <div className="mb-10 anim-fade-up flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-pixel text-xl md:text-3xl silver-text-dark leading-relaxed mb-3">
              IIM FORUMS
            </h1>
            <p className="font-pixel-readable text-2xl text-[#5a5d66]">
              {"> Professional discussions for aspirants and alumni"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {sessionUser ? (
              <div className="flex items-center gap-4">
                <span className="text-base font-bold">{sessionUser.username}</span>
                <button
                type="button"
                className="pixel-btn text-[11px]"
                onClick={onForumLogout}
                disabled={busy}
              >
                Log Out
              </button>
              </div>
              
            ) : (
              <button
                type="button"
                className="pixel-btn text-[11px]"
                onClick={() => setAuthModalOpen(true)}
              >
                Log In / Sign Up
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="pixel-card-light p-8">
            <p className="font-pixel-readable text-lg text-[#5a5d66]">&gt; Loading forums...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-8 anim-fade-up delay-100">
              <div className="flex-1 relative">
                <Search
                  className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5d66] z-10"
                  aria-hidden="true"
                />
                <label htmlFor="forums-search" className="sr-only">
                  Search forums
                </label>
                <input
                  id="forums-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search forums..."
                  className="pixel-input-light pl-12"
                  aria-label="Search forums"
                />
              </div>
              <button
                onClick={() => setCreating(true)}
                className="pixel-btn flex items-center gap-2 justify-center text-[11px]"
              >
                <Plus className="w-4 h-4" /> NEW FORUM
              </button>
            </div>

            <div className="grid gap-5">
              {filtered.length === 0 ? (
                <div className="pixel-card-light p-10 text-center">
                  <p className="font-pixel-readable text-2xl text-[#5a5d66]">&gt; No forums match your search_</p>
                </div>
              ) : (
                filtered.map((forum, index) => (
                  <ForumCard
                    key={forum.id}
                    forum={forum}
                    index={index}
                    onOpen={setOpenId}
                    showAdminActions={isAdmin}
                    onApprove={approveForum}
                    onDelete={deleteForum}
                    busy={busy}
                  />
                ))
              )}
            </div>

            {authMessage ? (
              <p className="font-pixel-readable text-lg text-[#030213] mt-6">&gt; {authMessage}</p>
            ) : null}
          </>
        )}
      </div>

      <ForumAuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        authView={authView}
        setAuthView={setAuthView}
        authMessage={authMessage}
        busy={busy}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        signupForm={signupForm}
        setSignupForm={setSignupForm}
        interests={interests}
        toggleInterest={toggleInterest}
        onLoginSubmit={onForumLogin}
        onSignupSubmit={onForumSignup}
      />

      <ForumNewPostModal
        open={creating}
        onClose={() => setCreating(false)}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newBody={newBody}
        setNewBody={setNewBody}
        newCat={newCat}
        setNewCat={setNewCat}
        categories={categories}
        onSubmit={createForum}
        busy={busy}
      />

      <ForumCommentModal
        open={open}
        onClose={() => setOpenId(null)}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
        busy={busy}
        canModerateComments={isAdmin}
        onDeleteComment={deleteComment}
      />
    </div>
  );
}

export default Forums;
