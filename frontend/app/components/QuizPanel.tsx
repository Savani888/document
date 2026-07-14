'use client'
import React, {useState} from 'react'

export default function QuizPanel(){
  const [quiz, setQuiz] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL||'http://localhost:8000') + '/quiz')
      const json = await res.json()
      setQuiz(json)
    }catch(e){
      setQuiz([])
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={load} className="px-3 py-1 bg-blue-600 text-white rounded">Generate Quiz</button>
      </div>
      <div className="space-y-3">
        {loading && <div>Generating...</div>}
        {quiz.map((q,i)=> (
          <div key={i} className="p-3 bg-white dark:bg-slate-800 rounded">
            <div className="font-semibold">Q: {q.question}</div>
            <div className="mt-2 space-y-1">
              {q.options.map((o:any, j:number)=> (
                <div key={j} className="px-2 py-1 border rounded">{o}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
