import { useConversationsStore } from '@/stores/conversations'
import { Sandpack } from '@codesandbox/sandpack-react'
import { amethyst } from '@codesandbox/sandpack-themes'

const defaultComponent = {
  vanilla: `<div style="display:flex;justify-content:center;margin-top:1rem">
   Aún no se creo una peticion
   </div>`,
  react: `export default function Component () {
  return (
    <div style={{display:"flex","justify-content":"center","margin-top": "1rem"}}>
    Aún no se creo una peticion
    </div>
  )
}`,
  vue: `<template>
  <div style="display:flex;justify-content:center;margin-top:1rem;">
      Aún no se creo una peticion
  </div>
</template>
<script setup></script>`,
  svelte: `<div style="display:flex;justify-content:center;margin-top:1rem">
Aún no se creo una peticion
</div>`
}
function generatePlaygroundFiles ({ code, framework }) {
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
        code: `<template>
    <Component />
  </template>
  <script setup>
    import Component from './Component.vue'
  </script>`
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

function generateOptions ({ language, framework }) {
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

export default function Preview () {
  const { code, language, framework } = useConversationsStore(
    ({ code, language, framework }) => ({ code, language, framework })
  )

  const files = generatePlaygroundFiles({ code, framework })
  const options = generateOptions({ language, framework })

  return (
    <div className='mt-10'>
      {
        files !== null && (
          <Sandpack
            options={{
              externalResources: ['https://cdn.tailwindcss.com'],
              wrapContent: true,
              ...options
            }}
            template={framework}
            theme={amethyst}
            files={files}
          />
        )
      }
    </div>
  )
}
