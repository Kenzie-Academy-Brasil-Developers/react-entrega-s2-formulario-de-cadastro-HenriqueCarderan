import { useEffect, useRef } from "react";

export const useOutsiedeClick = (callbackFunction) => {
  const ref = useRef();

  useEffect(() => {
    function handleOutclick(event) {
      const target = event.target;
      if (!ref.current.contains(target)) {
        callbackFunction();
      }
    }
    document.addEventListener("mousedown", handleOutclick);
    return () => {
      document.removeEventListener("mousedown", handleOutclick);
    };
  }, []);

  return ref;
};
