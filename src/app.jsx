import React, { useEffect, useState } from 'react';

const createStore = (initialState) => {
  let state = initialState;
  const getState = () => state;
  const setState = (nextStae) => {
    state = nextStae;
  }

  return { getState, setState }
}

let moduleState = { count: 0 };
const setStates = new Set();

const Counter1 = () => {
  const [state, setState] = useState(moduleState);

  useEffect(() => {
    setStates.add(setState);
    return () => {
      setStates.delete(setState);
    }
  }, [])

  const increment = () => {
    moduleState = { count: moduleState.count + 1};
    setStates.forEach((fn) => {
      fn(moduleState);
    });
    setState(moduleState);
  }

  return (
    <div>
      {state.count} <button onClick={increment}>Increment</button>
    </div>
  )
}

const Counter2 = () => {
  const [state, setState] = useState(moduleState);

  useEffect(() => {
    setStates.add(setState);
    return () => {
      setStates.delete(setState);
    }
  }, [])

  const increment = () => {
    moduleState = { count: moduleState.count + 1};
    setStates.forEach((fn) => {
      fn(moduleState);
    });
    setState(moduleState);
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