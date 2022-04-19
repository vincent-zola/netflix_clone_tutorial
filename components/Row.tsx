// * ========== Imports ==========

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useRef, useState } from 'react'
import { Movie } from '../typings'
import Thumbnail from './Thumbnail'

// * ========== TS Types ==========

interface Props {
  // title is hardcoded in index.tsx
  title: string
  //! DocumentData is for Firebase, needs clarification
  // movie: Movie[] | DocumentData[]
  // one of the categories which we fetched
  movies: Movie[]
}
// *========== Variables & Functions ==========
const Row = ({ title, movies }: Props) => {
  // grab movie carousel
  // <HTMLDivElement> type for TS
  const rowRef = useRef<HTMLDivElement>(null)
  // state to show arrows just when we are at the opposite edge
  const [isMoved, setIsMoved] = useState(false)
  // Fn. if we click on the arrows in carousel
  const handleClick = (direction: string) => {
    setIsMoved(true)
    // .current gives us back the HTML element property's
    if (rowRef.current) {
      // clientWidth: width of Display, for example 826px
      // scrollLeft: default 0
      const { scrollLeft, clientWidth } = rowRef.current
      // scrollTo will either contain a plus or minus number
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth/1.5 // if left, will be a minus number
          : scrollLeft + clientWidth/1.5 // if right, will be a plus number
      // change the scrollLeft property in rowRef.current
      // Window.scrollTo() method scrolls to a particular set of coordinates in the document.
      // left: Specifies the number of pixels along the X axis to scroll the window or element.
      // behavior: Specifies whether the scrolling should animate smoothly (smooth)
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }


  // * ========== HTML ==========

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      {/* group: do something with all children */}
      <div className="group relative md:-ml-2">
        {/* group-hover: if we hover over parent element it will apply to all children with this property */}
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          } bg-[#141414d8] rounded`}
          onClick={() => handleClick('left')}
        />

        {/* overflow-x-scroll: what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content. */}
        {/* scrollbar-hide comes from the tailwind-scrollbar-hide library */}
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 bg-[#141414d8] rounded`}
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

export default Row
