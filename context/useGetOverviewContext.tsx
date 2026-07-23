import { GetOverview } from '@/lib/interface/get-overview-interface';
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from 'react';

interface OverviewContextValue {
  data: GetOverview | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

const OverviewContext = createContext<OverviewContextValue | undefined>(
  undefined
);

export const useOverview = () => {
  const context = useContext(OverviewContext);

  if (!context) {
    throw new Error('useOverview must be used within an OverviewProvider');
  }

  return context;
};

export const OverviewProvider = ({ children }: { children: ReactNode }) => {
  const { data, isError, isLoading, error, refetch } = useQuery<
    GetOverview,
    Error
  >({
    queryKey: ['getOverview'],
    queryFn: patientService.getOverview,
    staleTime: 5 * 60 * 1000,
  });

  const value = useMemo(
    () => ({
      data,
      isLoading,
      isError,
      error,
      refetch,
    }),
    [data, error, isError, isLoading, refetch]
  );

  return (
    <OverviewContext.Provider value={value}>
      {children}
    </OverviewContext.Provider>
  );
};
