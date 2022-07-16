import { useRef } from "react";

const useLocalStorage = () => {
  const get = useRef(<T extends any>(key: string): T | undefined => {
    const value = localStorage.getItem(key);
    if (value === null) return undefined;

    return JSON.parse(value);
  });

  const set = useRef((key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  const remove = useRef((key: string) => {
    localStorage.removeItem(key);
  });

  return {
    get: get.current,
    set: set.current,
    remove: remove.current,
  };
};

export default useLocalStorage;
