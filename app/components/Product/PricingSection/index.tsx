import React from "react";

interface PricingSectionPropsI {
  promoPrice: number;
  regularPrice: number;
  currency: string;
}

export const PricingSection: React.FC<PricingSectionPropsI> = ({
  promoPrice,
  regularPrice,
  currency,
}) => {
  return (
    <div>
      <p
        className={`${
          promoPrice > 0
            ? "text-md line-through"
            : "text-lg font-semibold mt-auto"
        }`}
      >
        {regularPrice} {currency}
      </p>

      {promoPrice > 0 ? (
        <p className="text-xl font-semibold">
          {promoPrice} {currency}
        </p>
      ) : null}
    </div>
  );
};
