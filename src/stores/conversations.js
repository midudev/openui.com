import { create } from 'zustand'
import { APIS } from '@/config/consts'

export const useConversationsStore = create((set, get) => ({
  code: null,
  language: 'javascript', // typescript or javascript
  framework: 'vanilla', // react, vue, angular, vanilla
  streaming: false,
  prompt: '',
  setPrompt: (prompt) => {
    set({ code: null, prompt })
  },
  setFramework: (framework) => {
    const { prompt, generateComponent } = get()
    set({ code: null, framework })
    prompt && generateComponent({ prompt, framework })
  },
  setLanguage: (language) => {
    const { prompt, generateComponent } = get()
    set({ code: null, language })
    prompt && generateComponent({ prompt, language })
  },
  generateComponent: async ({
    prompt,
    language: overwriteLanguage,
    framework: overwriteFramework
  }) => {
    set({ streaming: true })

    const { language: stateLanguage, framework: stateFramework } = get()
    const language = overwriteLanguage ?? stateLanguage
    const framework = overwriteFramework ?? stateFramework

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
