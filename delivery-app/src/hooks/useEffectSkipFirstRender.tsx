import { EffectCallback, useEffect, useRef } from "react";

const useEffectSkipFirstRender = (
  effect: EffectCallback,
  deps?: React.DependencyList | undefined
) => {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) {
      return effect();
    }
    mountedRef.current = true;
  }, [...(deps as Array<any>), mountedRef.current]);
};

export default useEffectSkipFirstRender;
