function asOptionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : "";
}

export const env = {
  plausibleDomain: asOptionalString(import.meta.env.VITE_PLAUSIBLE_DOMAIN),
  plausibleScriptUrl: asOptionalString(import.meta.env.VITE_PLAUSIBLE_SCRIPT_URL) || "https://plausible.io/js/script.js",
};
