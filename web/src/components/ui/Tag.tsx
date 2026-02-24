import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  active?: boolean;
};

export function Tag({ children, active = false }: TagProps) {
  return (
    <span className={`pill px-2 py-1 ${active ? "border-accent text-accent" : ""}`}>
      {children}
    </span>
  );
}
