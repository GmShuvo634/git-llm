"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { MessageCircle, Plus, Search, Send, ShieldCheck, Trash2, X } from "lucide-react";
import { lmsLogin, lmsSignup } from "@/lib/lms-sdk";

export interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
}

export interface Forum {
  id: number;
  title: string;
  author: string;
  category: string;
  body: string;
  time: string;
  comments: Comment[];
  status: "pending" | "published";
}

type ForumUser = {
  username: string;
  email: string;
  fullName: string;
};

type ForumsState = {
  forums: Forum[];
  users: ForumUser[];
};

type ForumsProps = {
  mode?: "user" | "admin";
};

const storageKey = "gii_forums_state_v1";

const initialState: ForumsState = {
  forums: [
    {
      id: 1,
      title: "How to prepare for CAT VARC in 3 months?",
      author: "AaravS",
      category: "Strategy",
      body: "I am targeting CAT 2026 and find VARC weakest. Any tips from IIM grads?",
      time: "2h ago",
      status: "published",
      comments: [
        {
          id: 1,
          author: "Priya (IIM-A)",
          text: "Read The Hindu editorial daily + 4 RCs/day.",
          time: "1h ago",
        },
        {
          id: 2,
          author: "Rohit",
          text: "+1 to RC drills. Time them strictly.",
          time: "30m ago",
        },
      ],
    },
    {
      id: 2,
      title: "IIM Lucknow vs IIM Indore - which to pick?",
      author: "NehaK",
      category: "Admissions",
      body: "Got calls from both. Finance interest. ROI vs brand?",
      time: "5h ago",
      status: "published",
      comments: [
        {
          id: 1,
          author: "Karan (IIM-L)",
          text: "Lucknow has stronger finance recruiters.",
          time: "3h ago",
        },
      ],
    },
  ],
  users: [
    {
      username: "AaravS",
      email: "aarav@example.com",
      fullName: "Aarav S.",
    },
    {
      username: "NehaK",
      email: "neha@example.com",
      fullName: "Neha K.",
    },
  ],
};

const interests = [
  "GII Mocks",
  "CAT Coaching Online",
  "WAT & GDPI Preparation",
  "None",
] as const;

export function Forums({ mode = "user" }: ForumsProps) {
  const [forumsState, setForumsState] = useState<ForumsState>(() => {
    if (typeof window === "undefined") return initialState;

    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return initialState;

    try {
      const parsed = JSON.parse(raw) as ForumsState;
      return parsed.forums && parsed.users ? parsed : initialState;
    } catch {
      return initialState;
    }
  });
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState<Forum | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCat, setNewCat] = useState("Strategy");
  const [newComment, setNewComment] = useState("");

  const [sessionUser, setSessionUser] = useState<ForumUser | null>(null);
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  const [authMessage, setAuthMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    username: "",
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(forumsState));
  }, [forumsState]);

  const publishedForums = useMemo(
    () => forumsState.forums.filter((forum) => forum.status === "published"),
    [forumsState.forums],
  );

  const pendingForums = useMemo(
    () => forumsState.forums.filter((forum) => forum.status === "pending"),
    [forumsState.forums],
  );

  const filtered = useMemo(
    () =>
      publishedForums.filter(
        (forum) =>
          forum.title.toLowerCase().includes(query.toLowerCase()) ||
          forum.body.toLowerCase().includes(query.toLowerCase()) ||
          forum.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [publishedForums, query],
  );

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
      await lmsLogin(loginForm);
      const mappedUser = forumsState.users.find(
        (user) => user.email.toLowerCase() === loginForm.email.toLowerCase(),
      );

      if (mappedUser) {
        setSessionUser(mappedUser);
        setAuthMessage("");
      } else {
        setAuthMessage(
          "No forum account mapped to this email. Use Sign Up to create one.",
        );
      }
    } catch {
      setAuthMessage("Login failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const onForumSignup = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setAuthMessage("");

    try {
      await lmsSignup(signupForm);

      const newUser: ForumUser = {
        username: signupForm.username,
        email: signupForm.email,
        fullName: signupForm.fullName,
      };

      setForumsState((current) => {
        const dedupedUsers = current.users.filter(
          (user) => user.email.toLowerCase() !== newUser.email.toLowerCase(),
        );

        return {
          ...current,
          users: [newUser, ...dedupedUsers],
        };
      });

      setSessionUser(newUser);
      setAuthView("login");
      setAuthMessage("Signup complete. Forum account created.");
    } catch {
      setAuthMessage("Signup failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const createForum = async (e: FormEvent) => {
    e.preventDefault();
    if (!sessionUser) return;

    const created: Forum = {
      id: Date.now(),
      title: newTitle,
      body: newBody,
      author: sessionUser.username,
      category: newCat,
      time: "just now",
      comments: [],
      status: "pending",
    };

    setForumsState((current) => ({
      ...current,
      forums: [created, ...current.forums],
    }));

    setNewTitle("");
    setNewBody("");
    setCreating(false);
    setAuthMessage("Forum submitted. It will be published after admin approval.");
  };

  const addComment = async () => {
    if (!open || !newComment.trim() || !sessionUser) return;

    const comment: Comment = {
      id: Date.now(),
      author: sessionUser.username,
      text: newComment,
      time: "just now",
    };

    const updated: Forum = {
      ...open,
      comments: [...open.comments, comment],
    };

    setForumsState((current) => ({
      ...current,
      forums: current.forums.map((forum) =>
        forum.id === open.id ? updated : forum,
      ),
    }));

    setOpen(updated);
    setNewComment("");
  };

  const approveForum = (forumId: number) => {
    setForumsState((current) => ({
      ...current,
      forums: current.forums.map((forum) =>
        forum.id === forumId ? { ...forum, status: "published" } : forum,
      ),
    }));
  };

  const deleteComment = (forumId: number, commentId: number) => {
    setForumsState((current) => ({
      ...current,
      forums: current.forums.map((forum) =>
        forum.id === forumId
          ? {
              ...forum,
              comments: forum.comments.filter((comment) => comment.id !== commentId),
            }
          : forum,
      ),
    }));
  };

  const showAuthGate = mode === "user" && !sessionUser;

  return (
    <div className="min-h-[80vh] pixel-grid-light px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-6xl mx-auto relative z-[2]">
        <div className="mb-10 anim-fade-up flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-heading text-xl md:text-3xl silver-text-dark leading-relaxed mb-3">
              {mode === "admin" ? "IIM FORUMS ADMIN" : "IIM FORUMS"}
            </h1>
            <p className="font-body text-2xl text-[#5a5d66]">
              {mode === "admin"
                ? "> Admin moderation, approvals, and user mapping"
                : "> Professional discussions for aspirants and alumni"}
            </p>
          </div>
          {mode === "admin" ? (
            <span className="font-heading text-[10px] px-3 py-2 border-2 border-[#050505] bg-[#050505] text-[#f4f4f6] inline-flex items-center gap-2 w-fit">
              <ShieldCheck className="w-4 h-4" /> MODERATION ENABLED
            </span>
          ) : null}
        </div>

        {showAuthGate ? (
          <div className="pixel-card-light p-8 max-w-3xl mx-auto anim-pop">
            <div className="grid grid-cols-2 gap-2 mb-7">
              <button
                type="button"
                className={`pixel-btn text-[11px] ${authView === "login" ? "pixel-btn-primary" : ""}`}
                onClick={() => setAuthView("login")}
              >
                Forum Log In
              </button>
              <button
                type="button"
                className={`pixel-btn text-[11px] ${authView === "signup" ? "pixel-btn-primary" : ""}`}
                onClick={() => setAuthView("signup")}
              >
                Forum Sign Up
              </button>
            </div>

            {authView === "login" ? (
              <form onSubmit={onForumLogin} className="space-y-5">
                <div>
                  <label htmlFor="forums-login-email" className="font-heading text-[10px] silver-text-dark mb-2 block">
                    Email ID
                  </label>
                  <input
                    id="forums-login-email"
                    type="email"
                    required
                    className="pixel-input-light"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm((current) => ({ ...current, email: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="forums-login-password" className="font-heading text-[10px] silver-text-dark mb-2 block">
                    Password
                  </label>
                  <input
                    id="forums-login-password"
                    type="password"
                    required
                    className="pixel-input-light"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm((current) => ({
                        ...current,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
                <button type="submit" className="pixel-btn text-[11px] w-full" disabled={busy}>
                  {busy ? "Logging In..." : "Log In"}
                </button>
              </form>
            ) : (
              <form onSubmit={onForumSignup} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="forums-signup-username" className="font-heading text-[10px] silver-text-dark mb-2 block">
                      User Name
                    </label>
                    <input
                      id="forums-signup-username"
                      required
                      className="pixel-input-light"
                      value={signupForm.username}
                      onChange={(e) =>
                        setSignupForm((current) => ({
                          ...current,
                          username: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="forums-signup-name" className="font-heading text-[10px] silver-text-dark mb-2 block">
                      Full Name
                    </label>
                    <input
                      id="forums-signup-name"
                      required
                      className="pixel-input-light"
                      value={signupForm.fullName}
                      onChange={(e) =>
                        setSignupForm((current) => ({ ...current, fullName: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="forums-signup-phone" className="font-heading text-[10px] silver-text-dark mb-2 block">
                      Phone Number
                    </label>
                    <input
                      id="forums-signup-phone"
                      required
                      className="pixel-input-light"
                      value={signupForm.phoneNumber}
                      onChange={(e) =>
                        setSignupForm((current) => ({
                          ...current,
                          phoneNumber: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="forums-signup-email" className="font-heading text-[10px] silver-text-dark mb-2 block">
                      Email ID
                    </label>
                    <input
                      id="forums-signup-email"
                      type="email"
                      required
                      className="pixel-input-light"
                      value={signupForm.email}
                      onChange={(e) =>
                        setSignupForm((current) => ({ ...current, email: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="forums-signup-college" className="font-heading text-[10px] silver-text-dark mb-2 block">
                      Undergraduate College
                    </label>
                    <input
                      id="forums-signup-college"
                      required
                      className="pixel-input-light"
                      value={signupForm.undergraduateCollege}
                      onChange={(e) =>
                        setSignupForm((current) => ({
                          ...current,
                          undergraduateCollege: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="forums-signup-course" className="font-heading text-[10px] silver-text-dark mb-2 block">
                      Undergraduate Course
                    </label>
                    <input
                      id="forums-signup-course"
                      required
                      className="pixel-input-light"
                      value={signupForm.undergraduateCourse}
                      onChange={(e) =>
                        setSignupForm((current) => ({
                          ...current,
                          undergraduateCourse: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="forums-signup-city" className="font-heading text-[10px] silver-text-dark mb-2 block">
                      City
                    </label>
                    <input
                      id="forums-signup-city"
                      required
                      className="pixel-input-light"
                      value={signupForm.city}
                      onChange={(e) =>
                        setSignupForm((current) => ({ ...current, city: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="forums-signup-occupation" className="font-heading text-[10px] silver-text-dark mb-2 block">
                      Current Occupation (Optional)
                    </label>
                    <input
                      id="forums-signup-occupation"
                      className="pixel-input-light"
                      value={signupForm.currentOccupation}
                      onChange={(e) =>
                        setSignupForm((current) => ({
                          ...current,
                          currentOccupation: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="forums-signup-exp" className="font-heading text-[10px] silver-text-dark mb-2 block">
                      Work Experience in Months (Optional)
                    </label>
                    <input
                      id="forums-signup-exp"
                      className="pixel-input-light"
                      value={signupForm.workExperienceMonths}
                      onChange={(e) =>
                        setSignupForm((current) => ({
                          ...current,
                          workExperienceMonths: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <p className="font-heading text-[10px] silver-text-dark mb-2">
                    Interested in
                  </p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {interests.map((interest) => {
                      const active = signupForm.interestedIn.includes(interest);

                      return (
                        <button
                          type="button"
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`pixel-btn text-[11px] ${active ? "pixel-btn-primary" : ""}`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button type="submit" className="pixel-btn text-[11px] w-full" disabled={busy}>
                  {busy ? "Creating Account..." : "Sign Up"}
                </button>
              </form>
            )}

            {authMessage ? (
              <p className="font-body text-lg text-[#050505] mt-5">&gt; {authMessage}</p>
            ) : null}
          </div>
        ) : (
          <>
            {mode === "user" ? (
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
            ) : null}

            {mode === "admin" ? (
              <div className="grid lg:grid-cols-2 gap-8">
                <section className="pixel-card-light p-6">
                  <h2 className="font-heading text-[11px] silver-text-dark mb-4">
                    UNAPPROVED FORUMS ({pendingForums.length})
                  </h2>
                  <div className="space-y-4">
                    {pendingForums.length === 0 ? (
                      <p className="font-body text-lg text-[#8a8d96]">
                        &gt; No pending forums.
                      </p>
                    ) : (
                      pendingForums.map((forum) => (
                        <article key={forum.id} className="border-2 border-[#050505] p-4 bg-white">
                          <p className="font-heading text-[9px] mb-2">{forum.category.toUpperCase()}</p>
                          <h3 className="font-heading text-[12px] mb-2">{forum.title}</h3>
                          <p className="font-body text-lg mb-3">{forum.body}</p>
                          <p className="font-body text-base text-[#5a5d66] mb-4">
                            by {forum.author}
                          </p>
                          <button
                            className="pixel-btn text-[11px]"
                            onClick={() => approveForum(forum.id)}
                          >
                            Approve & Publish
                          </button>
                        </article>
                      ))
                    )}
                  </div>
                </section>

                <section className="pixel-card-light p-6">
                  <h2 className="font-heading text-[11px] silver-text-dark mb-4">
                    USERNAME TO EMAIL MAP
                  </h2>
                  <div className="border-2 border-[#050505] bg-white">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-[#050505]">
                          <th className="text-left px-3 py-2 font-heading text-[10px]">Username</th>
                          <th className="text-left px-3 py-2 font-heading text-[10px]">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {forumsState.users.map((user) => (
                          <tr key={user.email} className="border-b border-[#d8d9de]">
                            <td className="px-3 py-2 font-body text-base">{user.username}</td>
                            <td className="px-3 py-2 font-body text-base">{user.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="pixel-card-light p-6 lg:col-span-2">
                  <h2 className="font-heading text-[11px] silver-text-dark mb-4">
                    PUBLISHED FORUMS ({publishedForums.length})
                  </h2>
                  <div className="space-y-6">
                    {publishedForums.map((forum) => (
                      <article key={forum.id} className="border-2 border-[#050505] p-4 bg-white">
                        <h3 className="font-heading text-[12px] mb-2">{forum.title}</h3>
                        <p className="font-body text-lg mb-3">{forum.body}</p>
                        <p className="font-body text-base text-[#5a5d66] mb-3">
                          by {forum.author}
                        </p>
                        <div className="space-y-3">
                          {forum.comments.length === 0 ? (
                            <p className="font-body text-base text-[#8a8d96]">No comments.</p>
                          ) : (
                            forum.comments.map((comment) => (
                              <div key={comment.id} className="flex items-start justify-between gap-4 border-2 border-[#d8d9de] p-3">
                                <div>
                                  <p className="font-body text-base text-[#5a5d66]">
                                    {comment.author}
                                  </p>
                                  <p className="font-body text-lg">{comment.text}</p>
                                </div>
                                <button
                                  className="pixel-btn text-[11px] inline-flex items-center gap-2"
                                  onClick={() => deleteComment(forum.id, comment.id)}
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
              </div>
            ) : (
              <div className="grid gap-5">
                {filtered.length === 0 ? (
                  <div className="pixel-card-light p-10 text-center">
                    <p className="font-body text-2xl text-[#5a5d66]">
                      &gt; No forums match your search_
                    </p>
                  </div>
                ) : (
                  filtered.map((forum, index) => (
                    <button
                      key={forum.id}
                      onClick={() => setOpen(forum)}
                      className={`pixel-card-light p-6 text-left anim-fade-up forum-delay-${index}`}
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-heading text-[9px] px-2 py-1 bg-[#050505] text-[#f4f4f6]">
                          {forum.category.toUpperCase()}
                        </span>
                        <span className="font-body text-lg text-[#8a8d96]">
                          by {forum.author} - {forum.time}
                        </span>
                      </div>
                      <h3 className="font-heading text-[13px] silver-text-dark mb-3 leading-relaxed">
                        {forum.title}
                      </h3>
                      <p className="font-body text-xl text-[#050505] mb-4 leading-snug">
                        {forum.body}
                      </p>
                      <div className="flex items-center gap-2 font-body text-lg text-[#5a5d66]">
                        <MessageCircle className="w-4 h-4" /> {forum.comments.length} comments
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {creating && mode === "user" && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 anim-fade-in">
          <div className="pixel-card-light p-8 max-w-2xl w-full anim-pop">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-base silver-text-dark">NEW FORUM</h2>
              <button
                onClick={() => setCreating(false)}
                className="text-[#5a5d66] hover:text-[#050505]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={createForum} className="space-y-5">
              <div>
                <label htmlFor="new-title" className="font-heading text-[10px] silver-text-dark mb-2 block">
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
                <label htmlFor="new-cat" className="font-heading text-[10px] silver-text-dark mb-2 block">
                  CATEGORY
                </label>
                <select
                  id="new-cat"
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="pixel-input-light"
                  aria-label="Select category"
                >
                  <option>Strategy</option>
                  <option>Admissions</option>
                  <option>Mocks</option>
                  <option>Interviews</option>
                  <option>Alumni</option>
                </select>
              </div>
              <div>
                <label htmlFor="new-body" className="font-heading text-[10px] silver-text-dark mb-2 block">
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
              <button type="submit" className="pixel-btn w-full text-[11px]">
                Submit For Approval
              </button>
            </form>
          </div>
        </div>
      )}

      {open && mode === "user" && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 overflow-y-auto anim-fade-in">
          <div className="pixel-card-light p-8 max-w-2xl w-full my-10 anim-pop">
            <div className="flex items-center justify-between mb-4">
              <span className="font-heading text-[9px] px-2 py-1 bg-[#050505] text-[#f4f4f6]">
                {open.category.toUpperCase()}
              </span>
              <button onClick={() => setOpen(null)} className="text-[#5a5d66] hover:text-[#050505]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h2 className="font-heading text-base silver-text-dark leading-relaxed mb-2">
              {open.title}
            </h2>
            <p className="font-body text-lg text-[#8a8d96] mb-5">
              by {open.author} - {open.time}
            </p>
            <p className="font-body text-xl text-[#050505] mb-8 leading-snug">
              {open.body}
            </p>

            <div className="border-t-2 border-[#b9bbc2] pt-6">
              <h3 className="font-heading text-[11px] silver-text-dark mb-5">
                COMMENTS ({open.comments.length})
              </h3>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {open.comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-[#050505] pl-4 py-2 anim-fade-up">
                    <p className="font-body text-lg text-[#5a5d66] mb-1">
                      {comment.author} - {comment.time}
                    </p>
                    <p className="font-body text-xl text-[#050505]">{comment.text}</p>
                  </div>
                ))}
                {open.comments.length === 0 ? (
                  <p className="font-body text-xl text-[#8a8d96]">
                    &gt; No comments yet. Be the first!
                  </p>
                ) : null}
              </div>
              <div className="flex gap-3">
                <label htmlFor="new-comment" className="sr-only">
                  Add a comment
                </label>
                <input
                  id="new-comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="pixel-input-light flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addComment();
                    }
                  }}
                  aria-label="Add a comment"
                />
                <button
                  onClick={addComment}
                  className="pixel-btn flex items-center gap-2 text-[11px]"
                  aria-label="Post comment"
                >
                  <Send className="w-3 h-3" /> Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forums;
