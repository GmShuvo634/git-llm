'use client'
import { Lock, User } from "lucide-react";
import { useState } from "react";

export function LMSLoginForm({ onSubmit }: { onSubmit: (email: string, password: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit(email, password); }}
      className="space-y-5"
    >
      <div>
        <label className="font-heading text-[10px] silver-text-dark mb-2 flex items-center gap-2">
          <User className="w-3 h-3" /> EMAIL
        </label>
        <input
          type="email" required value={email}
          onChange={e => setEmail(e.target.value)}
          className="pixel-input-light"
          placeholder="student@example.com"
        />
      </div>
      <div>
        <label className="font-heading text-[10px] silver-text-dark mb-2 flex items-center gap-2">
          <Lock className="w-3 h-3" /> PASSWORD
        </label>
        <input
          type="password" required value={password}
          onChange={e => setPassword(e.target.value)}
          className="pixel-input-light"
          placeholder="••••••••"
        />
      </div>
      <button type="submit" className="pixel-btn w-full mt-4">LOGIN TO LMS</button>
      <div className="text-center mt-4">
        <a href="#" className="font-body text-lg text-[#5a5d66] hover:text-[#050505]">
          &gt; Forgot password?
        </a>
      </div>
    </form>
  );
}
