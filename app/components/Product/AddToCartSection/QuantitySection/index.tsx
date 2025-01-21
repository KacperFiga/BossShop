"use client";

import React from "react";

interface QuantitySectionPropsI {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  variant: "DEFAULT" | "SIDEBAR";
}

export const QuantitySection: React.FC<QuantitySectionPropsI> = ({
  qty,
  setQty,
  variant = "DEFAULT",
}) => {
  const setQuantity = (
    e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLButtonElement | HTMLInputElement;

    if (target.tagName === "BUTTON") {
      const action = target.getAttribute("data-action");
      if (action === "remove") {
        setQty((prev) => Math.max(1, prev - 1));
      } else if (action === "add") {
        setQty((prev) => prev + 1);
      }
    } else if (target.tagName === "INPUT") {
      const value = target.value;
      const numberValue = Number(value);
      if (!isNaN(numberValue) && numberValue >= 1) {
        setQty(numberValue);
      }
    }
  };

  return (
    <div
      className={`flex border-black border-[2px] rounded-xl h-full   ${
        variant === "SIDEBAR"
          ? "w-[60px] m-0"
          : "md:mr-[20px] w-full md:w-auto mb-3 mt-6 md:my-0 "
      } `}
    >
      <button
        className={`relative  w-[30px] h-[30px] flex justify-center rounded-xl items-center bg-transparent text-black rounded-l-xl z-20 transition ${
          qty === 1
            ? "text-gray-400 cursor-not-allowed"
            : "hover:text-secondary-600"
        } ${
          variant === "SIDEBAR" ? "text-md pl-[4px]" : "text-lg font-semibold"
        } `}
        data-action="remove"
        onClick={setQuantity}
        disabled={qty === 1}
      >
        -
      </button>
      <input
        className={`md:w-[30px] w-full text-center border-0 focus:ring-0 outline-none ${
          variant === "SIDEBAR" ? "text-md" : "text-lg font-semibold"
        }`}
        type="number"
        value={qty}
        onChange={setQuantity}
        min="1"
        onBlur={() => setQty((prev) => Math.max(1, prev))}
      />
      <button
        className={`w-[30px] h-[30px] flex justify-center items-center bg-transparent text-black rounded-r-xl transition relative hover:text-secondary-600 duration-200 ${
          variant === "SIDEBAR" ? "text-md pr-[4px]" : "text-lg font-semibold"
        }`}
        data-action="add"
        onClick={setQuantity}
      >
        +
      </button>
    </div>
  );
};
