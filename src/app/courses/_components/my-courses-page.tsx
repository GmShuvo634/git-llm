"use client";

import { FormEvent, useState } from "react";
import { lmsLogin, lmsSignup } from "@/lib/lms-sdk";

type AuthView = "login" | "signup";

interface MyCoursesPageProps {
  defaultView: AuthView;
}

const interests = [
  "GII Mocks",
  "CAT Coaching Online",
  "WAT & GDPI Preparation",
  "None",
] as const;

export function MyCoursesPage({ defaultView }: MyCoursesPageProps) {
  const [view, setView] = useState<AuthView>(defaultView);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
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

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setStatus("");

    try {
      await lmsLogin(loginForm);
      setStatus("Login successful. Redirecting to LMS...");
    } catch {
      setStatus("Login failed. Please verify details and try again.");
    } finally {
      setBusy(false);
    }
  };

  const onSignup = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setStatus("");

    try {
      await lmsSignup(signupForm);
      setStatus("Signup successful. Your My Courses access is being provisioned.");
    } catch {
      setStatus("Signup failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

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

  return (
    <div className="min-h-[80vh] pixel-grid-light flex items-center justify-center px-6 py-20">
      <div className="pixel-card-light p-8 md:p-10 max-w-2xl w-full relative z-[2] anim-pop">
        <div className="text-center mb-8">
          <h1 className="font-heading text-lg silver-text-dark mb-3 leading-relaxed">
            MY COURSES
          </h1>
          <p className="font-body text-xl text-[#5a5d66]">
            &gt; LMS access for existing and new learners
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-7">
          <button
            type="button"
            className={`pixel-btn text-[11px] ${view === "login" ? "pixel-btn-primary" : ""}`}
            onClick={() => setView("login")}
          >
            Log In
          </button>
          <button
            type="button"
            className={`pixel-btn text-[11px] ${view === "signup" ? "pixel-btn-primary" : ""}`}
            onClick={() => setView("signup")}
          >
            Sign Up
          </button>
        </div>

        {view === "login" ? (
          <form onSubmit={onLogin} className="space-y-5">
            <div>
              <label htmlFor="courses-login-email" className="font-heading text-[10px] silver-text-dark mb-2 block">
                Email ID
              </label>
              <input
                id="courses-login-email"
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
              <label htmlFor="courses-login-password" className="font-heading text-[10px] silver-text-dark mb-2 block">
                Password
              </label>
              <input
                id="courses-login-password"
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

            <button type="submit" className="pixel-btn w-full text-[11px]" disabled={busy}>
              {busy ? "Logging In..." : "Log In"}
            </button>
          </form>
        ) : (
          <form onSubmit={onSignup} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="courses-name" className="font-heading text-[10px] silver-text-dark mb-2 block">
                  Full Name
                </label>
                <input
                  id="courses-name"
                  required
                  className="pixel-input-light"
                  value={signupForm.fullName}
                  onChange={(e) =>
                    setSignupForm((current) => ({ ...current, fullName: e.target.value }))
                  }
                />
              </div>

              <div>
                <label htmlFor="courses-phone" className="font-heading text-[10px] silver-text-dark mb-2 block">
                  Phone Number
                </label>
                <input
                  id="courses-phone"
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
                <label htmlFor="courses-email" className="font-heading text-[10px] silver-text-dark mb-2 block">
                  Email ID
                </label>
                <input
                  id="courses-email"
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
                <label htmlFor="courses-city" className="font-heading text-[10px] silver-text-dark mb-2 block">
                  City
                </label>
                <input
                  id="courses-city"
                  required
                  className="pixel-input-light"
                  value={signupForm.city}
                  onChange={(e) =>
                    setSignupForm((current) => ({ ...current, city: e.target.value }))
                  }
                />
              </div>

              <div>
                <label htmlFor="courses-college" className="font-heading text-[10px] silver-text-dark mb-2 block">
                  Undergraduate College
                </label>
                <input
                  id="courses-college"
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
                <label htmlFor="courses-course" className="font-heading text-[10px] silver-text-dark mb-2 block">
                  Undergraduate Course
                </label>
                <input
                  id="courses-course"
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
                <label htmlFor="courses-occupation" className="font-heading text-[10px] silver-text-dark mb-2 block">
                  Current Occupation (Optional)
                </label>
                <input
                  id="courses-occupation"
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
                <label htmlFor="courses-exp" className="font-heading text-[10px] silver-text-dark mb-2 block">
                  Work Experience in Months (Optional)
                </label>
                <input
                  id="courses-exp"
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

            <button type="submit" className="pixel-btn w-full text-[11px]" disabled={busy}>
              {busy ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        )}

        {status ? (
          <p className="font-body text-lg text-[#050505] mt-5">&gt; {status}</p>
        ) : null}
      </div>
    </div>
  );
}
