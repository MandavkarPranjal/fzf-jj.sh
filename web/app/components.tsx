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
            className="absolute top-10 right-2 p-2 text-xs text-[#6c7086] hover:text-[#cdd6f4] transition-colors opacity-0 group-hover:opacity-100"
            aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
            {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
            )}
        </button>
    );
}

export function CodeBlock({ children, language }: { children: string; language?: string }) {
    return (
        <div className="relative bg-[#1e1e2e] border border-[#313244] rounded-none my-6 shadow-none overflow-hidden group">
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#181825] border-b border-[#313244]">
                <div className="flex items-center gap-2">
                    <span className="text-[#6c7086] text-xs font-mono">user@linux:~</span>
                </div>
                {language && (
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#cba6f7] opacity-50"></span>
                        <span className="text-xs text-[#94e2d5] font-mono uppercase tracking-wider">{language}</span>
                    </div>
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
