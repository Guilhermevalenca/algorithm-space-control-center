import { useReducer } from "react";

export function useForceUpdate() {
  const [, dispatch] = useReducer((x: number) => x + 1, 0);
  return dispatch as () => void;
}
