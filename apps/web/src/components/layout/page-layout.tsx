import { Footer } from "./footer";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-mono">
      <div className="max-w-7xl mx-auto">
        {children}
        <Footer />
      </div>
    </div>
  );
};
