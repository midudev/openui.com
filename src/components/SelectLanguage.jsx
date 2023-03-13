import { useConversationsStore } from '@/stores/conversations'
import { JavaScriptIcon, TypeScriptIcon } from './Icons'
import { Select } from './Select'

const LANGUAGES = [
  {
    name: 'JavaScript',
    icon: <JavaScriptIcon />,
    value: 'javascript'
  },
  {
    name: 'TypeScript',
    icon: <TypeScriptIcon />,
    value: 'typescript'
  }
]

export function SelectLanguage() {
  const { language, setLanguage, streaming } = useConversationsStore((state) => ({
    language: state.language,
    setLanguage: state.setLanguage,
    streaming: state.streaming
  }))

  const selected = LANGUAGES.find((f) => f.value === language)

  return (
    <Select
      disabled={streaming}
      list={LANGUAGES}
      label='Lenguaje:'
      value={language}
      update={setLanguage}
      selected={selected}
    />
  )
}
