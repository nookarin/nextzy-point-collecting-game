"use client";

import { useCallback, useState } from "react";
import { ApiError, toApiError } from "@/lib/api/client";

export function useApiMutation<TArgs extends unknown[], TResult>(
  action: (...args: TArgs) => Promise<TResult>,
) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<ApiError>();

  const mutate = useCallback(
    async (...args: TArgs): Promise<TResult | undefined> => {
      setIsPending(true);
      setError(undefined);
      try {
        return await action(...args);
      } catch (caught) {
        setError(toApiError(caught));
        return undefined;
      } finally {
        setIsPending(false);
      }
    },
    [action],
  );

  const clearError = useCallback(() => setError(undefined), []);

  return { mutate, isPending, error, clearError };
}