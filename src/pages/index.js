import Head from 'next/head'
import { Prompt } from '@/components/Prompt'
import { Blob } from '@/components/Blobs'
import { useConversationsStore } from '@/stores/conversations'
import Preview from '@/components/Preview'
import { SelectFramework } from '@/components/SelectFramework'
import { Debug } from '@/components/Debug'
import { StepTitle } from '@/components/StepTitle'
import { SelectLanguage } from '@/components/SelectLanguage'

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const step = useConversationsStore((state) => state.step)

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

      <div className='relative'>
        <div className='relative z-10 flex flex-col max-w-5xl min-h-screen px-4 pt-32 mx-auto h-screen-ios sm:px-8 md:max-w-4xl'>
          <main className=''>
            <h1 className='mt-2 animate-hero-heading-slide-up-fade bg-gradient-to-br from-white to-slate-10 bg-clip-text text-transparent text-[35px] leading-[42px] sm:text-6xl tracking-[-0.64px] sm:leading-[68px] sm:tracking-[-0.896px] font-bold mb-12 animate-fadeIn'>
              <span className='inline-block max-w-[700px] align-top'>
                Genera tus{' '}
                <span className='bg-clip-text bg-gradient-to-b from-purple-200 via-purple-400 to-purple-800'>
                  componentes
                </span>
                <br />
                con{' '}
                <span className='relative bg-clip-text bg-gradient-to-b from-purple-200 via-purple-400 to-purple-800'>
                  <Blob className='absolute right-0 bg-purple-500 -top-[200%]' />
                  Inteligencia Artificial
                </span>
              </span>
            </h1>

            <section className='mb-20 animate-delay-500 animate-fadeIn'>
              <StepTitle number={1}>
                <span>
                  Selecciona el{' '}
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-sky-400'>
                    framework
                  </span>
                </span>
              </StepTitle>
              <SelectFramework />
            </section>

            {step >= 2 && (
              <section className='mb-20 animate-fadeIn'>
                <StepTitle number={2}>
                  <span>
                    Selecciona el{' '}
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400'>
                      lenguaje de programación
                    </span>
                  </span>
                </StepTitle>
                <SelectLanguage />
              </section>
            )}

            {step >= 3 && (
              <section className='mb-20 animate-fadeIn'>
                <StepTitle number={3}>
                  <span>
                    Explica tu{' '}
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-red-400'>
                      componente
                    </span>
                  </span>
                </StepTitle>
                <Prompt />
              </section>
            )}

            {step >= 4 && (
              <section className='mb-20 animate-fadeIn'>
                <StepTitle number={4}>
                  <span>
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400'>
                      Resultado
                    </span>
                  </span>
                </StepTitle>
                <Preview />
              </section>
            )}

            {step >= 4 && (
              <footer className='block pb-20 mt-10 delay-700 text-white/80 animate-fadeIn'>
                Proyecto realizado por{' '}
                <a className='text-white' href='https://twitter.com/midudev'>
                  @midudev
                </a>
              </footer>
            )}
          </main>
        </div>
      </div>
    </>
  )
}

/*
<main className='relative w-screen min-h-screen px-10 py-24'>
<div className='min-h-screen'>

  <div className='flex items-center w-full h-full'>
    <div className='w-full'>
      <Prompt />
    </div>
  </div>

  <div className='text-white'>{response}</div>

  <Preview />
</div>

<Debug />
</main>
*/
