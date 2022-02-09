import React, { useCallback } from 'react';
import { createStore, useStore } from '../store/store';

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

export const Counter1 = () => {
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

export const Counter2 = () => {
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