"use client"
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';

const useGetUnReadNotification = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["un-read-notification"],
        queryFn: () => patientService.unReadNotifications(),
    });
    const unReadNotifications = data ?? null
  return {unReadNotifications, isLoading, isError, error}
}

export default useGetUnReadNotification