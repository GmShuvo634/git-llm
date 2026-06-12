import { redirect } from "next/navigation";
import { getCurrentForumUser } from "@/lib/forums-auth";
import AdminPanel from "./_components/admin-panel";

export default async function AdminPage() {
  const user = await getCurrentForumUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return <AdminPanel />;
}
