import React from 'react'
import { BiSearch } from "react-icons/bi";

export default function SearchInput() {
  return (
    <form className='flex items-center gap-2'>
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full'/>
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <BiSearch className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}
