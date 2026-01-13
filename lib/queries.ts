import { useQuery, useMutation } from "@tanstack/react-query"
import { fetchRawData, submitCleanedData } from "./api"

export const useFetchRawData = (batch = 1) => {
  return useQuery({
    queryKey: ["raw-data", batch],
    queryFn: () => fetchRawData(batch),
  })
}

export const useSubmitCleanedData = () => {
  return useMutation({
    mutationFn: (payload: {
      candidateName: string
      batchId: string
      cleanedItems: any[]
    }) =>
      submitCleanedData(
        payload.candidateName,
        payload.batchId,
        payload.cleanedItems
      ),
  })
}
