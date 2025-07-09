"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";

export default function GeoLocalization() {
  const [show, setShow] = useState(false);

  useEffect(
    function () {
      const el = document?.body;
      if (show) {
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
    [show]
  );

  useEffect(function () {
    const storedValue = localStorage.getItem("currency");
    if (!storedValue || storedValue === "undefined" || storedValue === "null") {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return createPortal(<Window setShow={setShow} show={show} />, document.body);
}

const locationData = [
  { country: "Nigeria", currency: "NGN" },
  { country: "Outside Nigeria", currency: "USD" },
];

function Window({ setShow, show }) {
  const [changeCountry, setChangeCountry] = useState(false);
  const [currency, setCurrency] = useState("NGN");

  function handleChange(e) {
    setCurrency(e.target.value);
  }

  function handleStorage() {
    localStorage.setItem("currency", currency);
  }

  function handleContinue() {
    localStorage.setItem("currency", currency);

    setShow(false);
  }

  useEffect(
    function () {
      handleStorage();
    },
    [currency]
  );

  return (
    <div className="w-dvw h-dvh inset-0 absolute bg-pink-100/50 backdrop-blur-xs z-100 flex justify-center items-center">
      <div className="p-10 rounded-md bg-pink-100 flex flex-col relative w-100 ">
        <div className="absolute top-2 right-2 ">
          <button className="ml-auto" onClick={() => setShow(false)}>
            <IoIosClose className="size-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center gap-4 text-center">
          <span className="text-sm font-light">
            Your Location is set to
            <strong className="font-semibold">
              {" "}
              {
                locationData.find((location) => location.currency == currency)
                  ?.country
              }
            </strong>
          </span>

          {changeCountry && (
            <select
              name="country/Curreny-select"
              id="country/Curreny-select"
              className="w-full p-4 rounded-full text-xs text-pink-950 focus:border-pink-950 border-pink-950"
              onChange={handleChange}
              value={currency}
            >
              {locationData.map((data) => (
                <option key={data.currency} value={data.currency}>
                  {data.country} - {data.currency}
                </option>
              ))}
            </select>
          )}

          <button
            className="bg-pink-950 text-pink-100 text-xs rounded-full w-full p-4"
            onClick={handleContinue}
          >
            Continue
          </button>

          <span
            className="text-xs font-light border-b-1 max-w-max cursor-pointer"
            onClick={() => setChangeCountry((prev) => !prev)}
          >
            {changeCountry ? "cancel" : "change country/region"}
          </span>
        </div>
      </div>
    </div>
  );
}
