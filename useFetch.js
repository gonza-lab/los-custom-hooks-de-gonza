import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    setState((props) => {
      return {
        ...props,
        isLoading: true,
      };
    });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted.current) {
          setState({
            data,
            isLoading: false,
            error: null,
          });
        }
      })
      .catch((err) => {
        setState({
          data: null,
          isLoading: false,
          error: 'No se pudo cargar la info',
        });
      });
  }, [url]);

  return state;
};
