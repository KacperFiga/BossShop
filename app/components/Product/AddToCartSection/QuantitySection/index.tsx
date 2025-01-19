'use client';

import React from 'react'


interface QuantitySectionPropsI {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
}

export const QuantitySection:React.FC<QuantitySectionPropsI> = ({qty, setQty}) => {

  const setQuantity = (
    e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLButtonElement | HTMLInputElement;

    if (target.tagName === 'BUTTON') {
      const action = target.getAttribute('data-action');
      if (action === 'remove') {
        setQty((prev) => Math.max(1, prev - 1));
      } else if (action === 'add') {
        setQty((prev) => prev + 1);
      }
    } else if (target.tagName === 'INPUT') {
      const value = target.value;
      const numberValue = Number(value);
      if (!isNaN(numberValue) && numberValue >= 1) {
        setQty(numberValue);
      }
    }
  };

  return (
    <div className="flex border-black md:mr-[20px] border-[2px] rounded-xl h-full w-full md:w-auto mb-3 mt-6 md:my-0">
    <button
      className={`relative text-lg font-semibold w-[30px] h-[30px] flex justify-center rounded-xl items-center bg-transparent text-black rounded-l-xl z-20 transition ${
        qty === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:text-secondary-600'
      }`}
      data-action="remove"
      onClick={setQuantity}
      disabled={qty === 1}
    >
      -
    </button>
    <input
      className="md:w-[30px] w-full text-lg font-semibold text-center border-0 focus:ring-0 outline-none"
      type="number"
      value={qty}
      onChange={setQuantity}
      min="1"
      onBlur={() => setQty((prev) => Math.max(1, prev))}
    />
    <button
      className="text-lg font-semibold w-[30px] h-[30px] flex justify-center items-center bg-transparent text-black rounded-r-xl transition relative hover:text-secondary-600 duration-200"
      data-action="add"
      onClick={setQuantity}
    >
      +
    </button>
  </div>
  )
}
