"use client";

import React, { FormEvent } from "react";
import { X } from "lucide-react";

type LoginForm = { email: string; password: string };

type SignupForm = {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  undergraduateCollege: string;
  undergraduateCourse: string;
  city: string;
  interestedIn: string[];
  currentOccupation: string;
  workExperienceMonths: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  authView: "login" | "signup";
  setAuthView: (v: "login" | "signup") => void;
  authMessage: string;
  busy: boolean;
  loginForm: LoginForm;
  setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>;
  signupForm: SignupForm;
  setSignupForm: React.Dispatch<React.SetStateAction<SignupForm>>;
  interests: readonly string[];
  toggleInterest: (interest: string) => void;
  onLoginSubmit: (e: FormEvent) => void;
  onSignupSubmit: (e: FormEvent) => void;
}

export default function ForumAuthModal({
  open,
  onClose,
  authView,
  setAuthView,
  authMessage,
  busy,
  loginForm,
  setLoginForm,
  signupForm,
  setSignupForm,
  interests,
  toggleInterest,
  onLoginSubmit,
  onSignupSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 overflow-y-auto anim-fade-in">
      <div className="pixel-card-light p-8 max-w-3xl w-full my-10 anim-pop">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-pixel text-base silver-text-dark">FORUM AUTH</h2>
          <button onClick={onClose} className="text-[#5a5d66] hover:text-[#030213]">
            <X className="w-5 h-5" />
          </button>
        </div>
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
          <form onSubmit={onLoginSubmit} className="space-y-5">
            <div>
              <label htmlFor="forums-login-email" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                Email ID
              </label>
              <input
                id="forums-login-email"
                type="email"
                required
                className="pixel-input-light"
                value={loginForm.email}
                onChange={(e) => setLoginForm((c) => ({ ...c, email: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="forums-login-password" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                Password
              </label>
              <input
                id="forums-login-password"
                type="password"
                required
                className="pixel-input-light"
                value={loginForm.password}
                onChange={(e) => setLoginForm((c) => ({ ...c, password: e.target.value }))}
              />
            </div>
            <button type="submit" className="pixel-btn text-[11px] w-full" disabled={busy}>
              {busy ? "Logging In..." : "Log In"}
            </button>
          </form>
        ) : (
          <form onSubmit={onSignupSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="forums-signup-username" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                  User Name
                </label>
                <input
                  id="forums-signup-username"
                  required
                  className="pixel-input-light"
                  value={signupForm.username}
                  onChange={(e) => setSignupForm((c) => ({ ...c, username: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="forums-signup-password" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                  Password
                </label>
                <input
                  id="forums-signup-password"
                  type="password"
                  required
                  minLength={8}
                  className="pixel-input-light"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm((c) => ({ ...c, password: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="forums-signup-name" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                  Full Name
                </label>
                <input
                  id="forums-signup-name"
                  required
                  className="pixel-input-light"
                  value={signupForm.fullName}
                  onChange={(e) => setSignupForm((c) => ({ ...c, fullName: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="forums-signup-phone" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                  Phone Number
                </label>
                <input
                  id="forums-signup-phone"
                  required
                  className="pixel-input-light"
                  value={signupForm.phoneNumber}
                  onChange={(e) => setSignupForm((c) => ({ ...c, phoneNumber: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="forums-signup-email" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                  Email ID
                </label>
                <input
                  id="forums-signup-email"
                  type="email"
                  required
                  className="pixel-input-light"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm((c) => ({ ...c, email: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="forums-signup-college" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                  Undergraduate College
                </label>
                <input
                  id="forums-signup-college"
                  required
                  className="pixel-input-light"
                  value={signupForm.undergraduateCollege}
                  onChange={(e) => setSignupForm((c) => ({ ...c, undergraduateCollege: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="forums-signup-course" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                  Undergraduate Course
                </label>
                <input
                  id="forums-signup-course"
                  required
                  className="pixel-input-light"
                  value={signupForm.undergraduateCourse}
                  onChange={(e) => setSignupForm((c) => ({ ...c, undergraduateCourse: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="forums-signup-city" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                  City
                </label>
                <input
                  id="forums-signup-city"
                  required
                  className="pixel-input-light"
                  value={signupForm.city}
                  onChange={(e) => setSignupForm((c) => ({ ...c, city: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="forums-signup-occupation" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                  Current Occupation (Optional)
                </label>
                <input
                  id="forums-signup-occupation"
                  className="pixel-input-light"
                  value={signupForm.currentOccupation}
                  onChange={(e) => setSignupForm((c) => ({ ...c, currentOccupation: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="forums-signup-exp" className="font-pixel text-[10px] silver-text-dark mb-2 block">
                  Work Experience in Months (Optional)
                </label>
                <input
                  id="forums-signup-exp"
                  className="pixel-input-light"
                  value={signupForm.workExperienceMonths}
                  onChange={(e) => setSignupForm((c) => ({ ...c, workExperienceMonths: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <p className="font-pixel text-[10px] silver-text-dark mb-2">Interested in</p>
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

        {authMessage ? <p className="font-pixel-readable text-lg text-[#030213] mt-6">&gt; {authMessage}</p> : null}
      </div>
    </div>
  );
}
