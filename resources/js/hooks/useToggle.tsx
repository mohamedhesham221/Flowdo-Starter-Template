import React from "react";
import { atom, useAtom, useSetAtom } from "jotai";
// Atom to store open/close state (default: true)
const isOpenAtom = atom(true);
// Atom to toggle isOpenAtom
const toggleAtom = atom(null, (get, set) => set(isOpenAtom, !get(isOpenAtom)));

// Custom hook to access state and toggle function
const useToggle = () => {
    const [isOpen] = useAtom(isOpenAtom);
    const toggle = useSetAtom(toggleAtom);

    return { isOpen, toggle };
};

export default useToggle;
