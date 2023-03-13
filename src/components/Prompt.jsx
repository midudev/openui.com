import { useEffect, useRef } from 'react'
import { useConversationsStore } from '@/stores/conversations'
import { Loading } from './Loading'
import { MicrophoneIcon, SendIcon } from './Icons'

export function Prompt() {
  const textAreaRef = useRef()
  const generateComponent = useConversationsStore(
    (state) => state.generateComponent
  )
  const streaming = useConversationsStore((state) => state.streaming)

  async function handleSubmit(event) {
    event?.preventDefault()

    const prompt = textAreaRef.current.value.trim()
    generateComponent({ prompt })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  const handleChange = (event) => {
    const el = textAreaRef.current

    el.style.height = '0px'
    const scrollHeight = el.scrollHeight
    el.style.height = `${scrollHeight}px`
  }

  useEffect(() => {
    textAreaRef.current.focus()
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
      <div className='relative block max-w-xl md:max-w-2xl'>
        <textarea
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          disabled={streaming}
          ref={textAreaRef}
          autoFocus
          placeholder='Crea un botón de color rojo con un borde de 2px y un borde redondeado de 5px.'
          rows={1}
          name='prompt'
          type='text'
          className={`resize-none ${
            streaming ? 'placeholder-white rounded-[5px] opacity-40 pointer-events-none' : ''
          } block w-full text-md px-4 py-2 border border-gray-800 bg-zinc-900/20 backdrop-blur-3xl sm:text-md shadow-lg h-[42px] text-white outline-none overflow-hidden transition ring-white/20 focus:ring-2`}
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
