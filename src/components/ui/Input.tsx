import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <label className="block" htmlFor={inputId}>
        {label && (
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
            {label}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700",
            className,
          )}
          {...props}
        />
        {hint && <p className="mt-1.5 text-[11px] text-zinc-400">{hint}</p>}
      </label>
    );
  },
);
Input.displayName = "Input";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <label className="block" htmlFor={inputId}>
        {label && (
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
            {label}
          </span>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full resize-none border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700",
            className,
          )}
          {...props}
        />
        {hint && <p className="mt-1.5 text-[11px] text-zinc-400">{hint}</p>}
      </label>
    );
  },
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, placeholder, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <label className="block" htmlFor={inputId}>
        {label && (
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
            {label}
          </span>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "w-full border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition focus:border-navy-700",
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    );
  },
);
Select.displayName = "Select";