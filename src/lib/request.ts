export async function requestJson<T>(url: string, options?: RequestInit): Promise<T> {
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