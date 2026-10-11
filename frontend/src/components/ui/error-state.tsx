import { PillButton } from "./pill-button";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 px-6 py-8 text-center">
      <p className="text-sm text-muted">{message}</p>
      {onRetry && (
        <PillButton variant="outline" size="md" onClick={onRetry}>
          ลองใหม่
        </PillButton>
      )}
    </div>
  );
}