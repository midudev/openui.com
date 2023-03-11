import { useConversationsStore } from '@/stores/conversations'
import { useState } from 'react'

export function Debug () {
  const [open, setOpen] = useState(true)

  const { code, language, framework } = useConversationsStore(
    ({ code, language, framework }) => ({ code, language, framework })
  )

  if (!open) return null

  return (
    <div className='fixed top-0 right-0 bg-white p-4 text-xs'>
      <button onClick={() => setOpen(!open)}>ⅹ</button>

      <h1 className='font-bold'>Debug</h1>
      <ul>
        <li>Framework: {framework}</li>
        <li>Language: {language}</li>
        <li>Code: {code}</li>
      </ul>
    </div>
  )
}
