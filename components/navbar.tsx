'use client';
import SignOutButton from '@/components/signout';
import Link from 'next/link';
import { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react';

export default function Navbar({ user_id }: { user_id: string }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav: any = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <nav
      className={`bg-slate-300 transition-all duration-300 h-14 top-0 sticky flex items-center justify-between border-b-2 ${
        isNavOpen ? 'h-40 md:h-14' : 'h-14'
      }`}
    >
      <div
        className={`container mx-auto flex justify-between ${
          isNavOpen ? 'items-start' : 'items-center'
        }`}
      >
        <ul>
          <li className='text-slate-800 text-sm font-semibold uppercase transition duration-300 cursor-pointer hover:text-slate-400'>
            <Link href='/'>HOME</Link>
          </li>
        </ul>
        <ul className='hidden md:flex justify-center text-sm items-center gap-3 uppercase font-light'>
          {user_id !== '' && (
            <li className='text-slate-800 font-semibold uppercase transition duration-300 cursor-pointer hover:text-slate-400'>
              <Link href={`/projects`}>Projects</Link>
            </li>
          )}

          {user_id !== '' && (
            <li className='text-slate-800 font-semibold uppercase transition duration-300 cursor-pointer hover:text-slate-400'>
              <Link href={`/projects/new`}>New Project</Link>
            </li>
          )}
          {user_id === '' ? (
            <li className='text-slate-800 font-semibold uppercase transition duration-300 cursor-pointer hover:text-slate-400'>
              <Link href={`/login`}>Login</Link>
            </li>
          ) : (
            <li>
              <SignOutButton />
            </li>
          )}
        </ul>
        {/* Mobile nav */}
        {isNavOpen && (
          <ul className='flex flex-col justify-center text-xs items-center gap-2 uppercase font-light md:hidden'>
            <li className='text-slate-800 font-semibold uppercase transition duration-300 cursor-pointer hover:text-slate-400'>
              <Link href='/'>Home</Link>
            </li>
            {user_id !== '' && (
              <li
                onClick={toggleNav}
                className='text-slate-800 font-semibold uppercase transition duration-300 cursor-pointer hover:text-slate-400'
              >
                <Link href={`/projects`}>Projects</Link>
              </li>
            )}

            {user_id !== '' && (
              <li
                onClick={toggleNav}
                className='text-slate-800 font-semibold uppercase transition duration-300 cursor-pointer hover:text-slate-400'
              >
                <Link href={`/projects/new`}>New Project</Link>
              </li>
            )}
            {user_id === '' ? (
              <li
                onClick={toggleNav}
                className='text-slate-800 font-semibold uppercase transition duration-300 cursor-pointer hover:text-slate-400'
              >
                <Link href={`/login`}>Login</Link>
              </li>
            ) : (
              <li onClick={toggleNav}>
                <SignOutButton />
              </li>
            )}
          </ul>
        )}
        <button
          className={`visible flex ${
            isNavOpen ? 'items-start' : 'items-center'
          } md:hidden`}
        >
          <Hamburger
            onToggle={toggleNav}
            toggled={isNavOpen}
            color='#000'
            size={20}
          />
        </button>
      </div>
    </nav>
  );
}
