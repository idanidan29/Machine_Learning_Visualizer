"use client"
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false)
  const toggleNavbar = () => {
    setOpenNavbar(openNavbar => !openNavbar)
  }
  return (
    <header className="absolute top-0 inset-x-0 z-50 h-24 flex items-center">
      <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 h-full items-center">
        <nav className="flex justify-between items-center h-full">
          <div className="flex min-w-max items-center">
            <Link href="/" className="flex items-center gap-x-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
              <div className="flex items-center -space-x-3 font-semibold">
                <span className="h-6 aspect-square bg-blue-600 dark:bg-blue-400 rounded-full flex" />
                <span className="h-6 aspect-square bg-gray-600 dark:bg-white rounded-full flex" />
              </div>
              JobTrack
            </Link>
          </div>
          <div className={`
              flex flex-col space-y-10 inset-0 fixed top-0  h-[100dvh] bg-white dark:bg-gray-950 lg:!bg-transparent py-20 px-5 sm:px-10 md:px-14
              transition-all ease-linear duration-300 lg:flex-row lg:flex-1 lg:py-0 lg:px-0 lg:space-y-0 lg:gap-x-10 lg:relative lg:top-0 lg:h-full lg:items-center lg:justify-between lg:w-max
              ${openNavbar ? "visible opacity-100 translate-y-0" : "-translate-y-9 opacity-0 invisible lg:translate-y-0 lg:visible lg:opacity-100"}
            `}>
        
          </div>
          <div className="flex items-center justify-end relative z-60 lg:hidden">
            <button onClick={() => {
              toggleNavbar()
            }} className="p-3 rounded-full bg-blue-600 dark:bg-blue-500 outline-none w-12 aspect-square flex flex-col relative justify-center items-center">
              <span className="sr-only">
                toggle navbar
              </span>
              <span className={`
                  w-6 h-0.5 rounded-full bg-gray-300 transition-transform duration-300 ease-linear
                  ${openNavbar ? "translate-y-1.5 rotate-[40deg]" : ""}
                `} />
              <span className={`
                  w-6 origin-center  mt-1 h-0.5 rounded-full bg-gray-300 transition-all duration-300 ease-linear
                  ${openNavbar ? "scale-x-0 opacity-0" : ""}
                `} />
              <span className={`
                  w-6 mt-1 h-0.5 rounded-full bg-gray-300 transition-all duration-300 ease-linear
                  ${openNavbar ? "-translate-y-1.5 -rotate-[40deg]" : ""}
                `} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
 
export default function HeroSection() {
  return (
    <>
      <Navbar />
      <section className="bg-gray-100 dark:bg-gray-900 py-32 sm:py-36 lg:py-40 overflow-hidden h-[100dvh] min-h-max flex items-center relative">
        <div className="absolute top-0 left-0 -translate-x-[54%] -translate-y-[70%] w-2/5 rounded-full aspect-square bg-blue-600/70
          backdrop-filter blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 translate-x-[54%] translate-y-[70%] w-2/5 rounded-full aspect-square bg-blue-600/70
          backdrop-filter blur-3xl opacity-50" />
        <div className="absolute min-w-[300px] w-[48%] md:w-2/5 aspect-square rounded-full bg-gradient-to-r from-blue-400/5 right-0
          -translate-y-[40%] translate-x-[40%] top-0">
          <div className="inset-[10%] rounded-full bg-gradient-to-l from-blue-400/20">
            <div className="absolute inset-[20%] rounded-full bg-gradient-to-l from-blue-400/30" />
          </div>
        </div>
        <div className="absolute min-w-[300px] w-[48%] md:w-2/5 aspect-square rounded-full bg-gradient-to-l from-blue-400/5 left-0
          translate-y-[40%] -translate-x-[40%] bottom-0">
          <div className="inset-[10%] rounded-full bg-gradient-to-r from-blue-400/40">
            <div className="absolute inset-[20%] rounded-full bg-gradient-to-r from-blue-400/50" />
          </div>
        </div>
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
          <div className="text-center flex flex-col items-center space-y-10">
            <span className="border border-gray-500 px-3 py-0.5 rounded-full bg-gray-50 dark:bg-gray-950 bg-opacity-50 text-gray-700 dark:text-gray-300">
              Track Your Career Journey
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl/tight xl:text-7xl/tight text-gray-900 dark:text-white font-bold max-w-4xl capitalize">
              Organize & Optimize Your Job Search Process
            </h1>
            <p className="text-base text-gray-700 dark:text-gray-300 text-center max-w-xl">
              Keep track of every application, interview, and offer in one place. Take control of your job search
              with powerful tools designed to help you land your dream role faster.
            </p>
            <div className="flex justify-center">
              <Link href="/register" className="px-8 h-12 rounded-full flex items-center gap-x-3 bg-blue-700 text-white hover:bg-opacity-80">
                Get Started
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}