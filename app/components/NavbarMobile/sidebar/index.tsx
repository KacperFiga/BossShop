"use client";

import Link from "next/link";
import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { CategoryI } from "@/app/types";

interface MenuSidebarPropsI {
  isOpen: boolean;
  toggleIsOpen: () => void;
  categories: CategoryI[];
}

export const MenuSidebar: React.FC<MenuSidebarPropsI> = ({
  isOpen,
  toggleIsOpen,
  categories,
}) => {
  return (
    <div
      onClick={(e) => toggleIsOpen()}
      className={`${
        isOpen ? "absolute" : "hidden"
      } top-0 left-0 w-full h-full bg-black bg-opacity-20 z-10`}
    >
      <div
        className="w-[80vw] h-full bg-white p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="ml-auto block" onClick={toggleIsOpen}>
          <Icon icon="material-symbols:close-rounded" width="24" height="24" />
        </button>
        <nav>
          {categories.map((category) => (
            <Link
              onClick={toggleIsOpen}
              className="flex py-2 border-b-2 border-gray-200"
              key={category.id}
              href={`/category/${category.id}`}
            >
              {category.category_name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
