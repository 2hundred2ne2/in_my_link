import { createContext, useContext } from "react";

/**
 * 안전한 컨텍스트와 훅을 생성합니다
 * - Provider 없이 사용할 경우 에러가 발생합니다
 *
 * @param init - 컨텍스트 초기값
 * @returns [useSafeContext, Provider]
 * @example
 * const [useSome, SomeContextProvider] = createSafeContext<SomeContextType>();
 */
export function createSafeContext<T>(init?: T) {
  const context = createContext(init);

  const useSafeContext = () => {
    const ctx = useContext(context);

    if (!ctx) {
      throw new Error("useSafeContext must be used within a Provider");
    }

    return ctx;
  };

  return [useSafeContext, context.Provider] as const;
}
