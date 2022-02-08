import React, { useCallback, useSyncExternalStore } from 'react';

const createStore = (createState) => {
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
const useStore = (store, selector = identity) => {
  // prevent screen tearing for React 18
  return useSyncExternalStore(
    store.subscribe,
    useCallback(() => selector(store.getState()), [store, selector]),
  )
}

// APP CODE

const store = createStore((setState) => ({
  count1: 0,
  count2: 0,
  increment1: () => {
    setState((prev) => ({ 
      ...prev,
      count1: prev.count1 + 1
    }));
  },
  increment2: () => {
    setState((prev) => ({ 
      ...prev,
      count2: prev.count2 + 1
    }));
  }
}));

const Counter1 = () => {
  const count1 = useStore(
    store,
    (state) => state.count1,
  );
  const increment1 = useStore(
    store,
    (state) => state.increment1,
  );

  return (
    <div>
      {count1} <button onClick={increment1}>Increment</button>
      {Math.random()}
    </div>
  )
}


const Counter2 = () => {
  const count2 = useStore(
    store,
    useCallback((state) => state.count2, [])
  );
  const increment2 = useStore(
    store,
    useCallback((state) => state.increment2, [])
  );

  return (
    <div>
      {count2} <button onClick={increment2}>Increment</button>
      {Math.random()}
    </div>
  )
}


const App = () => (
  <>
    <h1>Counter 1</h1>
    <Counter1 />
    <Counter1 />
    <h1>Counter 2</h1>
    <Counter2 />
    <Counter2 />
  </>
)

export default App;