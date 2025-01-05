'use client';

import React, { useState } from 'react';

export default function Index() {
    const [qty, setQty] = useState<number>(1);

    const setQuantity = (e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>) => {
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
            if (value === '') {
                setQty(1); 
            } else {
                const numberValue = Number(value);
                if (!isNaN(numberValue) && numberValue >= 1) {
                    setQty(numberValue); 
                }
            }
        }
    };

    return (
        <div className='flex flex-col md:flex-row items-center justify-center'>
            <div className="flex border-black md:mr-[20px] border-[2px] rounded-xl h-full w-full md:w-auto mb-3 mt-6 md:my-0">
                <button 
                    className={`relative text-lg font-semibold w-[30px] h-[30px] flex justify-center rounded-xl items-center bg-transparent text-black rounded-l-xl z-20 transition ${qty === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:text-secondary-600'}`} 
                    data-action="remove" 
                    onClick={setQuantity}
                    disabled={qty === 1}>
                        -

                    {/* <span 
                        className={`h-[85%] w-[85%] absolute transition-all duration-200 flex justify-center items-center z-10 rounded-[100%] ${qty === 1 ? '' : 'hover:bg-gray-300'}`}
                    >
                    </span> */}
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
                    onClick={setQuantity}>
                        +

                    {/* <span 
                        className={`h-[85%] w-[85%] absolute transition-all duration-200 flex hover:bg-gray-300 justify-center items-center z-10 rounded-[100%]`}
                    >
                    </span> */}
                </button>
            </div>
            <button className="w-full text-center bg-secondary-700 text-white md:my-4 rounded-2xl text-lg p-[5px] font-semibold hover:bg-secondary-800 transition">
                Add to cart
            </button>
        </div>
    );
}
