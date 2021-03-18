import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

let store

//should go to component level
const initialState = {
  allVideos: [],
  currentVideo: undefined, 
  isLoading: false,
  pageNo: 1,
  totalVideos: 0,
  next: false,
  prev: false,
  last: 0,
  currentFilter: '7939056',
  filterData: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_VIDEOS':
      return {
        ...state,
        allVideos: action.payload.videos,
        total: parseInt(action.payload.total),
        next: action.payload.next, 
        prev: action.payload.prev,
        last: action.payload.last,
        pageNo: action.payload.page,
        isLoading: false
      }
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'CHANGE_PAGE':
      return {
        ...state,
        pageNo: action.payload
      }
    case 'SET_VIDEO':
      return {
        ...state,
        currentVideo: action.payload
      }
    case 'GET_FILTERS':
      return {
        ...state, 
        filterData: action.payload
      }
    case 'SET_FILTER':
      return {
        ...state, 
        currentFilter: action.payload
      }
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export const initializeStore = (preloadedState) => {
  //?? loads first or second if first undefined
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
