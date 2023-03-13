import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectIcon } from './Icons'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Select({ disabled, list, label, value, update, selected }) {
  return (
    <Listbox disabled={disabled} value={value} onChange={update}>
      {({ open }) => (
        <div className={`${disabled ? 'opacity-50' : ''} flex items-center justify-center gap-x-2`}>
          <Listbox.Label className='block text-sm font-medium text-white'>{label}</Listbox.Label>
          <div className='relative text-center'>

            <Listbox.Button className='relative w-44 cursor-default rounded-md bg-black py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300-500 sm:text-sm sm:leading-6 hover:cursor-pointer'>
              <span className='flex items-center'>
                <span className='w-7 h-7'>
                  {selected.icon}
                </span>
                <span className='block ml-3 truncate'>{selected.name}</span>
              </span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none'>
                <SelectIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 w-full py-1 overflow-auto text-base bg-black rounded-md shadow-lg max-h-56 ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm'>
                {list.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-purple-900 text-white' : 'text-white',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )}
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span className='w-7 h-7'>
                            {option.icon}
                          </span>
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {option.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-white',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='w-5 h-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
