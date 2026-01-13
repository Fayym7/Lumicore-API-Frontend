"use client"
import { useEffect, useState } from "react"
import { useFetchRawData, useSubmitCleanedData } from "@/lib/queries"

export default function Home() {
  const { data, isLoading, refetch, isError } = useFetchRawData()
  const submit = useSubmitCleanedData()

  const [editor, setEditor] = useState("")
  const [score, setScore] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (data) {
      setEditor(JSON.stringify(data, null, 2))
    }
  }, [data])

  const handleSubmit = async () => {
    try {
      setError(null)
      const parsed = JSON.parse(editor)

      // API returns { batch_id, records, metadata }
      const cleanedItems = parsed.records ?? parsed

      const result = await submit.mutateAsync({
        candidateName: "Faheem",
        batchId: parsed.batch_id || "batch-1",
        cleanedItems,
      })

      setScore(result.result.validation.score)
    } catch {
      setError("Invalid JSON format. Fix it before submitting.")
    }
  }

  return (
    <div className="min-h-screen bg-black text-emerald-200 flex justify-center px-6 py-10">
      <div className="w-full max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-400">
              DATA CLEANER
            </h1>
            <p className="text-emerald-500 mt-1">
              Receive, review, clean and submit unreliable API data
            </p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mb-4 flex items-center gap-4">
          {isLoading && (
            <div className="flex items-center gap-2 text-cyan-400">
              <Spinner />
              Fetching data from LumiCore…
            </div>
          )}

          {isError && (
            <div className="text-red-400">
              <strong>API error — retrying…</strong>
            </div>
          )}

          {score !== null && (
            <div className="ml-auto bg-emerald-900/30 border border-emerald-600 text-emerald-400 px-4 py-2 rounded-lg">
              Score: <b>{score}</b> / 100
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="bg-black border border-emerald-900 rounded-xl overflow-hidden shadow-xl">
          <div className="px-4 py-3 border-b border-emerald-900 flex justify-between items-center">
            <span className="text-sm text-emerald-400">Raw / Edited JSON</span>
            <span className="text-xs text-emerald-600">
              Edit and normalize before submitting
            </span>
          </div>

          <textarea
            value={editor}
            onChange={(e) => setEditor(e.target.value)}
            className="w-full h-[420px] bg-black text-emerald-200 caret-cyan-400 font-mono text-sm p-4 outline-none resize-none"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submit.isPending}
            className="bg-emerald-600 hover:bg-emerald-500 transition px-6 py-3 rounded-lg font-medium flex items-center gap-3 text-black disabled:opacity-50"
          >
            {submit.isPending && <Spinner />}
            Submit Cleaned Data
          </button>
        </div>
      </div>
    </div>
  )
}

/* Small loading spinner */
function Spinner() {
  return (
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  )
}
