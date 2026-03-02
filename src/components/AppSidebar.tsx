"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { getAllCategories } from "@/app/actions/postActions";

interface AppSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AppSidebar({ isOpen, setIsOpen }: AppSidebarProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const decorativeTexts = [
    "Every Category ",
    "Hides a",
    "Different",
    "MONSTER",
  ];

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 left-6 z-50 flex items-center gap-3 hover-accent ${isOpen ? 'text-black' : 'text-foreground'}`}
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="text-display text-sm tracking-widest hidden sm:inline">This is not a menu</span>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ clipPath: "circle(0px at 48px 48px)" }}
            animate={{ clipPath: "circle(200% at 48px 48px)" }}
            exit={{ clipPath: "circle(0px at 48px 48px)" }}
            transition={{ type: "tween", duration: 1.0, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white text-black flex flex-col pt-24 lg:pt-32 px-6 sm:px-12 lg:px-24 overflow-y-auto overflow-x-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 max-w-7xl mx-auto w-full flex-1 lg:items-center mt-6 lg:mt-0 pb-12 lg:pb-0">

              {/* Left Side: Giant Bold Static Text */}
              <div className="flex flex-col gap-2 lg:gap-4 flex-1">
                {decorativeTexts.map((text, i) => (
                  <motion.div key={text} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                    <p className={`inline-block py-1 sm:py-2 text-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-none tracking-tight font-bold text-black`}>
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Right Side: Smaller Links Grid (Menu + Categories) */}
              <div className="flex flex-col flex-1 lg:pl-16 mt-8 lg:mt-0 lg:max-w-md">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col gap-y-6 sm:gap-y-8">
                  {menuItems.map((item, i) => (
                    <motion.div key={item.path} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
                      <Link href={item.path} onClick={() => setIsOpen(false)} className={`block text-lg xl:text-xl font-medium text-black hover:text-accent transition-colors ${pathname === item.path ? "text-accent" : ""}`}>
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Categories Dropdown */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + menuItems.length * 0.05 }}>
                    <button
                      onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                      className="flex items-center justify-between w-full text-lg xl:text-xl font-medium text-black hover:text-accent transition-colors"
                    >
                      <span>Categories</span>
                      <motion.div animate={{ rotate: isCategoriesOpen ? 180 : 0 }}>
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isCategoriesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="overflow-hidden flex flex-col gap-4 pl-4 border-l-2 border-slate-200"
                        >
                          {categories.map((cat) => (
                            <Link key={cat.id} href={`/?category=${cat.slug}`} onClick={() => setIsOpen(false)} className="block text-md font-medium text-black/80 hover:text-accent transition-colors">
                              {cat.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Footer in sidebar */}
            <div className="mt-8 pb-12 max-w-7xl mx-auto w-full">
              <div className="accent-line mb-6" />
              <p className="text-sm text-muted-foreground tracking-wider">© 2026 AUTOBHARAT</p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
