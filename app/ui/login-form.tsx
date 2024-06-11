'use client';
 
import { lusitana } from '@/app/ui/fonts';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/loginButton';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import "@/app/globals.css";
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import React, { useState } from "react";
 
export default function LoginForm() {
  //const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();
  const handleClick = () => {
    console.log('handleClick');
    fetch('http://localhost:3002/api/user/signup/route', {
      method: 'POST',
      body: JSON.stringify({username: 'User10', password: '123456', email: 'zisterz@kewjfhirewfhi.com'}),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  const handleLoginClick = () => {
    fetch('http://localhost:3002/api/user/login/route', {
      method: 'POST',
      body: JSON.stringify({username: 'User10', password: '123456', email: 'zisterz@kewjfhirewfhi.com'}),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      if (response.status === 200) {
        router.push('/home');
      } else if (response.status === 400) {
        response.json().then((resp) => {
          console.log(resp.error);
        });
      } else if (response.status === 500) {
          console.log('Server error');
      }
    }).catch((e) => {
      console.log(e);
    });
  }
  return (
    <>
    {/*
      <div className="flex flex-col">
        <button type="button" id="mybutton1" onClick={handleClick} >register</button>
        <button type="button" id="mybutton2" onClick={handleClick2} >login</button>
      </div>
    */}
    {/*
    <form action={dispatch} className="space-y-3">
    */}
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative flex">
              <input
                className="w-full bg-slate-200 border-1 border-slate-400"
                value="guest@ficticiousdomain.com"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                readOnly
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative flex">
              <input
                className="w-full bg-slate-200 border-1 border-slate-400"
                value="3809_7823_6510"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                readOnly
              />
              
            </div>
          </div>
        </div>
        <LoginButton handleClick={handleLoginClick} />

        {/*
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        */}

      </div>
      </>
    /*
    </form>
    */
  );
}
 
function LoginButton({handleClick} : { handleClick: any } ) {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleButtonClick = () => {
    setIsDisabled(true);
    handleClick();
  }
  return (
    <button
      disabled={isDisabled}
      onClick={handleButtonClick}
      className="mt-4 w-32 flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium
                text-white transition-colors hover:bg-blue-400 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
                active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
    >
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </button>
  );
}