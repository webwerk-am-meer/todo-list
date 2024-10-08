import { useState } from "react";

type LocalStorage<T> = {
  value: T;
  setState: (newState: T) => void;
  updateState: (func: (prev: T) => T) => void;
};

function initializeValue<T>({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: T;
}) {
  const storageString = localStorage.getItem(key);

  const init =
    storageString !== null ? JSON.parse(storageString) : defaultValue;

  return init;
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): LocalStorage<T> {
  const [value, setValue] = useState<T>(initializeValue({ key, defaultValue }));

  function setState(newState: T) {
    localStorage.setItem(key, JSON.stringify(newState));
    setValue(newState);
  }

  function updateState(func: (prev: T) => T) {
    setValue((prevState) => {
      const newState = func(prevState);
      localStorage.setItem(key, JSON.stringify(newState));
      return newState;
    });
  }

  return {
    value,
    setState,
    updateState,
  };
}
