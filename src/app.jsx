import React, { useEffect, useState } from 'react';

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

const store = createStore({ count: 0 });

const useStore = (store) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const callback = () => {
      setState(store.getState());
    };
    const unsubscribe = store.subscribe(callback);
    callback();
    return unsubscribe;
  }, [store])

  return [state, store.setState];
}

const Counter1 = () => {
  const [state, setState] = useStore(store);

  const increment = () => {
    setState((prev) => ({ ...prev, count: prev.count + 1 }));
  }

  return (
    <div>
      {state.count} <button onClick={increment}>Increment</button>
    </div>
  )
}

const Counter2 = () => {
  const [state, setState] = useStore(store);

  const increment = () => {
    const nextState = { count: store.getState().count + 1};
    setState(nextState);
  }

  return (
    <div>
      {state.count} <button onClick={increment}>Increment</button>
    </div>
  )
}

const App = () => (
  <>
    <h1>Counter 1</h1>
    <Counter1 />

    <h1>Counter 2</h1>
    <Counter2 />
  </>
)

export default App;