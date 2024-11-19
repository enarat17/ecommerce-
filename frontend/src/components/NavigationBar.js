import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown,
  User,
  Package,
  LogOut,
  Heart 
} from 'lucide-react';

const NavigationBar = ({ 
  language = 'en',
  onSearch,
  onLanguageChange,
  isAuthenticated = false,
  cartItemsCount = 0,
  wishlistCount = 0,
  categories = [],
  onSignOut
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isArabic = language === 'ar';

  const content = {
    en: {
      search: "Search products...",
      categories: "Categories",
      home: "Home",
      about: "About Us",
      contact: "Contact",
      account: "My Account",
      orders: "My Orders",
      wishlist: "Wishlist",
      signIn: "Sign In",
      signOut: "Sign Out",
      cart: "Cart",
      language: "عربي"
    },
    ar: {
      search: "ابحث عن المنتجات...",
      categories: "الفئات",
      home: "الرئيسية",
      about: "من نحن",
      contact: "اتصل بنا",
      account: "حسابي",
      orders: "طلباتي",
      wishlist: "المفضلة",
      signIn: "تسجيل الدخول",
      signOut: "تسجيل الخروج",
      cart: "السلة",
      language: "English"
    }
  };

  const text = content[language];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    setIsSearchOpen(false);
  };

  const toggleLanguage = () => {
    onLanguageChange?.(language === 'en' ? 'ar' : 'en');
  };

  return (
    <nav className="bg-gray-900 sticky top-0 z-50">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo and main nav */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-white text-xl font-bold">ElectroTech</h1>
            </div>

            {/* Desktop Navigation Links */}
            <div className={`hidden lg:flex lg:items-center lg:gap-6 lg:ml-6 ${
              isArabic ? 'lg:mr-6 lg:ml-0' : ''
            }`}>
              <a href="/" className="text-gray-300 hover:text-white px-3 py-2">
                {text.home}
              </a>
              
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="text-gray-300 hover:text-white px-3 py-2 flex items-center gap-1">
                  {text.categories}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 w-48 bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible
                               group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {categories.map((category) => (
                    <a
                      key={category._id}
                      href={`/category/${category._id}`}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>

              <a href="/about" className="text-gray-300 hover:text-white px-3 py-2">
                {text.about}
              </a>
              <a href="/contact" className="text-gray-300 hover:text-white px-3 py-2">
                {text.contact}
              </a>
            </div>
          </div>

          {/* Right section - Search, Cart, User */}
          <div className="flex items-center gap-4">
            {/* Search Button & Modal */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-300 hover:text-white p-2"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <a href="/wishlist" className="text-gray-300 hover:text-white p-2 relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Cart */}
            <a href="/cart" className="text-gray-300 hover:text-white p-2 relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </a>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                <User className="h-5 w-5" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                  {isAuthenticated ? (
                    <>
                      <a 
                        href="/account"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <User className="h-4 w-4" />
                        {text.account}
                      </a>
                      <a 
                        href="/orders"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <Package className="h-4 w-4" />
                        {text.orders}
                      </a>
                      <button 
                        onClick={onSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4" />
                        {text.signOut}
                      </button>
                    </>
                  ) : (
                    <a 
                      href="/signin"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <User className="h-4 w-4" />
                      {text.signIn}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-gray-300 hover:text-white px-3 py-2 text-sm"
            >
              {text.language}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
              {text.home}
            </a>
            {categories.map((category) => (
              <a
                key={category._id}
                href={`/category/${category._id}`}
                className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
              >
                {category.name}
              </a>
            ))}
            <a href="/about" className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
              {text.about}
            </a>
            <a href="/contact" className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
              {text.contact}
            </a>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsSearchOpen(false)} />
          <div className="relative min-h-screen flex items-start justify-center p-4">
            <div className="relative w-full max-w-2xl mt-16 bg-gray-800 rounded-lg shadow-xl">
              <form onSubmit={handleSearch} className="p-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={text.search}
                    className={`w-full bg-gray-700 text-white px-4 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isArabic ? 'text-right' : 'text-left'
                    }`}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-300 hover:text-white"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;