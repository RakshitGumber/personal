import type { ComponentPropsWithoutRef } from "react";

const codeClassName = (className: string | undefined) => className?.replace("language-", "") ?? "text";

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 className="text-4xl font-semibold tracking-tight" {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 className="text-2xl font-semibold tracking-tight" {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 className="text-xl font-semibold tracking-tight" {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="my-4 text-[1.04rem] text-[#d6d6d6]" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => <a className="text-accent underline underline-offset-4" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul className="my-4 list-disc space-y-2 pl-6" {...props} />,
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="text-[#d6d6d6]" {...props} />,
  pre: (props: ComponentPropsWithoutRef<"pre">) => <pre className="my-6" {...props} />,
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code data-language={codeClassName(className)} className={className} {...props} />
  ),
};
