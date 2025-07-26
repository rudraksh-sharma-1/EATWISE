import React, { useCallback, useState } from "react";
import { FaArrowUp, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const navigationItems = [
    { name: "About", href: "/" },
    { name: "Services", href: "/dietchart" },
    { name: "Contact", href: "/" },
    { name: "Blog", href: "/bloghome" }
  ];

  const socialLinks = [
    { Icon: FaFacebook, href: "#", label: "Facebook" },
    { Icon: FaTwitter, href: "#", label: "Twitter" },
    { Icon: FaInstagram, href: "#", label: "Instagram" },
    { Icon: FaLinkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-[#328E6E] w-full py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <nav className="col-span-full lg:col-span-2">
            <ul className="flex flex-col md:flex-row items-center justify-center gap-6">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-white hover:text-gray-200 transition-colors duration-300 text-lg font-medium"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-full lg:col-span-2">
            <div className="flex justify-center space-x-6">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm text-center md:text-left">
              © {new Date().getFullYear()} Eat Wise. All rights reserved.
            </p>
          </div>
        </div>

        {isVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#328E6E]"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="h-6 w-6 text-[#328E6E]" />
          </button>
        )}
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
