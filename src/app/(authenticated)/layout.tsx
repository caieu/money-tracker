import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  );
}
