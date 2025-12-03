/**
 * @fileoverview Footer Component
 * @description Site footer with branding, copyright, and social media links
 */

import React from 'react';
import { Github, Linkedin, Twitter, Mail, Facebook } from 'lucide-react';
import { personalInfo } from '../data';

/**
 * Social Link Component
 * Renders a social media link or disabled button based on href availability
 */
interface SocialLinkProps {
  href: string;
  label: string;
  hoverClass: string;
  children: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label, hoverClass, children }) => {
  const baseClasses =
    'p-2 bg-theme-tertiary rounded-full text-theme-secondary transition-all duration-300';

  // If no href, render as disabled span
  if (!href) {
    return (
      <span
        className={`${baseClasses} opacity-40 cursor-not-allowed`}
        aria-label={`${label} (not available)`}
        title="Coming soon"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${hoverClass}`}
      aria-label={label}
    >
      {children}
    </a>
  );
};

/**
 * Footer Component
 * Displays the site footer with branding and social links
 *
 * @returns The rendered footer section
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-theme-secondary border-t border-theme-primary py-12 mt-auto backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand & Copyright */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
            <div className="text-xl font-bold tracking-tighter text-theme-primary flex items-center gap-2">
              <span className="btn-theme-primary px-2 py-1 rounded-md text-sm shadow-sm">DEV</span>
              <span>PORTFOLIO</span>
            </div>
            <p className="text-sm text-theme-secondary">
              © {currentYear} {personalInfo.name}. Built with React & Tailwind.
            </p>
          </div>

          {/* Social Links */}
          <nav aria-label="Social media links" className="flex space-x-6">
            <SocialLink
              href={personalInfo.socials.github}
              label="GitHub profile"
              hoverClass="hover:text-white hover:bg-black"
            >
              <Github size={20} />
            </SocialLink>
            <SocialLink
              href={personalInfo.socials.linkedin}
              label="LinkedIn profile"
              hoverClass="hover:text-white hover:bg-blue-600"
            >
              <Linkedin size={20} />
            </SocialLink>
            <SocialLink
              href={personalInfo.socials.facebook}
              label="Facebook profile"
              hoverClass="hover:text-white hover:bg-blue-800"
            >
              <Facebook size={20} />
            </SocialLink>
            <SocialLink
              href={personalInfo.socials.twitter}
              label="Twitter profile"
              hoverClass="hover:text-white hover:bg-sky-500"
            >
              <Twitter size={20} />
            </SocialLink>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 bg-theme-tertiary rounded-full text-theme-secondary hover:text-white hover:bg-red-500 transition-all duration-300"
              aria-label="Send email"
            >
              <Mail size={20} />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
