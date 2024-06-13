'use client';
 
import { lusitana } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import "@/app/globals.css";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { authenticate } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { redirect } from 'next/navigation';
 
export default function LoginForm() {
  const initialState = { message: null, errors: {}, token: null };
  const [state, dispatch] = useFormState(authenticate, initialState);

  if ( state.message === "success") {
    document.cookie = `session=${state.token};`;
    redirect('/records/view/people');
  }
  return (
    <form action={dispatch} className="space-y-3">
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
        <div className="flex flex-row mt-4 ">
          <LoginButton />
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
        {state.errors &&
              Object.keys(state.errors).map((error: string) => (
                <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                  {error}
                </p>
        ))}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      className="w-28 flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium
                text-white transition-colors hover:bg-blue-400 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
                active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
    >
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </button>
  );
}
