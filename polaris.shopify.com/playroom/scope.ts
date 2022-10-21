import {
  Children,
  Fragment,
  Suspense,
  cloneElement,
  createContext,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

// This object is inserted into the global scope of the Playroom editor.
// We expose the React methods here as they're often used in examples assuming
// they were imported / destructured off of 'react' module.
// NOTE: Playroom will also expose a global "React" variable, so anything
// missing here can be obtained that way too.
export default function useScope() {
  return {
    Children,
    Fragment,
    Suspense,
    cloneElement,
    createContext,
    createRef,
    forwardRef,
    isValidElement,
    lazy,
    memo,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
  };
}
