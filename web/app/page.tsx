import { CodeBlock, TerminalPrompt } from "./components";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 border-b border-zinc-800">
        <div className="mb-6">
          <code className="text-sm text-zinc-500">#!/usr/bin/env bash</code>
        </div>
        <h1 className="text-5xl font-bold text-zinc-100 mb-4 font-mono tracking-tight">
          fzf-jj.sh
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
          Bash and zsh key bindings for{" "}
          <a href="https://github.com/jj-vcs/jj" className="text-cyan-400 hover:text-cyan-300">[jj]</a>,{" "}
          powered by{" "}
          <a href="https://github.com/junegunn/fzf" className="text-purple-400 hover:text-purple-300">[fzf]</a>
        </p>
        <div className="inline-block bg-zinc-900 border border-zinc-700 px-4 py-2 text-sm text-zinc-500 font-mono">
          <span className="text-red-500">Note:</span> Under active development
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="space-y-6">
        <h2 className="text-2xl font-semibold text-zinc-200 border-l-4 border-cyan-500 pl-4 font-mono">
          FEATURES
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-2 font-mono">
              Bookmarks
            </h3>
            <p className="text-zinc-500 text-sm">
              Browse and select bookmarks with live preview
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
            <div className="text-3xl mb-4">📡</div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-2 font-mono">
              Remotes
            </h3>
            <p className="text-zinc-500 text-sm">
              Manage git remotes integration with ease
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-2 font-mono">
              Browser Integration
            </h3>
            <p className="text-zinc-500 text-sm">
              Open selected items in GitHub/GitLab directly
            </p>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="install" className="space-y-6">
        <h2 className="text-2xl font-semibold text-zinc-200 border-l-4 border-purple-500 pl-4 font-mono">
          INSTALLATION
        </h2>
        
        <div className="space-y-4">
          <div className="text-zinc-500 font-mono text-sm mb-4">
            // Download the script
          </div>
          <CodeBlock language="bash">
{`curl -o ~/.local/bin/fzf-jj.sh \\
  https://raw.githubusercontent.com/mandavkarpranjal/fzf-jj.sh/main/fzf-jj.sh
chmod +x ~/.local/bin/fzf-jj.sh`}
          </CodeBlock>

          <div className="text-zinc-500 font-mono text-sm mt-8 mb-4">
            // Source it in your shell config
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-zinc-400 font-mono text-sm mb-2">Bash (~/.bashrc):</div>
              <CodeBlock language="bash">source ~/.local/bin/fzf-jj.sh</CodeBlock>
            </div>
            <div>
              <div className="text-zinc-400 font-mono text-sm mb-2">Zsh (~/.zshrc):</div>
              <CodeBlock language="bash">source ~/.local/bin/fzf-jj.sh</CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-zinc-200 border-l-4 border-green-500 pl-4 font-mono">
          REQUIREMENTS
        </h2>
        
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-zinc-500 font-mono mb-2">// Required</div>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <span className="text-cyan-400">→</span> jj (Jujutsu VCS)
                </li>
                <li>
                  <span className="text-cyan-400">→</span> fzf (Fuzzy Finder)
                </li>
                <li>
                  <span className="text-cyan-400">→</span> bash or zsh
                </li>
              </ul>
            </div>
            <div>
              <div className="text-zinc-500 font-mono mb-2">// Optional</div>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <span className="text-purple-400">→</span> bat / batcat (colored previews)
                </li>
                <li>
                  <span className="text-purple-400">→</span> git (remote URL parsing)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Bindings Section */}
      <section id="bindings" className="space-y-6">
        <h2 className="text-2xl font-semibold text-zinc-200 border-l-4 border-yellow-500 pl-4 font-mono">
          KEY BINDINGS
        </h2>
        
        <div className="text-zinc-500 font-mono text-sm mb-4">
          // After sourcing the script, use CTRL-J prefix for all commands
        </div>

        <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-4 font-mono text-zinc-400">KEY</th>
                <th className="text-left p-4 font-mono text-zinc-400">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/50">
                <td className="p-4">
                  <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs font-mono">CTRL-J</kbd>
                </td>
                <td className="p-4 text-zinc-400">Show this list of bindings</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/50">
                <td className="p-4">
                  <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs font-mono">CTRL-J</kbd>
                  <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs font-mono ml-1">CTRL-B</kbd>
                </td>
                <td className="p-4 text-zinc-400">Open bookmarks picker</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/50">
                <td className="p-4">
                  <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs font-mono">CTRL-J</kbd>
                  <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs font-mono ml-1">CTRL-R</kbd>
                </td>
                <td className="p-4 text-zinc-400">Open remotes picker</td>
              </tr>
              <tr className="hover:bg-zinc-800/50">
                <td className="p-4">
                  <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs font-mono">CTRL-J</kbd>
                  <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs font-mono ml-1">CTRL-H</kbd>
                </td>
                <td className="p-4 text-zinc-400">Open Change/Revision picker</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-red-950/30 border border-red-900/50 p-4 mt-4">
          <div className="flex items-start gap-3">
            <span className="text-red-500 text-lg">⚠</span>
            <div>
              <div className="text-red-400 font-semibold font-mono text-sm mb-1">WARNING</div>
              <p className="text-zinc-500 text-sm">
                The preview of Change/Revision picker is broken for Change ID of same initials
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 mt-4">
          <div className="text-zinc-500 font-mono text-sm mb-2">// Both patterns work:</div>
          <div className="text-zinc-400 text-sm font-mono">
            <span className="text-cyan-400">→</span> <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs">CTRL-J</kbd> + key<br />
            <span className="text-cyan-400">→</span> <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs">CTRL-J</kbd> + <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs ml-1">CTRL-</kbd>key
          </div>
        </div>
      </section>

      {/* Footer Terminal */}
      <section className="py-8 border-t border-zinc-800">
        <div className="bg-zinc-950 border border-zinc-800 p-4 font-mono text-sm">
          <div className="text-zinc-500">
            <TerminalPrompt />
            <span className="text-zinc-400">Ready to boost your jj workflow?</span>
          </div>
          <div className="text-zinc-600 mt-2">
            Start using fzf-jj.sh today and take control of your version history.
          </div>
        </div>
      </section>
    </div>
  );
}
