const { OPENAI_API_KEY } = process.env

const API_URL = 'https://api.openai.com/v1/chat/completions'

export default async function handler (req, res) {
  console.log('new request')
  if (req.method !== 'GET') return res.status(405).end()

  const { prompt, language, framework } = req.query

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' })
  if (!language) return res.status(400).json({ error: 'Prompt is required' })
  if (!framework) return res.status(400).json({ error: 'Prompt is required' })

  console.log('request: todos los campos válidos')

  // 3 roles:
  // - user: Como si el usuario estuviese escribiendo
  // - assistant: Como si el ChatGpt nos contestase
  // - system: Como si el ROOT estuviese escribiendo

  const messages = [
    { role: 'system', content: 'Asume que eres developer y estás generando código para ser usado en producción. Sólo genera el código sin explicaciones. Por defecto, usa HTML y CSS si no se te indica lo contrario.' },
    { role: 'user', content: 'Crea un botón' },
    { role: 'assistant', content: '<button>Button</button>\ninfo:Botón con sólo HTML.' },
    { role: 'user', content: 'Crea un botón que diga "Hola", que sea redondeado con fondo rojo' },
    { role: 'assistant', content: '<button style="background: red; color: white; border-radius: 9999px;">Hola</button>\ninfo:Botón con HTML y CSS en línea con estilos.' },
    { role: 'user', content: 'Crea un botón con Tailwind.' },
    { role: 'assistant', content: '<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button>\ninfo: Botón usando clases de Tailwind de color azul' },
    { role: 'user', content: 'Crea un botón con Tailwind que diga "Hola"' },
    { role: 'assistant', content: '<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Hola</button>\ninfo:Botón usando clases de Tailwind que dice Hola y es de color azul' },
    { role: 'user', content: 'Crea un botón de React que al hacer click aparezca un alert' },
    {
      role: 'assistant', content: `export default function Button () {
  return <button onClick={() => alert("Hola")}>Button</button>
}\ninfo:Botón de React que al hacer click muestra un alert`
    }
  ]

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [...messages, { role: 'user', content: prompt }],
      stream: false, // esto luego lo pondremos en true
      temperature: 0.0,
      stop: ['\ninfo:']
    })
  })

  if (!response.ok) {
    return res.status(500).json({ error: 'Something went wrong' })
  }

  const { usage, choices } = await response.json()
  const { content } = choices?.[0]?.message

  return res.status(200).json({ content })
}
