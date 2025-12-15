import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient/apiClient";
import type { Car, FilterParams, ReqCar } from "../types/types";
import { useState } from "react";


function useCars(filterParams?: FilterParams) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  
  const { data: cars = { data: [], total: 0 } } = useQuery({
    queryKey: ["cars", filterParams, page], 
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filterParams?.model?.trim()) {
        params.set("model", filterParams.model.trim());
      }
      if (filterParams?.color && filterParams.color !== "ALL") {
        params.set("color", filterParams.color);
      }
      if (filterParams?.year) {
        params.set("year", filterParams.year.toString());
      }

      params.set("page", page.toString());
      params.set("limit", limit.toString());

      const res = await apiClient.get(`/cars?${params.toString()}`);
      return res.data;
    },
    placeholderData: (prev) => prev,
    staleTime: 30000, 
  });



  const { data: colors = [] } = useQuery({
    queryKey: ["colors"], 
    queryFn: async () => {
      const res = await apiClient.get<Car[]>("/cars/colors");
      return res.data;
    },
  });

  const addCarMutation = useMutation({
    mutationFn: async (newCar: ReqCar) => {
      const res = await apiClient.post<Car>("/cars", newCar);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const deleteCarMutation = useMutation({
    mutationFn: async (carId: number) => {
      await apiClient.delete(`/cars/${carId}`);
      return carId; 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const updateCarMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ReqCar }) => {
      const res = await apiClient.put<Car>(
        `/cars/${id}`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });



  return { 
    cars,
    colors,
    page,
    setPage,
    limit,
    isLoading: cars.length === 0, 
    addCar: addCarMutation.mutate,
    deleteCar: deleteCarMutation.mutate,
    updateCar: updateCarMutation.mutate,
  };
}

export default useCars;