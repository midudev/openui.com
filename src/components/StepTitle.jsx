export function StepTitle ({ children, number }) {
  return (
    <h2
      id={`step-${number}`}
      className='relative inline-flex items-center gap-x-4 mb-6 text-3xl tracking-[-0.288px] text-white font-bold'
    >
      <span className='flex items-center justify-center'>
        <span className='flex items-center justify-center w-8 h-8 text-base font-extrabold text-black bg-white rounded-full'>
          {number}
        </span>
        <span className='bg-white h-[2px] w-12' />
      </span>
      {children}
    </h2>
  )
}
