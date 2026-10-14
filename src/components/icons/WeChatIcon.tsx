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
      {/* Bulle principale (gauche, grande) */}
      <path d="M8.7 2.5c-4.14 0-7.5 2.8-7.5 6.25 0 1.96 1.04 3.71 2.67 4.87L3.13 16l2.62-1.3c.93.26 1.92.4 2.95.4.13 0 .26 0 .39-.01a7.03 7.03 0 0 1-.22-1.79c0-3.87 3.6-7 8.03-7 .14 0 .28 0 .41.01-.96-2.28-3.68-3.9-6.86-3.9-.63 0-1.25.06-1.84.19a4.8 4.8 0 0 0-.13.01 6.53 6.53 0 0 0-1.78.89ZM6.5 7.5a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm4.5 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
      {/* Bulle secondaire (droite, petite) */}
      <path d="M15.5 8.5c-3.87 0-7 2.69-7 6s3.13 6 7 6c.72 0 1.43-.09 2.1-.27l2.3 1.27-.55-2.05A5.85 5.85 0 0 0 22.5 14.5c0-3.31-3.13-6-7-6Zm-2.4 4.3a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm4.8 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
    </svg>
  );
}