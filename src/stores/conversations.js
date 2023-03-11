import { create } from 'zustand'
import { APIS } from '@/config/consts'

export const useConversationsStore = create((set, get) => ({
  code: null,
  language: 'javascript', // typescript or javascript
  framework: 'vanilla', // react, vue, angular, vanilla
  streaming: false,
  setFramework: (framework) => set({ code: null, framework }),
  setLanguage: (language) => set({ language }),
  generateComponent: async ({ prompt }) => {
    set({ streaming: true })

    const { language, framework } = get(
      ({ language, framework }) => ({ language, framework })
    )

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
