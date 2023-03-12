import { useConversationsStore } from '@/stores/conversations'
import { ReactIcon, VueIcon, SvelteIcon, JavaScriptIcon } from './Icons'

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
  const { framework, setFramework } = useConversationsStore((state) => ({
    framework: state.framework,
    setFramework: state.setFramework
  }))

  return (
    <ul className='flex items-center gap-x-4'>
      {FRAMEWORKS.map(({ name, icon, value }) => (
        <li key={value}>
          <label className={`flex flex-col items-center justify-center gap-2 ${framework === value ? 'text-white' : 'text-white/60'}`}>
            <input
              defaultChecked={framework === value}
              onClick={() => setFramework(value)}
              className='peer'
              hidden
              type='radio'
              name='framework'
              value={value}
            />
            <span className='flex h-16 transition cursor-pointer hover:opacity-75 hover:scale-125 opacity-40 peer-checked:opacity-100'>
              {icon}
            </span>
            {name}
          </label>
        </li>
      ))}
    </ul>
  )
}
