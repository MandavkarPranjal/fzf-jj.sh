"use client";

import { useState } from "react";

export function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 text-xs bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200 transition-colors rounded-none"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? "[COPIED]" : "[COPY]"}
    </button>
  );
}

export function CodeBlock({ children, language }: { children: string; language?: string }) {
  return (
    <div className="relative bg-zinc-900 border border-zinc-700 rounded-none my-4 overflow-hidden">
      {language && (
        <div className="bg-zinc-800 px-4 py-1 text-xs text-zinc-500 border-b border-zinc-700 font-mono">
          // {language}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm">
        <code>{children}</code>
      </pre>
      <CopyButton content={children} />
    </div>
  );
}

export function TerminalPrompt() {
  return (
    <span className="text-zinc-500">
      <span className="text-green-500">➜</span>{" "}
      <span className="text-cyan-500">~</span>{" "}
    </span>
  );
}

export function HeaderLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-zinc-400 hover:text-zinc-200 border-b border-zinc-700 hover:border-zinc-400 transition-all text-sm uppercase tracking-wider"
    >
      [{children}]
    </a>
  );
}
