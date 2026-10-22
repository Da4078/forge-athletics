
import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";

const variants = {
  primary:
    "bg-forge text-ink hover:bg-forge-dark",
  outline:
    "border border-white/20 text-white hover:border-forge hover:text-forge",
  ghost:
    "text-white/70 hover:bg-white/5 hover:text-white",
};

const sizes = {
  sm: "min-h-10 px-4 text-xs",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-7 text-sm",
};

const Button = forwardRef(function Button(
  {
    children,
    href,
    variant = "primary",
    size = "md",
    className = "",
    icon = false,
    fullWidth = false,
    type = "button",
    disabled = false,
    onClick,
    ...props
  },
  ref
) {
  const classes = [
    "inline-flex items-center justify-center gap-3",
    "font-semibold tracking-wide",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-forge focus-visible:ring-offset-2",
    "focus-visible:ring-offset-ink",
    "disabled:pointer-events-none disabled:opacity-50",
    "rounded-sm",
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={17}
          strokeWidth={1.8}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={`${classes} group`}
        onClick={onClick}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={`${classes} group`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
});

export default Button;
