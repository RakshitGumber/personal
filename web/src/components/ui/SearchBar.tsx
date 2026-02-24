type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
};

export function SearchBar({ value, onChange, placeholder, label, className = "" }: SearchBarProps) {
  return (
    <label className={`block ${className}`}>
      <span className="sr-only">{label}</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-line bg-surface px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-accent"
      />
    </label>
  );
}
