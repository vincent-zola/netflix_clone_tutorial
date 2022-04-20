// *========== Imports ==========

import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

// *========== Variables & Functions ==========

const Header = () => {
  // for checking is Scrollbar was moved
  const [isScrolled, setIsScrolled] = useState(false)
  // use useAuth to import the State from useAuth component and extract the values
  const { logout } = useAuth()

  useEffect(() => {
    //   Fn. checks if user scrolled
    const handleScroll = () => {
      // check if window was scrolled
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // listen if user is scrolling
    window.addEventListener('scroll', handleScroll)
    // cleanup Fn.
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    //! empty dependency array means, it will run just when the Header component is mounting, not sure about this...
  }, [])

  // *========== HTML ==========
  return (
    // header will appear black if user scrolls down
    <header className={`${isScrolled ? 'bg-[#141414]' : 'bg-[#141414d8]'}`}>
      {/* tailwind is mobil first, so we need to write "md:" to reflect desktop view */}
      {/* space: Control the horizontal space between elements */}
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          //! img src from wikipedia, needs change
          src="https://rb.gy/ulxxee"
          //   width is in px
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        {/* <Link href="/account"> */}
        
          <img
          onClick={logout}
            //! img src unknown, needs change
            src="https://rb.gy/g1pwyx"
            alt="account link"
            className="cursor-pointer rounded"
          />
        {/* </Link> */}
      </div>
    </header>
  )
}

export default Header
