import { memo } from "react";

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 py-4 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <span>© {currentYear} Crypto Dashboard</span>
          <span>•</span>
          <span>All rights reserved</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="Privacy Policy"
          >
            Privacy
          </a>
          <span>•</span>
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="Terms of Service"
          >
            Terms
          </a>
          <span>•</span>
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="Support"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
