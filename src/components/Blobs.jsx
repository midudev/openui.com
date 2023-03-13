export function Blob({ className = '', ...props }) {
  return (
    <div
      {...props}
      className={`${className} absolute rounded-3xl blur-3xl opacity-10 w-96 h-96`}
    />
  )
}

export function Blobs() {
  return (
    <div className='absolute opacity-80'>
      <Blob className='bg-purple-800 -top-32 -left-32' />
      <Blob className='bg-yellow-800 -top-32 -left-32' />
      <Blob className='bg-red-800 -top-32 -left-32' />
    </div>
  )
}
