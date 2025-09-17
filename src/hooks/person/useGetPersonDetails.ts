import { useQuery } from "@tanstack/react-query";
import { getPersonDetails } from "../../services/person.service";

export const useGetPersonDetails = (personId: number) => {
  return useQuery({
    queryKey: ["personDetails", personId],
    queryFn: async () => {
      const data = await getPersonDetails(personId);
      return data;
    },
  });
};