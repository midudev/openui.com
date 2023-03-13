import { useEffect, useRef } from 'react'
import { useConversationsStore } from '@/stores/conversations'
import { Loading } from './Loading'
import { MicrophoneIcon, SendIcon } from './Icons'

export function Prompt() {
  const inputRef = useRef()
  const generateComponent = useConversationsStore(
    (state) => state.generateComponent
  )
  const setPrompt = useConversationsStore(
    (state) => state.setPrompt
  )
  const streaming = useConversationsStore((state) => state.streaming)
  const prompt = useConversationsStore((state) => state.prompt)

  async function handleSubmit(event) {
    event?.preventDefault()

    const prompt = textAreaRef.current.value.trim()

    generateComponent({ prompt })
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  function handleSpeechToText() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your browser')
      return
    }

    textAreaRef.current.value = ''

    const recognition = new SpeechRecognition()
    recognition.interimResults = true
    recognition.lang = 'es-ES'

    recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('')

      textAreaRef.current.value = transcript
    })

    recognition.addEventListener('end', handleSubmit)

    recognition.start()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='relative block'>
        <input
          value={prompt}
          onChange={(event) => {
            const { value } = event.target
            setPrompt(value)
          }}
          disabled={streaming}
          ref={inputRef}
          autoFocus
          placeholder='Crea un botón de color rojo con un borde de 2px y un borde redondeado de 5px.'
          rows={1}
          name='prompt'
          type='text'
          className={`resize-none pr-10 ${
            streaming ? 'opacity-40 pointer-events-none' : ''
          } placeholder-white/30 rounded-2xl block w-full text-md px-6 text-xl py-4 border border-zinc-600 bg-white/5 backdrop-blur-3xl sm:text-md shadow-lg text-white outline-none overflow-hidden transition ring-white/40 focus:ring-2`}
        />
        <div className='absolute top-0 flex items-center justify-center h-full right-4'>
          {streaming ? (
            <Loading />
          ) : (
            <div className='flex items-center gap-2'>
              <button className='transition-all hover:scale-125' type='button' onClick={handleSpeechToText}>
                <MicrophoneIcon />
              </button>
              <button className='transition-all hover:scale-125' type='submit'>
                <SendIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
