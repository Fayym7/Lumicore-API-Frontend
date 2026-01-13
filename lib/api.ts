import axios from "axios"

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
//const CANDIDATE_ID = process.env.NEXT_PUBLIC_CANDIDATE_ID || "candidate-faheem-i7vrv"

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    //"X-Candidate-ID": CANDIDATE_ID,
  },
})

// Fetch messy raw data (Django → LumiCore → Django → Frontend)
export const fetchRawData = async (batch = 1) => {
  const res = await api.get(`/api/fetch/?batch=${batch}`)
  return res.data.data
}

// Submit cleaned data (Frontend → Django → LumiCore → Django → Frontend)
export const submitCleanedData = async (
  candidateName: string,
  batchId: string,
  cleanedItems: any[]
) => {
  const res = await api.post("/api/submit/", {
    candidate_name: candidateName,
    batch_id: batchId,
    cleaned_items: cleanedItems,
  })

  return res.data
}


