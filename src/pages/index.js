import Head from 'next/head'
import { Prompt } from '@/components/Prompt'
import { Blobs } from '@/components/Blobs'
import { useConversationsStore } from '@/stores/conversations'

// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  const response = useConversationsStore(state => state.response)

  return (
    <>
      <Head>
        <title>openui.com</title>
        <meta name='description' content='Generador de componentes de UI con Inteligencia Artificial' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Blobs />

      <main className='px-10 py-24 relative min-h-screen w-screen'>

        <div className='min-h-screen'>
          <h1 className='bg-gradient-to-r from-indigo-300 to-purple-400 text-5xl font-bold text-transparent bg-clip-text mb-10'>Genera componentes con IA</h1>

          <div className='flex items-center h-full w-full'>
            <div className='w-full'>
              <Prompt />
            </div>
          </div>

          <div className='text-white'>
            {response}
          </div>

        </div>

      </main>
    </>
  )
}
