'use client'
import React, {useEffect, useState} from 'react'
import { Moon, SunMedium } from 'lucide-react'

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
    localStorage.setItem('theme', v ? 'dark' : 'light')
  }

  return (
    <button onClick={toggle} className="button-secondary w-full justify-between">
      <span>{dark ? 'Switch to light' : 'Switch to dark'}</span>
      {dark ? <SunMedium size={18} /> : <Moon size={18} />}
    </button>
  )
}
