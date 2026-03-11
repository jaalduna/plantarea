import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { nurseriesApi } from "@/lib/api";
import type { NurseryUpdate } from "@/types";

export function useNurseries() {
  return useQuery({
    queryKey: ["nurseries"],
    queryFn: () => nurseriesApi.list(),
  });
}

export function useNursery(id: number) {
  return useQuery({
    queryKey: ["nurseries", id],
    queryFn: () => nurseriesApi.get(id),
    enabled: id > 0,
  });
}

export function useUpdateNursery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: NurseryUpdate }) =>
      nurseriesApi.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["nurseries"] });
      queryClient.invalidateQueries({ queryKey: ["nurseries", variables.id] });
    },
  });
}
