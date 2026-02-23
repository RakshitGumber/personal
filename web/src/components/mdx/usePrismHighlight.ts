import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

export function usePrismHighlight(trigger: unknown) {
  useEffect(() => {
    Prism.highlightAll();
  }, [trigger]);
}
