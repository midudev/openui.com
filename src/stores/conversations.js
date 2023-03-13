import { create } from 'zustand'
import { APIS } from '@/config/consts'

export const useConversationsStore = create((set, get) => ({
  code: null,
  language: null, // typescript or javascript
  framework: null, // react, vue, angular, vanilla
  streaming: false,
  step: 1,
  setFramework: (framework) => {
    const { step } = get()
    const newStep = step < 2 ? 2 : step
    set({ code: null, framework, step: newStep })
  },
  setLanguage: (language) => {
    const { step } = get()
    const newStep = step < 3 ? 3 : step
    set({ code: null, language, step: newStep })
  },
  generateComponent: async ({ prompt }) => {
    set({ streaming: true, step: 4 })

    const { language, framework } = get()

    const url = `${APIS.GENERATE}?prompt=${prompt}&language=${language}&framework=${framework}`

    const eventSource = new EventSource(url)
    let code = ''

    eventSource.onerror = (error) => {
      console.error(error)
      eventSource.close()
      set(() => ({ streaming: false }))
    }

    eventSource.onmessage = (event) => {
      const { data } = event

      if (data === '[DONE]') {
        set(() => ({ streaming: false }))

        eventSource.close()
        return
      }

      code += JSON.parse(data)
      set(() => ({ code }))
    }
  }
}))
