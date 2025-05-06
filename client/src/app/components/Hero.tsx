/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Link from 'next/link'
import { LogInForm } from './LogIn'
import { SliderToggle } from './ui/SliderToggle'
import { useState } from 'react';
import { RegisterForm } from './Register';

export default function HeroSection() {
  const [selected, setSelected] = useState<"Log In" | "Register">("Log In");
    return (
    <>
      <section className="bg-gray-900 py-6 overflow-hidden min-h-screen w-screen flex flex-col relative">
        {/* Background elements */}
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
        
        {/* Content container with responsive layout */}
        <div className="mx-auto w-full max-w-7xl p-5 flex flex-col h-full">
          
          {/* Hero content */}
          <div className="flex flex-col items-center justify-center p-6 mb-8">
            <div className="text-center flex flex-col items-center space-y-6 md:space-y-7 max-w-4xl">
              <span className="border border-gray-500 px-6 py-0.5 rounded-full bg-gray-950 bg-opacity-50 text-gray-300">
                Track Your Career Journey
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl/tight xl:text-6xl/tight text-white font-bold capitalize text-center">
                Organize & Optimize Your Job Search Process
              </h1>
              <p className="text-base text-gray-300 text-center max-w-xl">
                Keep track of every application, interview, and offer in one place. Take control of your job search
                with powerful tools designed to help you land your dream role faster.
              </p>
              <div className="flex justify-center pb-8">
                <Link href="/#login" className="px-8 h-12 rounded-full flex items-center gap-x-3 bg-blue-700 text-white hover:bg-opacity-80">
                  Dont have an account?
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Login form section - placed below everything */}
          <div className="flex justify-center items-center mt-4 mb-10">
            <div className="w-full max-w-md bg-gray-800 p-3 rounded-xl shadow-l" id='login'> 
              
              <SliderToggle selected={selected} setSelected={setSelected} /> {selected === "Log In" ? <LogInForm/> : <RegisterForm/>} 
              
            </div>
          </div>
        </div>
      </section>
    </>
  )
}