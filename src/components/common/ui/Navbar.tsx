/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { logout } from "@/redux/reducers/userSlice";
import { AppDispatch } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookAIcon,
  BookOpenCheck,
  DollarSignIcon,
  FileText,
  Handshake,
  LogOut,
  LogOutIcon,
  Menu,
  Package,
  PanelsTopLeft,
  User2,
  UserCog,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RouteWrapper from "../ui/RouteWrapper";

// Define types for navigation items
interface SubNavItem {
  name: string;
  icon: any; // Consider using a more specific type if possible
  href: string;
}

interface NavItem {
  name: string;
  icon: any; // Consider using a more specific type if possible
  href?: string;
  items?: SubNavItem[];
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => dispatch(logout());

  const navItems: NavItem[] = [
    { name: "دفتر الاسبوعية", icon: BookOpenCheck, href: "/" },
    {
      name: "المصادر",
      icon: Package,
      items: [
        { name: "مشاريع التخرج", icon: DollarSignIcon, href: "/fyp" },
        { name: "مشاريع النظامية", icon: FileText, href: "/projects" },
        { name: "كورسات", icon: BookAIcon, href: "/courses" },
        { name: "العقود", icon: Handshake, href: "/contracts" },
      ],
    },
    {
      name: "شخصي",
      icon: PanelsTopLeft,
      items: [
        { name: "الصفحة الادارية", icon: UserCog, href: "/admin" },
        { name: "الصفحة الشخصية", icon: User2, href: "/personal" },
      ],
    },
    { name: "فواتير", icon: FileText, href: "/invoices" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const renderNavItem = (item: NavItem) => {
    if (item.items) {
      return (
        <div
          className="relative group"
          onMouseEnter={() => setActiveMenu(item.name)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 gap-2 group cursor-pointer">
            <item.icon className="h-4 w-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-orange-400" />
            <span className="group-hover:text-orange-400 transition-colors duration-300">
              {item.name}
            </span>
          </div>

          <AnimatePresence>
            {activeMenu === item.name && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 w-[300px] bg-gray-900/95 rounded-xl border border-gray-800 shadow-xl backdrop-blur-lg"
                style={{ zIndex: 1000 }}
              >
                <div className="p-4 space-y-2">
                  {item.items.map((subItem) => (
                    <RouteWrapper key={subItem.name} href={subItem.href}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-orange-400 transition-all duration-300 gap-3"
                      >
                        <subItem.icon className="h-5 w-5 text-orange-400" />
                        <span className="font-medium">{subItem.name}</span>
                      </motion.div>
                    </RouteWrapper>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
        </div>
      );
    }

    return (
      <RouteWrapper href={item.href!}>
        <div className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 gap-2 group">
          <item.icon className="h-4 w-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-orange-400" />
          <span className="group-hover:text-orange-400 transition-colors duration-300">
            {item.name}
          </span>
        </div>
      </RouteWrapper>
    );
  };

  return (
    <nav className="w-full top-0 z-50 relative" dir="rtl">
      <div className="bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                AnyCode
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between flex-1 mr-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex space-x-8"
              >
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    {renderNavItem(item)}
                  </motion.div>
                ))}
              </motion.div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-2 py-2 rounded-lg bg-orange-500/90 hover:bg-orange-500 text-white transition-all duration-300 shadow-lg shadow-orange-500/20"
              >
                <LogOut className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden block absolute top-16 left-0 right-0 bg-gray-900/90 border-b border-gray-800"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) =>
                  item.items ? (
                    <div key={item.name} className="space-y-1">
                      <div className="px-3 py-2 text-gray-400 font-medium">
                        {item.name}
                      </div>
                      {item.items.map((subItem) => (
                        <RouteWrapper key={subItem.name} href={subItem.href}>
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="flex items-center px-6 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-orange-400 transition-all duration-300 gap-2"
                          >
                            <subItem.icon className="h-4 w-4 text-orange-400" />
                            <span>{subItem.name}</span>
                          </motion.div>
                        </RouteWrapper>
                      ))}
                    </div>
                  ) : (
                    <RouteWrapper key={item.name} href={item.href!}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-orange-400 transition-all duration-300 gap-2"
                      >
                        <item.icon className="h-4 w-4 text-orange-400" />
                        <span>{item.name}</span>
                      </motion.div>
                    </RouteWrapper>
                  )
                )}

                <motion.div
                  whileHover={{ x: 4 }}
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-orange-400 transition-all duration-300 gap-2 cursor-pointer"
                >
                  <LogOutIcon className="h-4 w-4 text-orange-400" />
                  <span>تسجيل خروج</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
