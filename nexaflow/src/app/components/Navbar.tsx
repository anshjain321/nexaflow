import React from 'react'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { ArrowRight } from 'lucide-react'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
const Navbar = () => {
  return (
    <nav className='sticky h-15 z-30 w-full inset-x-0 border-gray-200 border-b transition-all bg-white/75 backdrop-blur-lg '>
      <MaxWidthWrapper>
        <div className='flex h-15 justify-between items-center border-b border-zinc-200'>
       <Link href={'/'} className='flex z-40 font-semibold'>
       <span>Nexaflow.</span>
       </Link>
      
        <div className='hidden items-center space-x-4  sm:flex ' >
          <>
          <Link href={'/pricing'} className=' rounded-full p-2 pl-4 pr-4 flex flex-row items-center hover:bg-slate-200 '>
            <span className='text-black font-semibold'>Pricing</span>
          </Link>
          <LoginLink className='rounded-full p-2 pl-4 pr-4 flex flex-row items-center hover:bg-slate-200 '>
            <span className='text-black font-semibold '>Sign in</span>
          </LoginLink>
          <RegisterLink   className="bg-black rounded-full py-2 pl-4 pr-4 flex flex-row items-center ">
          <div className="text-white text-lg ">Get Started</div>{" "}
          <ArrowRight color="#ffffff" className="ml-2 h-5 w-5 " />
          </RegisterLink>
          </>
        </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
