import { useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [val, setVal] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [val]);

  return [val, setVal];
};

export default useLocalStorage;
