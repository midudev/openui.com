import { create } from 'zustand'
import { APIS } from '@/config/consts'

export const useConversationsStore = create(set => ({
  response: null,
  isReplying: false,
  generateComponent: async ({ prompt, language = 'javascript', framework = 'react' }) => {
    set({ isReplying: true })

    const url = `${APIS.GENERATE}?prompt=${prompt}&language=${language}&framework=${framework}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { content } = await response.json()

    set({
      isReplying: false,
      response: content
    })
  }
}))
