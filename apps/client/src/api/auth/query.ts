import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./client";

export const useProfileQuery = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });
