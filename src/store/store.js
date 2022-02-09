import { useCallback, useSyncExternalStore } from 'react';

export const createStore = (createState) => {
  const listeners = new Set();
  const getState = () => state;
  const setState = (nextState) => {
    state = typeof nextState === 'function' ? nextState(state) : nextState;
    listeners.forEach((listener) => listener());
  }
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
  let state = createState(setState)

  return { getState, setState, subscribe }
}

// used as default selector to get whole store state
const identity = (x) => x;

// selector is used to grab particular property from the store store
export const useStore = (store, selector = identity) => {
  // prevent screen tearing for React 18
  return useSyncExternalStore(
    store.subscribe,
    useCallback(() => selector(store.getState()), [store, selector]),
  )
}