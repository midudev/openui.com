import { useConversationsStore } from '@/stores/conversations'
import { Sandpack } from '@codesandbox/sandpack-react'
import { CopyIcon } from './Icons'

const defaultComponent = {
  vanilla: `<div style="display:flex;justify-content:center;margin-top:1rem">
   Aún no se creó una peticion
   </div>`,
  react: `export default function Component () {
  return (
    <div style={{display:"flex","justify-content":"center","margin-top": "1rem"}}>
    Aún no se creó una peticion
    </div>
  )
}`,
  vue: `<template>
  <div style="display:flex;justify-content:center;margin-top:1rem;">
      Aún no se creó una peticion
  </div>
</template>
<script setup></script>`,
  svelte: `<div style="display:flex;justify-content:center;margin-top:1rem">
Aún no se creó una peticion
</div>`
}

function generatePlaygroundFiles({ code, framework }) {
  code ??= ''
  code = code.replace(/`/g, '\\`')

  if (framework === 'vanilla') {
    return {
      '/index.js': {
        code: `document.getElementById("app").innerHTML = \`${code ? code.trim() : defaultComponent.vanilla}\``
      }
    }
  }

  if (framework === 'react') {
    return {
      '/App.js': {
        code: `import React from 'react'
import Component from './Component.jsx'

export default function App () {
  return (
    <div id='app'>
      <Component />
    </div>
  )
}
`
      },
      '/Component.jsx': {
        code: `${code ? code.trim() : defaultComponent.react}`
      }
    }
  }

  if (framework === 'vue') {
    return {
      '/src/Component.vue': {
        code: `${code ? code.trim() : defaultComponent.vue}`
      },
      '/src/App.vue': {
        code: `
        <template>
          <Component />
        </template>
        <script setup>
          import Component from './Component.vue'
        </script>
      `
      }
    }
  }

  if (framework === 'svelte') {
    return {
      '/Component.svelte': {
        code: `${code ? code.trim() : defaultComponent.svelte}`
      },
      '/App.svelte': {
        code: `<script>
  import Component from './Component.svelte'
</script>

<Component />`
      }
    }
  }

  return {}
}

function generateOptions({ language, framework }) {
  if (framework === 'vanilla') {
    return {
      activeFile: '/index.js'
    }
  }

  if (framework === 'react') {
    return {
      activeFile: '/Component.jsx',
      visibleFiles: ['Component.jsx', '/App.js']
    }
  }

  if (framework === 'vue') {
    return {
      activeFile: '/src/Component.vue',
      visibleFiles: ['/src/Component.vue', '/src/App.vue']
    }
  }

  if (framework === 'svelte') {
    return {
      activeFile: '/Component.svelte',
      visibleFiles: ['/Component.svelte', '/App.svelte']
    }
  }
}

export default function Preview() {
  const { code, language, framework } = useConversationsStore(
    ({ code, language, framework }) => ({ code, language, framework })
  )

  const files = generatePlaygroundFiles({ code, framework })
  const options = generateOptions({ language, framework })

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div>
      {files !== null && (
        <>
          <Sandpack
            options={{
              externalResources: ['https://cdn.tailwindcss.com'],
              wrapContent: true,
              ...options
            }}
            template={framework}
            theme='dark'
            files={files}
          />
          <footer>
            <button
              className='inline-flex items-center justify-center h-10 gap-1 pl-4 pr-3 text-sm font-semibold text-black transition duration-200 bg-white border border-white rounded-md select-none text-slate-11 hover:bg-slate-5 focus:ring-2 focus:ring-slate-7 focus:outline-none focus:bg-slate-6 disabled:hover:bg-slate-4 disabled:cursor-not-allowed disabled:opacity-70'
              onClick={handleCopy}
            >Copiar código<span class='text-[#70757E]'><CopyIcon /></span>
            </button>
          </footer>
        </>
      )}
    </div>
  )
}
