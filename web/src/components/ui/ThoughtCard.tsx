import type { ThoughtPost } from "@/lib/content";

type ThoughtCardProps = {
  thought: ThoughtPost;
};

export function ThoughtCard({ thought }: ThoughtCardProps) {
  return (
    <>
      <p className="text-sm text-[#d9d9d9]">{thought.text}</p>
      <p className="mt-3 font-mono text-xs text-muted">{thought.date}</p>
    </>
  );
}
