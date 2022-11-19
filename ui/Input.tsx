import { createElement, forwardRef, useId } from "react";

type InputProps = Record<string, unknown> & {
  label: string;
  multiple?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
};

export default forwardRef(function Input(
  { label, multiple, required, error, helperText, ...props }: InputProps,
  ref
) {
  const id = useId();

  return (
    <div className="flex-grow group">
      <div className="leading-none pb-2">
        <label
          className={
            "text-red-700 group-focus-within:font-bold" +
            (!!error ? " text-red-500" : "")
          }
          htmlFor={id}
        >
          {label}
          {!!required && (
            <abbr
              title="Obligatoire"
              className={
                "ml-2 red-500 font-bold" + (!!error ? " text-red-500" : "")
              }
            >
              *
            </abbr>
          )}
        </label>
      </div>
      <div>
        {createElement(multiple ? "textarea" : "input", {
          ...props,
          ref,
          id,
          className:
            "w-full px-2 py-2 border border-red-700 rounded-lg focus:outline-4 focus:outline-red-700" +
            (!!error ? " border-red-500" : ""),
        })}
      </div>
      {!!helperText && (
        <span
          className={
            "mt-1 prose prose-span:text-xs opacity-80" + !!error
              ? " text-red-500"
              : ""
          }
        >
          {helperText}
        </span>
      )}
    </div>
  );
});
