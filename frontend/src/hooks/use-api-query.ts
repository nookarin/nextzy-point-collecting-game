"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, toApiError } from "@/lib/api/client";

interface QueryState<T> {
  data?: T;
  error?: ApiError;
  isFetching: boolean;
}

export function useApiQuery<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<QueryState<T>>({ isFetching: true });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, isFetching: false });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState((previous) => ({
            data: previous.data,
            error: toApiError(error),
            isFetching: false,
          }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, version]);

  const refetch = useCallback(() => {
    setState((previous) => ({ ...previous, isFetching: true }));
    setVersion((current) => current + 1);
  }, []);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isFetching && state.data === undefined,
    isFetching: state.isFetching,
    refetch,
  };
}