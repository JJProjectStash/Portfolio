/**
 * @fileoverview Home Page Component (Hero Section)
 * @description The landing section of the portfolio featuring an animated hero
 * with introduction, call-to-action buttons, and decorative elements
 */

import React, { useCallback } from 'react';
import { ArrowRight, Code, Github, Linkedin, Terminal, MousePointer2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { personalInfo } from '../data';

interface HomeProps {
  /** Section ID for navigation */
  id: string;
}

/**
 * Home Component (Hero Section)
 * The main landing area of the portfolio with animated introduction
 * 
 * @param props - Component props
 * @param props.id - Section ID for navigation scrolling
 * @returns The rendered hero section
 */
const Home: React.FC<HomeProps> = ({ id }) => {
  /**
   * Scrolls to the projects section
   */
  const scrollToProjects = useCallback((): void => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  /**
   * Scrolls to the contact section
   */
  const scrollToContact = useCallback((): void => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Animation variants for staggered text reveal
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.15, 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <section 
      id={id} 
      className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden"
      aria-label="Hero section"
    >
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            x: [0, 30, 0]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gray-200/40 rounded-full blur-3xl opacity-50" 
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1],
            x: [0, -30, 0]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 -left-20 w-72 h-72 bg-gray-200/40 rounded-full blur-3xl opacity-50" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 space-y-10 text-center md:text-left pt-10 md:pt-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Availability Badge */}
              <motion.div 
                custom={0}
                variants={textVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-gray-200 text-sm font-bold text-gray-800 shadow-sm hover:border-gray-300 transition-colors"
              >
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="tracking-wide text-xs uppercase font-bold">Available for Work</span>
              </motion.div>
              
              {/* Main Heading */}
              <div className="relative pb-2">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-black leading-[1.05]">
                  <motion.span custom={1} variants={textVariants} className="block text-gray-900">Designing the</motion.span>
                  <motion.span 
                    custom={2} 
                    variants={textVariants} 
                    className="block text-transparent bg-clip-text bg-gradient-to-br from-gray-500 via-gray-800 to-black pb-4 -mb-4"
                  >
                    Digital Future.
                  </motion.span>
                </h1>
              </div>
              
              {/* Introduction Paragraph */}
              <motion.p 
                custom={3} 
                variants={textVariants}
                className="text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed mx-auto md:mx-0 font-light"
              >
                Hi, I'm <span className="text-black font-semibold">{personalInfo.name}</span>. A {personalInfo.role} based in {personalInfo.location}, crafting robust & scalable web solutions.
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl"
              >
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/60 backdrop-blur-md border border-gray-200 text-black font-bold rounded-2xl hover:bg-white hover:border-gray-300 transition-all shadow-sm hover:shadow-md"
              >
                Contact Me
              </motion.button>
            </motion.div>

            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.7 }}
               className="flex items-center justify-center md:justify-start gap-6 text-gray-400 pt-2"
            >
               <motion.a whileHover={{ y: -3, color: "#000" }} href={personalInfo.socials.github} target="_blank" className="transition-colors transform"><Github size={24} strokeWidth={1.5} /></motion.a>
               <motion.a whileHover={{ y: -3, color: "#0077b5" }} href={personalInfo.socials.linkedin} target="_blank" className="transition-colors transform"><Linkedin size={24} strokeWidth={1.5} /></motion.a>
               <div className="h-px w-12 bg-gray-300 hidden md:block"></div>
               <span className="text-xs font-bold tracking-widest uppercase text-gray-400">MERN Stack Enthusiast</span>
            </motion.div>
          </div>

          {/* Abstract Hero Image / SVG */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full max-w-lg relative hidden md:block"
          >
             <div className="relative aspect-square">
                {/* Center Card */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 shadow-2xl flex items-center justify-center overflow-hidden z-10"
                >
                   <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>
                   <div className="relative z-10 p-10 bg-gray-50/80 rounded-3xl border border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                      <Code size={80} strokeWidth={1} className="text-gray-400" />
                   </div>
                </motion.div>
                
                {/* Floating Card 1 (Bottom Right) - Backend */}
                <motion.div 
                  initial={{ x: 40, y: 40, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    x: { duration: 0.8, delay: 0.4 },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } 
                  }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="absolute bottom-12 right-0 w-64 p-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-200/50 z-20 cursor-default"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
                      <Terminal size={24} />
                    </div>
                    <div>
                       <div className="text-base font-bold text-gray-900">Backend API</div>
                       <div className="text-xs text-gray-500 font-medium">Node.js • Express • MongoDB</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: "92%" }}
                       transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
                       className="bg-black h-full rounded-full"
                     />
                  </div>
                </motion.div>

                {/* Floating Card 2 (Top Left) - Frontend */}
                 <motion.div 
                  initial={{ x: -40, y: -40, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ 
                    x: { duration: 0.8, delay: 0.6 },
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut" } 
                  }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="absolute top-12 left-0 p-5 bg-black text-white rounded-2xl shadow-2xl flex items-center gap-4 pr-8 z-20 cursor-default"
                >
                   <div className="relative">
                     <div className="w-3 h-3 bg-green-400 rounded-full absolute -top-1 -right-1 border-2 border-black animate-pulse"></div>
                     <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                        <span className="font-bold text-xs tracking-wider">REACT</span>
                     </div>
                   </div>
                  <div>
                    <span className="block text-base font-bold">Frontend</span>
                    <span className="block text-xs text-gray-400 font-medium">Next.js & Tailwind</span>
                  </div>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">Scroll</span>
        <MousePointer2 size={16} />
      </motion.div>

    </section>
  );
};

export default Home;