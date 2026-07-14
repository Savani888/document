'use client'
import React, {useEffect, useState} from 'react'

export default function DarkModeToggle(){
  const [dark, setDark] = useState(false)
  useEffect(()=>{
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  function toggle(){
    const v = !dark
    setDark(v)
    document.documentElement.classList.toggle('dark', v)
    localStorage.setItem('theme', v? 'dark':'light')
  }

  return (
    <button onClick={toggle} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">{dark? 'Light':'Dark'}</button>
  )
}
