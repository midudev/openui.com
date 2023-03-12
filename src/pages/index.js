import Head from 'next/head'
import { Prompt } from '@/components/Prompt'
import { Blobs } from '@/components/Blobs'
import { useConversationsStore } from '@/stores/conversations'
import Preview from '@/components/Preview'
// import Balancer from 'react-wrap-balancer'
import { SelectFramework } from '@/components/SelectFramework'
import { Debug } from '@/components/Debug'

// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const response = useConversationsStore((state) => state.response)

  return (
    <>
      <Head>
        <title>openui.com</title>
        <meta
          name='description'
          content='Generador de componentes de UI con Inteligencia Artificial'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Blobs />

      <main className='px-10 py-24 relative min-h-screen w-screen'>
        <div className='min-h-screen'>
          <h1 className='block bg-gradient-to-b from-white via-white/90 to-gray-300 text-5xl font-bold text-transparent bg-clip-text mb-10 text-center'>
            Genera componentes con IA
          </h1>

          <SelectFramework />

          <div className='flex items-center h-full w-full'>
            <div className='w-full'>
              <Prompt />
            </div>
          </div>

          <div className='text-white'>{response}</div>

          <Preview />
        </div>

        <Debug />
      </main>
    </>
  )
}
