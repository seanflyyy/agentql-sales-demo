"use client";

import {useState} from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface HeaderProps {
  title: string;
}

export default function Header({title}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <nav className="hidden md:flex space-x-4">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
          Dashboard
        </Link>
        <Link href="/about" className="text-gray-600 hover:text-gray-900">
          About
        </Link>
      </nav>
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden">
          <Link
            href="/"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
