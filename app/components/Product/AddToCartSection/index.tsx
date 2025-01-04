'use client';

import React, { useState } from 'react';

export default function Index() {
    // const [qty, setQty] = useState<number>(1);

    // const setQuantity = (e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>) => {
    //     const target = e.target as HTMLButtonElement | HTMLInputElement;

    //     if (target.tagName === 'BUTTON') {
    //         const action = target.textContent;
    //         if (action === '-') {
    //             setQty((prev) => Math.max(1, prev - 1));
    //         } else if (action === '+') {
    //             setQty((prev) => prev + 1);
    //         }
    //     } else if (target.tagName === 'INPUT') {
    //         const value = target.value;
    //         if (value === '') {
    //             setQty(0); 
    //         } else {
    //             const numberValue = Number(value);
    //             if (!isNaN(numberValue) && numberValue >= 0) {
    //                 setQty(numberValue);
    //             }
    //         }
    //     }
    // };

    return (
        <div>
            {/* <button onClick={setQuantity}>-</button> */}
            {/* <input
                type="number"
                value={qty === 0 ? '' : qty}
                onChange={setQuantity}
                min="1"
                onBlur={() => setQty((prev) => Math.max(1, prev))}
            />
            <button onClick={setQuantity}>+</button> */}
            <button className="w-full text-center bg-secondary-700 text-white my-4 rounded-2xl text-lg p-[5px] font-semibold">Add to cart</button>
        </div>
    );
}
