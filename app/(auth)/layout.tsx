import { Header } from "@/components/layout/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-md flex-1 px-4 py-10 sm:px-6">
        {children}
      </main>
    </>
  );
}
