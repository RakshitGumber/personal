import type { ComponentPropsWithoutRef } from "react";
import { CodeBlock } from "@/components/mdx/CodeBlock";

const codeClassName = (className: string | undefined) => className?.replace("language-", "") ?? "text";
const makeId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 className="text-4xl font-semibold tracking-tight" {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => {
    const id = makeId(String(props.children ?? ""));
    return <h2 id={id} className="text-2xl font-semibold tracking-tight" {...props} />;
  },
  h3: (props: ComponentPropsWithoutRef<"h3">) => {
    const id = makeId(String(props.children ?? ""));
    return <h3 id={id} className="text-xl font-semibold tracking-tight" {...props} />;
  },
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="my-4 text-[1.04rem] text-[#d6d6d6]" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => {
    const href = props.href ?? "";
    const isExternal = href.startsWith("http");
    return (
      <a
        className="text-accent underline underline-offset-4"
        {...props}
        rel={isExternal ? "noopener noreferrer" : props.rel}
        target={isExternal ? "_blank" : props.target}
      />
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul className="my-4 list-disc space-y-2 pl-6" {...props} />,
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="text-[#d6d6d6]" {...props} />,
  pre: (props: ComponentPropsWithoutRef<"pre">) => <pre className="my-6" {...props} />,
  code: ({ className, children, ...props }: ComponentPropsWithoutRef<"code">) =>
    className ? (
      <CodeBlock className={className}>{String(children ?? "")}</CodeBlock>
    ) : (
      <code data-language={codeClassName(className)} className={className} {...props}>
        {children}
      </code>
    ),
};
