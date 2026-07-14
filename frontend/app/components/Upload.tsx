import React, {useState} from 'react'
import { postUpload } from '../../lib/api'

export default function Upload(){
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleUpload(e: React.FormEvent){
    e.preventDefault()
    if(!file) return
    setLoading(true)
    try{
      const res = await postUpload(file)
      setResult(res)
    }catch(e){
      setResult({ error: 'Upload failed' })
    }finally{ setLoading(false) }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <label className="block">
        <input type="file" accept="application/pdf,image/*" onChange={e => setFile(e.target.files?.[0]||null)} />
      </label>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit" disabled={loading}>{loading? 'Uploading...':'Upload'}</button>
      </div>
      {result && <pre className="mt-4 bg-white dark:bg-slate-800 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </form>
  )
}
