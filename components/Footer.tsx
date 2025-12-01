/**
 * @fileoverview Footer Component
 * @description Site footer with branding, copyright, and social media links
 */

import React from 'react';
import { Github, Linkedin, Twitter, Mail, Facebook } from 'lucide-react';
import { personalInfo } from '../data';

/**
 * Footer Component
 * Displays the site footer with branding and social links
 * 
 * @returns The rendered footer section
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/90 border-t border-gray-200 py-12 mt-auto backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
            <div className="text-xl font-bold tracking-tighter text-black flex items-center gap-2">
              <span className="bg-black text-white px-2 py-1 rounded-md text-sm shadow-sm">DEV</span>
              <span>PORTFOLIO</span>
            </div>
            <p className="text-sm text-gray-500">
              © {currentYear} {personalInfo.name}. Built with React & Tailwind.
            </p>
          </div>

          {/* Social Links */}
          <nav aria-label="Social media links" className="flex space-x-6">
            <a 
              href={personalInfo.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-white hover:bg-black transition-all duration-300" 
              aria-label="GitHub profile"
            >
              <Github size={20} />
            </a>
            <a 
              href={personalInfo.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-white hover:bg-blue-600 transition-all duration-300" 
              aria-label="LinkedIn profile"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href={personalInfo.socials.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-white hover:bg-blue-800 transition-all duration-300" 
              aria-label="Facebook profile"
            >
              <Facebook size={20} />
            </a>
            <a 
              href={personalInfo.socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-white hover:bg-sky-500 transition-all duration-300" 
              aria-label="Twitter profile"
            >
              <Twitter size={20} />
            </a>
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-white hover:bg-red-500 transition-all duration-300" 
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