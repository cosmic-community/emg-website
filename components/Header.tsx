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
    <header className="bg-primary/95 backdrop-blur-sm shadow-sm border-b border-primary-light sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-2xl font-bold text-white">
              EMORY
            </span>
            <span className="text-sm text-gray-300 hidden sm:block">
              MARKET GARDENS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-200 hover:text-white transition-colors font-medium text-lg relative group"
            >
              HOME
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-gray-200 hover:text-white transition-colors font-medium text-lg relative group"
            >
              ABOUT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/products" 
              className="text-gray-200 hover:text-white transition-colors font-medium text-lg relative group"
            >
              SHOP
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-200 hover:text-white transition-colors font-medium text-lg relative group"
            >
              BLOG
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-200 hover:text-white transition-colors font-medium text-lg relative group"
            >
              MORE...
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
            
            {/* Search Icon */}
            <button className="text-gray-200 hover:text-white transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            
            {/* Cart Icon */}
            <button className="flex items-center text-gray-200 hover:text-white transition-colors border border-primary-light rounded-lg px-3 py-1">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h6a1 1 0 001-1v-6m-6 0V9a2 2 0 114 0v4.01" />
              </svg>
              <span className="text-sm">0 Items</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary-light transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-white"
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
          <div className="md:hidden py-4 border-t border-primary-light bg-primary/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-200 hover:text-white transition-colors font-medium text-lg px-4 py-2 rounded-lg hover:bg-primary-light"
                onClick={closeMenu}
              >
                HOME
              </Link>
              <Link 
                href="/about" 
                className="text-gray-200 hover:text-white transition-colors font-medium text-lg px-4 py-2 rounded-lg hover:bg-primary-light"
                onClick={closeMenu}
              >
                ABOUT
              </Link>
              <Link 
                href="/products" 
                className="text-gray-200 hover:text-white transition-colors font-medium text-lg px-4 py-2 rounded-lg hover:bg-primary-light"
                onClick={closeMenu}
              >
                SHOP
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-200 hover:text-white transition-colors font-medium text-lg px-4 py-2 rounded-lg hover:bg-primary-light"
                onClick={closeMenu}
              >
                BLOG
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-200 hover:text-white transition-colors font-medium text-lg px-4 py-2 rounded-lg hover:bg-primary-light"
                onClick={closeMenu}
              >
                MORE...
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}