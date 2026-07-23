"use client"
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';

const useGetNotification = () => {
    const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
        queryKey: ["notification"],
        queryFn: () => patientService.getNotification(),
    });
    const notifications = data?.data ?? []
  return {notifications, isLoading, isError, error,refetch, isRefetching}
}

export default useGetNotification