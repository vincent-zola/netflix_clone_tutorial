// * ========== Imports ==========

import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
// types for our fetched Movie obj.
import { Movie } from '../typings'

// * ========== Atoms ==========

// An atom represents a piece of state. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of all components subscribed to that atom:
export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
})
