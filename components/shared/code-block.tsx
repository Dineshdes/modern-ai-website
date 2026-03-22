interface CodeBlockProps {
  code: string;
  language?: string;
  showPrompt?: boolean;
}

export function CodeBlock({ code, language: _language, showPrompt = true }: CodeBlockProps) {
  return (
    <div className="bg-[#0D0D0D] border border-white/[0.08] rounded-xl p-5 font-mono text-sm overflow-x-auto">
      <pre className="whitespace-pre-wrap break-words">
        {showPrompt ? (
          <>
            <span className="text-[#00E599] select-none">$ </span>
            <span className="text-[#E4E4E7]">{code}</span>
          </>
        ) : (
          <span className="text-[#E4E4E7]">{code}</span>
        )}
      </pre>
    </div>
  );
}
