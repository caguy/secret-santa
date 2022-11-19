import classNames from "classnames";

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
  return (
    <button
      disabled={disabled}
      className={classNames(
        "rounded-md",
        "transition-colors",
        "focus-visible:outline-4",
        "focus-visible:outline-offset-1",
        "focus-visible:outline-blue-500",
        "disabled:opacity-60",
        {
          "border border-red-700 text-red-700 p-2 text-sm": !!icon,
          "hover:bg-red-100": !disabled,
          "bg-red-700 hover:bg-red-600 text-white py-2 px-4": !icon,
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
}
