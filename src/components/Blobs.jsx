function Blob ({ className = '', ...props }) {
  return (
    <div {...props} className={`${className} absolute rounded-3xl blur-3xl opacity-30 w-96 h-96`} />
  )
}

export function Blobs () {
  return (
    <div className='absolute opacity-80'>
      <Blob className='bg-purple-600 -top-32 -left-32' />
      <Blob className='bg-yellow-600 -top-32 -left-32' />
      <Blob className='bg-red-600 -top-32 -left-32' />
    </div>
  )
}
