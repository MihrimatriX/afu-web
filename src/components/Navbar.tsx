'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const menuItems = [
  'About',
  'Services',
  'Experience',
  'Work',
  'Testimonials',
  'Blog',
  'Contact'
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed w-full z-50 bg-black/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="relative w-32 h-8">
            <Image
              src="/elementor-logo.png"
              alt="Elementor"
              fill
              className="object-contain"
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  className="inline-block"
                >
                  {item}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              className="w-6 h-5 flex flex-col justify-between"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 9 }
                }}
                className="w-full h-0.5 bg-white block"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="w-full h-0.5 bg-white block"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -9 }
                }}
                className="w-full h-0.5 bg-white block"
              />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden"
          >
            <div className="container mx-auto px-6 py-24">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex flex-col gap-6"
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item}
                    variants={{
                      hidden: { x: 50, opacity: 0 },
                      visible: { x: 0, opacity: 1 }
                    }}
                  >
                    <Link
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-bold text-white/80 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Sosyal Medya Linkleri */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 mt-12"
              >
                {['facebook', 'twitter', 'youtube', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Image 
                      src={`/${social}.svg`}
                      alt={social}
                      width={24}
                      height={24}
                    />
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 