type ButtonProps = Record<string, unknown> & {
  children: React.ReactNode;
  disabled?: boolean;
  icon?: boolean;
};

export default function Button({
  children,
  disabled,
  icon,
  ...props
}: ButtonProps) {
  let styles = [
    "rounded-md",
    "transition-colors",
    "focus-visible:outline-4",
    "focus-visible:outline-offset-1",
    "focus-visible:outline-blue-500",
    "disabled:opacity-60",
  ];

  if (icon) {
    styles = styles.concat([
      "border",
      "border-red-700",
      "text-red-700",
      "p-2",
      "text-sm",
    ]);
    if (!disabled) styles = styles.concat(["hover:bg-red-100"]);
  } else {
    styles = styles.concat([
      "bg-red-700",
      "hover:bg-red-600",
      "text-white",
      "py-2",
      "px-4",
    ]);
  }

  return (
    <button disabled={disabled} className={styles.join(" ")} {...props}>
      {children}
    </button>
  );
}
