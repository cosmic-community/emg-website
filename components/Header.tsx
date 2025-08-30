'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors"
            onClick={closeMenu}
          >
            Emory Market Gardens
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-lg relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-lg relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-lg relative group"
            >
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-lg relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contact" 
              className="btn btn-primary ml-4"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary transition-colors font-medium text-lg px-4 py-2 rounded-lg hover:bg-secondary-light"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-primary transition-colors font-medium text-lg px-4 py-2 rounded-lg hover:bg-secondary-light"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-primary transition-colors font-medium text-lg px-4 py-2 rounded-lg hover:bg-secondary-light"
                onClick={closeMenu}
              >
                Shop
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-primary transition-colors font-medium text-lg px-4 py-2 rounded-lg hover:bg-secondary-light"
                onClick={closeMenu}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="btn btn-primary w-fit mx-4 mt-2"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}