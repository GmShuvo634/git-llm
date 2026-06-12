export type LmsLoginPayload = {
  email: string;
  password: string;
};

export type LmsSignupPayload = {
  fullName: string;
  phoneNumber: string;
  email: string;
  undergraduateCollege: string;
  undergraduateCourse: string;
  city: string;
  interestedIn: string[];
  currentOccupation?: string;
  workExperienceMonths?: string;
  username?: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Placeholders until the production LMS SDK credentials + package are provided.
export async function lmsLogin(payload: LmsLoginPayload) {
  void payload;
  await wait(700);
  return { ok: true };
}

export async function lmsSignup(payload: LmsSignupPayload) {
  void payload;
  await wait(900);
  return { ok: true };
}
