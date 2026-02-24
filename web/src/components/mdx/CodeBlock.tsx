import { useState } from "react";

type CodeBlockProps = {
  className?: string;
  children?: string;
};

export function CodeBlock({ className, children = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 border border-line bg-surface-2 px-2 py-1 text-xs text-muted hover:text-text"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <code data-language={className?.replace("language-", "") ?? "text"} className={className}>
        {children}
      </code>
    </div>
  );
}
