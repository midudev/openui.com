import { useConversationsStore } from '@/stores/conversations'
import { JavaScriptIcon, TypeScriptIcon } from './Icons'

const FRAMEWORKS = [
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
  const { language, setLanguage } = useConversationsStore((state) => ({
    language: state.language,
    setLanguage: state.setLanguage
  }))

  return (
    <ul className='flex items-center gap-x-4'>
      {FRAMEWORKS.map(({ name, icon, value }) => (
        <li key={value}>
          <label className={`flex flex-col items-center justify-center gap-2 ${language === value ? 'text-white' : 'text-white/60'}`}>
            <input
              onClick={() => setLanguage(value)}
              className='peer'
              hidden
              type='radio'
              name='framework'
              value={value}
            />
            <span className={`flex h-16 transition cursor-pointer hover:opacity-75 hover:scale-125 ${language === value ? 'opacity-100' : 'opacity-40'}`}>
              {icon}
            </span>
            {name}
          </label>
        </li>
      ))}
    </ul>
  )
}
