import { useId } from "react";

type InputProps = Record<string, unknown> & {
  label: string;
};

export default function Input({ label, ...props }: InputProps) {
  const id = useId();

  return (
    <div className="flex-grow group">
      <div className="leading-none pb-2">
        <label
          className="text-red-700 group-focus-within:font-bold"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      <div>
        <input
          id={id}
          className="w-full px-2 py-2 border border-red-300 rounded-lg focus:outline-4 focus:outline-red-700"
          {...props}
        />
      </div>
    </div>
  );
}
