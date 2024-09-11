"use client";

type ButtonProps = {
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Button({
  className,
  type,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
