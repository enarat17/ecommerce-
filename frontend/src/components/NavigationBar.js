import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categoryActions";
import socketIOClient from "socket.io-client";
import { setChatRooms, setSocket, setMessageReceived, removeChatRoom } from "../redux/actions/chatActions";
import { LanguageContext } from "../context/LanguageContext";
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown,
  User,
  Package,
  LogOut,
  Heart,
  Globe,
  Bell
} from 'lucide-react';

const NavigationBar = ({ 
  onSearch,
  onLanguageChange,
  isAuthenticated = false,
  cartItemsCount = 0,
  wishlistCount = 0,
  onSignOut
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const { categories } = useSelector((state) => state.getCategories);
  const { messageReceived } = useSelector((state) => state.adminChat);
  
  const { language,toggleLanguage } = useContext(LanguageContext);
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
      language: "عربي",
      all: "All Categories",
      admin: "Admin Panel",
      myProfile: "My Profile"
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
      language: "English",
      all: "جميع الفئات",
      admin: "لوحة التحكم",
      myProfile: "ملفي الشخصي"
    }
  };

  const text = content[language];

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Admin chat socket connection
  useEffect(() => {
    if (userInfo.isAdmin) {
      var audio = new Audio("/audio/chat-msg.mp3");
      const socket = socketIOClient();
      socket.emit("admin connected with server", "Admin" + Math.floor(Math.random() * 1000000000000));
      
      socket.on("server sends message from client to admin", ({ user, message }) => {
        dispatch(setSocket(socket));
        dispatch(setChatRooms(user, message));
        dispatch(setMessageReceived(true));
        audio.play();
      });
      
      socket.on("disconnected", ({ reason, socketId }) => {
        dispatch(removeChatRoom(socketId));
      });
      
      return () => socket.disconnect();
    }
  }, [dispatch, userInfo.isAdmin]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchCategoryToggle === "All") {
        navigate(`/product-list/search/${searchQuery}`);
      } else {
        navigate(`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}/search/${searchQuery}`);
      }
    } else if (searchCategoryToggle !== "All") {
      navigate(`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`);
    } else {
      navigate("/product-list");
    }
    setIsSearchOpen(false);
  };


  return (
    <nav className="bg-gray-900 sticky top-0 z-50" dir={isArabic ? "rtl" : "ltr"}>
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo and main nav */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="flex-shrink-0">
              <h1 className="text-white text-xl font-bold">ElectroTech</h1>
            </div>

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
                  <a
                    href="/product-list"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => setSearchCategoryToggle("All")}
                  >
                    {text.all}
                  </a>
                  {categories.map((category) => (
                    <a
                      key={category._id}
                      href={`/product-list/category/${category._id}`}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={() => setSearchCategoryToggle(category.name)}
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
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-300 hover:text-white p-2"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Admin Notice */}
            {userInfo.isAdmin && (
              <a href="/admin/orders" className="text-gray-300 hover:text-white p-2 relative">
                <Bell className="h-5 w-5" />
                {messageReceived && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    !
                  </span>
                )}
              </a>
            )}

            <a href="/wishlist" className="text-gray-300 hover:text-white p-2 relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </a>

            <a href="/cart" className="text-gray-300 hover:text-white p-2 relative">
              <ShoppingCart className="h-5 w-5" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {itemsCount}
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

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                  {userInfo.isAdmin ? (
                    <a 
                      href="/admin/orders"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      {text.admin}
                    </a>
                  ) : userInfo.name ? (
                    <>
                      <a 
                        href="/user"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <User className="h-4 w-4" />
                        {text.myProfile}
                      </a>
                      <a 
                        href="/user/my-orders"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <Package className="h-4 w-4" />
                        {text.orders}
                      </a>
                      <button 
                        onClick={() => dispatch(logout())}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4" />
                        {text.signOut}
                      </button>
                    </>
                  ) : (
                    <a 
                      href="/login"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <User className="h-4 w-4" />
                      {text.signIn}
                    </a>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={toggleLanguage}
              className="text-gray-300 hover:text-white p-2"
            >
              <Globe className="h-5 w-5" />
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
                href={`/product-list/category/${category._id}`}
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

      {/* Search Modal with Category Selection */}
{isSearchOpen && (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
      onClick={() => setIsSearchOpen(false)} 
    />
    <div className="relative min-h-screen flex items-start justify-center p-4">
      <div className="relative w-full max-w-2xl mt-16 bg-gray-800 rounded-lg shadow-xl">
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="p-6">
          <div className="space-y-4">
            {/* Category Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {text.categories}
              </label>
              <div className="relative">
                <select
                  value={searchCategoryToggle}
                  onChange={(e) => setSearchCategoryToggle(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="All">{text.all}</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {text.search}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={text.search}
                  className={`w-full bg-gray-700 text-white px-4 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-white"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {text.search}
            </button>
          </div>
        </form>

        {/* Quick Category Links */}
        <div className="px-6 pb-6">
          <div className="text-sm font-medium text-gray-300 mb-3">{text.categories}:</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSearchCategoryToggle("All");
                handleSearch({ preventDefault: () => {} });
              }}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full text-sm"
            >
              {text.all}
            </button>
            {categories.slice(0, 5).map((category) => (
              <button
                key={category._id}
                onClick={() => {
                  setSearchCategoryToggle(category.name);
                  handleSearch({ preventDefault: () => {} });
                }}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full text-sm"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </nav>
  );
};

export default NavigationBar;