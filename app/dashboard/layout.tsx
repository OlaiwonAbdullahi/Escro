import Navbar from "./_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col w-full font-mont">
      <Navbar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
