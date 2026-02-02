import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fzf-jj.sh | Fuzzy Finder for Jujutsu VCS",
  description: "Bash and zsh key bindings for jj, powered by fzf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased w-full">
        <div className="min-h-screen bg-zinc-950 w-full">
          <div className="border-b border-zinc-800">
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-zinc-500 font-mono text-sm">$</span>
                <h1 className="text-xl font-semibold text-zinc-200 font-mono">
                  fzf-jj.sh
                </h1>
              </div>
              <nav className="flex gap-6">
                <a href="#features" className="text-zinc-500 hover:text-zinc-200 text-sm font-mono transition-colors">
                  features
                </a>
                <a href="#install" className="text-zinc-500 hover:text-zinc-200 text-sm font-mono transition-colors">
                  install
                </a>
                <a href="#bindings" className="text-zinc-500 hover:text-zinc-200 text-sm font-mono transition-colors">
                  bindings
                </a>
              </nav>
            </div>
          </div>
          <main className="max-w-4xl mx-auto px-6 py-12">
            {children}
          </main>
          <footer className="border-t border-zinc-800 mt-20">
            <div className="max-w-4xl mx-auto px-6 py-8 text-center text-zinc-600 text-sm font-mono">
              <p className="mb-2">// Built for developers who use Jujutsu VCS</p>
              <p>
                <a 
                  href="https://github.com/mandavkarpranjal/fzf-jj.sh" 
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  github.com/mandavkarpranjal/fzf-jj.sh
                </a>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
