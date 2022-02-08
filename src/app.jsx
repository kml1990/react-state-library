import React, { useEffect, useState } from 'react';

const createStore = (initialState) => {
  const listeners = new Set();
  let state = initialState;
  const getState = () => state;
  const setState = (nextState) => {
    state = nextState;
    listeners.forEach((listener) => listener());
  }
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { getState, setState, subscribe }
}

const store = createStore({ count: 0 })

const Counter1 = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const callback = () => {
      setState(store.getState());
    };
    const unsubscribe = store.subscribe(callback);
    return unsubscribe;
  }, [])

  const increment = () => {
    const nextState = { count: store.getState().count + 1};
    store.setState(nextState);
  }

  return (
    <div>
      {state.count} <button onClick={increment}>Increment</button>
    </div>
  )
}

const Counter2 = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const callback = () => {
      setState(store.getState());
    };
    const unsubscribe = store.subscribe(callback);
    return unsubscribe;
  }, [])

  const increment = () => {
    const nextState = { count: store.getState().count + 1};
    store.setState(nextState);
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