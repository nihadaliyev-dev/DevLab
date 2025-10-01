import { memo, forwardRef } from "react";
import { type InputProps } from "../../../types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      placeholder = "",
      value = "",
      onChange,
      disabled = false,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";
    const errorClasses = error ? "border-red-500 focus:ring-red-500" : "";
    const disabledClasses = disabled
      ? "opacity-50 cursor-not-allowed bg-gray-100"
      : "";

    return (
      <div className="w-full">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default memo(Input);
