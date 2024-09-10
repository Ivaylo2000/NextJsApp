"use client";

type ButtonProps = {
  className?: string;
  type?: "submit" | "reset" | "button"; // Optional type, defaults to "button"
  onClick?: () => void; // Optional onClick handler
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
