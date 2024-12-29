'use server'

import React from 'react'
import prisma from '@/lib/db'
import Link from 'next/link';

export default async function index() {
  const categories = await prisma.categories.findMany();
  return (
    <nav className="container mx-auto hidden md:block">

    {categories.map(category=>(<Link key={category.id} href={`/category/${category.id}`}>{category.category_name}</Link>))}

    </nav>
  )
}
