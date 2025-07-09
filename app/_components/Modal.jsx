"use client";

import { createPortal } from "react-dom";
import { useOutsideClick } from "../_hooks/useOutsideClick";

const {
  createContext,
  useState,
  useContext,
  cloneElement,
  useEffect,
} = require("react");

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  useEffect(
    function () {
      const el = document?.body;
      if (openName !== "") {
        el.classList.add("overflow-hidden");

        el.setAttribute("data-lenis-prevent", "true");
      } else {
        el.classList.remove("overflow-hidden");
        el.removeAttribute("data-lenis-prevent");
      }
      return () => {
        el.classList.remove("overflow-hidden");
        el.removeAttribute("data-lenis-prevent");
      };
    },
    [openName]
  );

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 bg-pink-100/50 backdrop:backdrop-blur-md transition-all z-1000 ">
      <div
        className="w-dvw md:w-[50dvw] h-dvh bg-pink-50 absolute md:right-0 p-8"
        ref={ref}
      >
        <div className="w-full uppercase text-xs flex justify-between">
          <span>{name}</span>
          <button
            className="cursor-pointer uppercase flex flex-col"
            onClick={() => close()}
          >
            <span className="pb-0 leading-3">Close</span>
            <span className="h-px w-full bg-black"></span>
          </button>
        </div>

        {/* {children} */}
        {cloneElement(children, { close })}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
