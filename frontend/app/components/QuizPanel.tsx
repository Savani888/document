'use client'
import React, {useState} from 'react'
import { getQuiz } from '../../lib/api'

export default function QuizPanel(){
  const [quiz, setQuiz] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const json = await getQuiz()
      setQuiz(json)
    }catch(e){
      setQuiz([])
    }finally{ setLoading(false) }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={load} className="button-primary rounded-full px-3 py-1.5">Generate Quiz</button>
      </div>
      <div className="space-y-3">
        {loading && <div className="text-sm text-slate-500">Generating...</div>}
        {quiz.map((q,i)=> (
          <div key={i} className="rounded-2xl border border-slate-200/70 bg-white/80 p-3 shadow-sm dark:border-slate-800/70 dark:bg-slate-800/80">
            <div className="font-semibold text-slate-900 dark:text-slate-100">Q: {q.question}</div>
            <div className="mt-2 space-y-1">
              {q.options.map((o:any, j:number)=> (
                <div key={j} className="rounded-xl border border-slate-200/70 bg-slate-50/70 px-2 py-1.5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">{o}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
