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
      className="absolute top-12 right-4 p-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      )}
    </button>
  );
}

export function CodeBlock({ children, language }: { children: string; language?: string }) {
  return (
    <div className="relative bg-[#1e1e2e] border border-zinc-700 rounded-lg my-6 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-zinc-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f38ba8]"></div>
          <div className="w-3 h-3 rounded-full bg-[#f9e2af]"></div>
          <div className="w-3 h-3 rounded-full bg-[#a6e3a1]"></div>
        </div>
        {language && (
          <span className="text-xs text-zinc-500 font-mono">{language}</span>
        )}
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-[#cdd6f4] !bg-transparent !border-0 !m-0">
          <code>{children}</code>
        </pre>
      </div>
      <CopyButton content={children} />
    </div>
  );
}

export function TerminalPrompt() {
  return (
    <span className="text-zinc-500 mr-2 select-none">
      <span className="text-purple-400">➜</span>{" "}
      <span className="text-cyan-400">~</span>
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
