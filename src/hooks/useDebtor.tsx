import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient/apiClient";
import type {
  Qarz,
  Qarzdor,
  ReqQarz,
  ReqQarzdor,
} from "../types/types";

function useQarzdor(qarzdorId?: number) {
  const queryClient = useQueryClient();

  /* =======================
     BARCHA QARZDORLAR
  ======================= */
  const {
    data: qarzdorlar = [],
    isLoading: qarzdorlarLoading,
  } = useQuery({
    queryKey: ["qarzdorlar"],
    queryFn: async () => {
      const res = await apiClient.get<Qarzdor[]>("/qarzdor");
      return res.data;
    },
  });

  /* =======================
     BITTA QARZDOR
  ======================= */
  const {
    data: qarzdor,
    isLoading: qarzdorLoading,
  } = useQuery({
    queryKey: ["qarzdor", qarzdorId],
    queryFn: async () => {
      const res = await apiClient.get<Qarzdor>(`/qarzdor/${qarzdorId}`);
      return res.data;
    },
    enabled: !!qarzdorId,
  });

  /* =======================
     QARZDOR QO‘SHISH
  ======================= */
  const addQarzdorMutate = useMutation({
    mutationFn: async (newQarzdor: ReqQarzdor) => {
      const res = await apiClient.post<Qarzdor>("/qarzdor", newQarzdor);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qarzdorlar"] });
    },
  });

  /* =======================
     QARZLAR RO‘YXATI
  ======================= */
  const {
    data: qarzlar = [],
    isLoading: qarzlarLoading,
  } = useQuery({
    queryKey: ["qarzlar", qarzdorId],
    queryFn: async () => {
      const res = await apiClient.get<Qarz[]>(
        `/qarzdor/${qarzdorId}/qarzlar`
      );
      return res.data;
    },
    enabled: !!qarzdorId,
  });

  /* =======================
     QARZ QO‘SHISH (ADD DEBT)
  ======================= */
  const addQarzToQarzdorMutate = useMutation({
    mutationFn: async (newQarz: ReqQarz) => {
      const res = await apiClient.post(
        `/qarzdor/${qarzdorId}/qarz`,
        newQarz
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qarzlar", qarzdorId] });
      queryClient.invalidateQueries({ queryKey: ["qarzdor", qarzdorId] });
      queryClient.invalidateQueries({ queryKey: ["qarzdorlar"] });
    },
  });

  /* =======================
     QARZ TO‘LASH (REPAYMENT)
     MUHIM: qarz_id + miqdor
  ======================= */
  const qarzRepaymentMutate = useMutation({
    mutationFn: async (data: { qarz_id: number; miqdor: number }) => {
      const res = await apiClient.post(
        `/qarzdor/${qarzdorId}/repayment`,
        {
          qarz_id: data.qarz_id,
          miqdor: data.miqdor,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qarzlar", qarzdorId] });
      queryClient.invalidateQueries({ queryKey: ["qarzdor", qarzdorId] });
      queryClient.invalidateQueries({ queryKey: ["qarzlar-history", qarzdorId] });
    },
  });

  /* =======================
     QARZLAR TARIXI
  ======================= */
  const {
    data: qarzlarHistory = [],
    isLoading: qarzlarHistoryLoading,
  } = useQuery({
    queryKey: ["qarzlar-history", qarzdorId],
    queryFn: async () => {
      const res = await apiClient.get(
        `/qarzdor/${qarzdorId}/qarzlar-history`
      );
      return res.data;
    },
    enabled: !!qarzdorId,
  });

  /* =======================
     RETURN
  ======================= */
  return {
    // data
    qarzdorlar,
    qarzdor,
    qarzlar,
    qarzlarHistory,

    // loading
    qarzdorlarLoading,
    qarzdorLoading,
    qarzlarLoading,
    qarzlarHistoryLoading,

    // actions
    addQarzdor: addQarzdorMutate.mutate,
    addQarzToQarzdor: addQarzToQarzdorMutate.mutate,
    qarzRepayment: qarzRepaymentMutate.mutate,
  };
}

export default useQarzdor;
