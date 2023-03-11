import { useEffect, useRef } from 'react'
import { useConversationsStore } from '@/stores/conversations'

export function Prompt () {
  const textAreaRef = useRef()
  const generateComponent = useConversationsStore(state => state.generateComponent)

  async function handleSubmit (event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const prompt = formData.get('prompt')

    generateComponent({ prompt })
  }

  useEffect(() => {
    textAreaRef.current.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        ref={textAreaRef}
        autoFocus
        rows={1}
        name='prompt'
        type='text'
        placeholder=''
        className='block w-full text-xl px-4 py-2 border border-gray-600 rounded-lg bg-zinc-900/50 backdrop-blur-3xl sm:text-md shadow-lg h-[48px] text-white outline-none'
      />
      <button className='text-white'>Enviar consulta</button>
    </form>
  )
}
