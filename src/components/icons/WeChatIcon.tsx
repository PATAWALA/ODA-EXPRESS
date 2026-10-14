interface WeChatIconProps {
  className?: string;
}

export function WeChatIcon({ className = "h-4 w-4" }: WeChatIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.5 3C4.36 3 1 5.91 1 9.5c0 2.02 1.08 3.83 2.79 5.03L3 17l2.71-1.32c.85.23 1.76.35 2.7.35.16 0 .32 0 .48-.01a6.7 6.7 0 0 1-.25-1.83c0-3.9 3.65-7.06 8.15-7.06.14 0 .28 0 .42.01C16.72 4.78 12.94 3 8.5 3Z" />
      <path d="M16.5 8.5c-3.87 0-7 2.69-7 6s3.13 6 7 6c.74 0 1.46-.1 2.14-.28l2.36 1.28-.56-2.1A5.76 5.76 0 0 0 23.5 14.5c0-3.31-3.13-6-7-6Z" />
    </svg>
  );
}