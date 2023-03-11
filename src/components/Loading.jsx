const { useState, useEffect } = require('react')

const loadingStates = [
  [true, false, false], // .
  [true, true, false], // ..
  [true, true, true] // ...
]

export function Loading () {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % loadingStates.length)
    }, 500)

    return () => clearInterval(interval)
  }, [index])

  return (
    <div className='flex items-center text-white text-3xl'>
      <div>·</div>
      <div className={index > 0 ? '' : 'invisible'}>·</div>
      <div className={index === 2 ? '' : 'invisible'}>·</div>
    </div>
  )
}
