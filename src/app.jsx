import React, { useCallback, useEffect, useState } from 'react';

const createStore = (initialState) => {
  const listeners = new Set();
  let state = initialState;
  const getState = () => state;
  const setState = (nextState) => {
    state = typeof nextState === 'function' ? nextState(state) : nextState;
    listeners.forEach((listener) => listener());
  }
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { getState, setState, subscribe }
}

const identity = (x) => x;

const useStore = (store, selector = identity) => {
  const [state, setState] = useState(selector(store.getState()));

  useEffect(() => {
    const callback = () => {
      setState(selector(store.getState()));
    };
    const unsubscribe = store.subscribe(callback);
    callback();
    return unsubscribe;
  }, [store, selector]);

  return [state, store.setState];
}

// APP CODE

const store = createStore({ count1: 0, count2: 0 });

const Counter1 = () => {
  const [count1, setState] = useStore(
    store,
    useCallback((state) => state.count1, [])
  );

  const increment1 = () => {
    setState((prev) => ({ 
      ...prev,
      count1: prev.count1 + 1
    }));
  }

  return (
    <div>
      {count1} <button onClick={increment1}>Increment</button>
      {Math.random()}
    </div>
  )
}
const Counter2 = () => {
  const [count2, setState] = useStore(
    store,
    useCallback((state) => state.count2, [])
  );

  const increment2 = () => {
    setState((prev) => ({ 
      ...prev,
      count2: prev.count2 + 1
    }));
  }

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