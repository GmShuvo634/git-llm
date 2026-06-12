# LMS SDK Integration Guide (Next.js + React)

## Overview

This document explains how to integrate the LMS Login / Signup SDK into a Next.js application.

The integration provides:

* User Login
* User Signup
* My Account Redirect
* Logout
* Course Purchase
* Free Course Enrollment

---

# Prerequisites

Before starting, obtain the following information from your LMS Admin Dashboard:

### LMS Domain

Navigate to:

Admin Dashboard → Website & App Setup → Website Builder → Website URL → Custom URL

Example:

```env
https://academy.example.com
```

### Subdomain

Example:

```env
demoacademy
```

---

# Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_LMS_DOMAIN=https://academy.example.com
NEXT_PUBLIC_LMS_SUBDOMAIN=demoacademy
```

---

# Project Structure

```text
app/
├── layout.tsx
├── page.tsx
├── courses/
│   └── [bundleId]/
│       └── page.tsx

components/
├── LmsSdkProvider.tsx
├── AuthButtons.tsx
├── CoursePurchase.tsx

types/
└── lms-sdk.d.ts
```

---

# Step 1: Create SDK Provider

Create:

`components/LmsSdkProvider.tsx`

```tsx
"use client";

import Script from "next/script";

const LMS_DOMAIN = process.env.NEXT_PUBLIC_LMS_DOMAIN!;
const SUBDOMAIN = process.env.NEXT_PUBLIC_LMS_SUBDOMAIN!;

export default function LmsSdkProvider() {
  return (
    <>
      <iframe
        id="iframe"
        className="iframe"
        src={`${LMS_DOMAIN}/js-sdks/signup-sdk/iframe.php?subdomain=${SUBDOMAIN}`}
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000,
          display: "none",
        }}
      />

      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="afterInteractive"
      />

      <Script
        src={`${LMS_DOMAIN}/js-sdks/signup-sdk/signup-sdk.js?v=2.8`}
        strategy="afterInteractive"
      />
    </>
  );
}
```

---

# Step 2: Register SDK Globally

Update:

`app/layout.tsx`

```tsx
import "./globals.css";
import LmsSdkProvider from "@/components/LmsSdkProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LmsSdkProvider />
        {children}
      </body>
    </html>
  );
}
```

---

# Step 3: Create Authentication Buttons

Create:

`components/AuthButtons.tsx`

```tsx
"use client";

export default function AuthButtons() {
  return (
    <div className="flex gap-4">
      <a href="#" className="loginButton login">
        Login
      </a>

      <a href="#" className="loginButton signup">
        Sign Up
      </a>

      <a
        href="#"
        className="postLogin goToAccountButton"
        style={{ display: "none" }}
      >
        My Account
      </a>

      <a
        href="#"
        className="postLogin logout"
        style={{ display: "none" }}
      >
        Logout
      </a>
    </div>
  );
}
```

---

# Step 4: Add Authentication Buttons to Pages

Example:

`app/page.tsx`

```tsx
import AuthButtons from "@/components/AuthButtons";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Academy</h1>

      <AuthButtons />
    </main>
  );
}
```

---

# Step 5: Create Course Purchase Component

Create:

`components/CoursePurchase.tsx`

```tsx
"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    loadInstBundleDetails?: () => void;
  }
}

interface Props {
  bundleId: number;
}

export default function CoursePurchase({
  bundleId,
}: Props) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.loadInstBundleDetails
    ) {
      window.loadInstBundleDetails();
    }
  }, []);

  return (
    <div>
      <a
        className={`course-landing-buy_${bundleId}`}
        data-instbundleid={bundleId}
      >
        Purchase
      </a>

      <a
        className={`open-signup-course-freepreview enrollFree enrollFree_${bundleId}`}
        data-instbundleid={bundleId}
      >
        Enroll for Free
      </a>
    </div>
  );
}
```

---

# Step 6: Dynamic Course Page

Create:

`app/courses/[bundleId]/page.tsx`

```tsx
import CoursePurchase from "@/components/CoursePurchase";

interface Props {
  params: {
    bundleId: string;
  };
}

export default function CoursePage({
  params,
}: Props) {
  const bundleId = Number(params.bundleId);

  return (
    <div>
      <h1>Course Details</h1>

      <CoursePurchase bundleId={bundleId} />
    </div>
  );
}
```

---

# Course Bundle ID

Each course requires an Institution Bundle ID.

Example:

```html
<a
  class="course-landing-buy_382"
  data-instbundleid="382"
>
  Purchase
</a>
```

Here:

```text
Institution Bundle ID = 382
```

This value is typically visible in the course details URL inside the LMS dashboard.

---

# SDK Class Reference

## Login

```html
<a class="loginButton login">
  Login
</a>
```

## Signup

```html
<a class="loginButton signup">
  Sign Up
</a>
```

## My Account

```html
<a class="postLogin goToAccountButton">
  My Account
</a>
```

## Logout

```html
<a class="postLogin logout">
  Logout
</a>
```

## Purchase Course

```html
<a
  class="course-landing-buy_382"
  data-instbundleid="382"
>
  Purchase
</a>
```

## Free Enrollment

```html
<a
  class="open-signup-course-freepreview enrollFree enrollFree_382"
  data-instbundleid="382"
>
  Enroll for Free
</a>
```

---

# Verification Checklist

* [ ] LMS Domain configured
* [ ] Subdomain configured
* [ ] iframe loaded
* [ ] jQuery loaded
* [ ] signup-sdk.js loaded
* [ ] Login button working
* [ ] Signup button working
* [ ] Account button visible after login
* [ ] Logout button working
* [ ] Course Purchase button working
* [ ] Free Enrollment working
* [ ] Bundle ID correctly assigned

---

# Notes

1. The iframe must load before the SDK script.
2. jQuery must be loaded before `signup-sdk.js`.
3. The SDK relies on CSS classes and data attributes. Do not rename them.
4. Always use the correct Institution Bundle ID when rendering course actions.
5. Load `loadInstBundleDetails()` on course detail pages after the SDK is initialized.
