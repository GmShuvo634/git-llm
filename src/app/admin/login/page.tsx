"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type LoginResponse = {
  user: {
    role: "USER" | "ADMIN";
  };
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setStatus("");

    try {
      const response = await fetch("/api/forums/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json().catch(() => ({}))) as LoginResponse & {
        error?: string;
      };

      if (!response.ok) {
        setStatus(data.error ?? "Login failed.");
        return;
      }

      if (data.user.role !== "ADMIN") {
        await fetch("/api/forums/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        setStatus("This account does not have admin access.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setStatus("Unable to login right now.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[80vh] pixel-grid-light px-6 py-20">
      <div className="max-w-md mx-auto pixel-card-light p-8">
        <h1 className="font-pixel text-base silver-text-dark mb-3">ADMIN LOGIN</h1>
        <p className="font-pixel-readable text-lg text-[#5a5d66] mb-6">
          Access the forums moderation panel
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="font-pixel text-[10px] silver-text-dark mb-2 block">
              Email ID
            </label>
            <input
              id="admin-email"
              type="email"
              required
              className="pixel-input-light"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="font-pixel text-[10px] silver-text-dark mb-2 block">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              className="pixel-input-light"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="pixel-btn w-full text-[11px]" disabled={busy}>
            {busy ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {status ? <p className="font-pixel-readable text-base mt-4">&gt; {status}</p> : null}
      </div>
    </div>
  );
}
