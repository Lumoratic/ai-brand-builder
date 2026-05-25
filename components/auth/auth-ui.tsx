import { cn } from "@/lib/utils";

type AuthInputProps = React.ComponentProps<"input"> & {
  label: string;
};

export function AuthInput({ label, className, id, ...props }: AuthInputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
        {label}
      </span>
      <input
        id={inputId}
        className={cn(
          "h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-sm text-white",
          "placeholder:text-zinc-600",
          "outline-none transition-colors",
          "focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </label>
  );
}

type AuthErrorProps = {
  message: string | null;
};

export function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300"
    >
      {message}
    </p>
  );
}

export function AuthDivider() {
  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className="w-full border-t border-white/[0.06]" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-[oklch(0.09_0.014_280)] px-3 text-xs text-zinc-500">
          or
        </span>
      </div>
    </div>
  );
}
