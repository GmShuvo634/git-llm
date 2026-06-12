export type ForumSignupPayload = {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  undergraduateCollege: string;
  undergraduateCourse: string;
  city: string;
  interestedIn: string[];
  currentOccupation?: string;
  workExperienceMonths?: string;
};

export function asNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function parseForumSignupPayload(input: unknown): ForumSignupPayload | null {
  if (!input || typeof input !== "object") return null;
  const payload = input as Record<string, unknown>;

  const username = asNonEmptyString(payload.username);
  const password = asNonEmptyString(payload.password);
  const fullName = asNonEmptyString(payload.fullName);
  const phoneNumber = asNonEmptyString(payload.phoneNumber);
  const email = asNonEmptyString(payload.email)?.toLowerCase();
  const undergraduateCollege = asNonEmptyString(payload.undergraduateCollege);
  const undergraduateCourse = asNonEmptyString(payload.undergraduateCourse);
  const city = asNonEmptyString(payload.city);
  const interestedIn = Array.isArray(payload.interestedIn)
    ? payload.interestedIn
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
    : [];

  if (
    !username ||
    !password ||
    password.length < 8 ||
    !fullName ||
    !phoneNumber ||
    !email ||
    !undergraduateCollege ||
    !undergraduateCourse ||
    !city ||
    interestedIn.length === 0
  ) {
    return null;
  }

  return {
    username,
    password,
    fullName,
    phoneNumber,
    email,
    undergraduateCollege,
    undergraduateCourse,
    city,
    interestedIn,
    currentOccupation: asNonEmptyString(payload.currentOccupation) ?? undefined,
    workExperienceMonths: asNonEmptyString(payload.workExperienceMonths) ?? undefined,
  };
}

export function parseForumLoginPayload(input: unknown): { email: string; password: string } | null {
  if (!input || typeof input !== "object") return null;
  const payload = input as Record<string, unknown>;
  const email = asNonEmptyString(payload.email)?.toLowerCase();
  const password = asNonEmptyString(payload.password);
  if (!email || !password) return null;
  return { email, password };
}
