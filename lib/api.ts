import axios from "axios"

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

// --------------------
// Types
// --------------------

type FetchResponse = {
  success: boolean
  data: any[]
}

type SubmitResponse = {
  success: boolean
  result: any
}

// --------------------
// Axios Instance
// --------------------

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
})

// --------------------
// API Functions
// --------------------

// Fetch messy raw data (Django → LumiCore → Django → Frontend)
export const fetchRawData = async (batch = 1) => {
  const res = await api.get<FetchResponse>(`/api/fetch/?batch=${batch}`)
  return res.data.data
}

// Submit cleaned data (Frontend → Django → LumiCore → Django → Frontend)
export const submitCleanedData = async (
  candidateName: string,
  batchId: string,
  cleanedItems: any[]
) => {
  const res = await api.post<SubmitResponse>("/api/submit/", {
    candidate_name: candidateName,
    batch_id: batchId,
    cleaned_items: cleanedItems,
  })

  return res.data
}
