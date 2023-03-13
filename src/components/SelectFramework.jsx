import { useConversationsStore } from '@/stores/conversations'
import { ReactIcon, VueIcon, SvelteIcon, JavaScriptIcon } from './Icons'
import { Select } from './Select'

const FRAMEWORKS = [
  {
    name: 'Vanilla',
    icon: <JavaScriptIcon />,
    value: 'vanilla'
  },
  {
    name: 'React',
    icon: <ReactIcon />,
    value: 'react'
  },
  {
    name: 'Vue',
    icon: <VueIcon />,
    value: 'vue'
  },
  {
    name: 'Svelte',
    icon: <SvelteIcon />,
    value: 'svelte'
  }
]

export function SelectFramework() {
  const { framework, setFramework, streaming } = useConversationsStore((state) => ({
    framework: state.framework,
    setFramework: state.setFramework,
    streaming: state.streaming
  }))

  const selected = FRAMEWORKS.find((f) => f.value === framework)

  return (
    <Select
      disabled={streaming}
      list={FRAMEWORKS}
      label='Framework:'
      value={framework}
      update={setFramework}
      selected={selected}
    />
  )
}
