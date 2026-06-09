import { MyCoursesPage } from "./_components/my-courses-page";

type CoursesPageProps = {
  searchParams: Promise<{ intent?: string }>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const defaultView = params.intent === "signup" ? "signup" : "login";

  return <MyCoursesPage defaultView={defaultView} />;
}
