/**
 * @fileoverview About Page Component
 * @description Displays personal information, bio, experience, and timeline
 * Features a 3D tilt effect on the profile image and animated timeline
 */

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Download, CheckCircle, FileText } from 'lucide-react';
import { personalInfo, timeline } from '../data';

/** CV file path in public folder */
const CV_FILE_PATH = '/Trimmed CV.pdf';
const CV_FILE_NAME = 'Juztyne_Clever_Dalupang_CV.pdf';

interface AboutProps {
  /** Section ID for navigation */
  id: string;
}

/**
 * About Component
 * Displays personal bio, experience badge, and career timeline
 *
 * @param props - Component props
 * @param props.id - Section ID for navigation scrolling
 * @returns The rendered about section
 */
const About: React.FC<AboutProps> = ({ id }) => {
  // State for download toast notification
  const [showDownloadToast, setShowDownloadToast] = useState(false);

  // Auto-hide toast after 3 seconds
  React.useEffect(() => {
    if (showDownloadToast) {
      const timer = setTimeout(() => setShowDownloadToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showDownloadToast]);

  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics for smooth tilt animation
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-5deg', '5deg']);

  /**
   * Handles mouse movement for 3D tilt effect
   * @param e - Mouse event
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  /**
   * Resets tilt effect when mouse leaves
   */
  const handleMouseLeave = (): void => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id={id} className="py-32 relative overflow-hidden" aria-label="About section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Intro Section */}
        <div className="grid md:grid-cols-12 gap-16 items-center">
          {/* Image with 3D Tilt & Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="md:col-span-5 relative perspective-1000 group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="aspect-[3/4] rounded-[2rem] overflow-hidden relative shadow-2xl border border-gray-200 bg-gray-100"
            >
              {/* Profile/Workspace Image - Place your image at public/images/about-photo.jpg */}
              <img
                src="/images/about-photo.jpg"
                alt="Juztyne Clever Dalupang"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/600x800/f3f4f6/9ca3af?text=Your+Photo';
                }}
              />

              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Enhanced Experience Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ transform: 'translateZ(40px)' }}
              className="absolute -bottom-8 -right-8 md:-right-12 bg-black text-white p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-800 hidden md:flex flex-col items-start gap-2"
            >
              <div className="flex items-start">
                <span className="font-extrabold text-5xl md:text-6xl tracking-tighter leading-none">
                  {personalInfo.experienceYears.replace('+', '')}
                </span>
                <span className="text-2xl md:text-3xl font-light text-gray-400 leading-none mt-1">
                  +
                </span>
              </div>
              <div className="h-0.5 w-12 bg-gray-700 my-1"></div>
              <p className="text-xs md:text-sm text-gray-300 uppercase tracking-widest font-bold">
                Years of
                <br />
                Experience
              </p>
            </motion.div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-black">
                About Me.
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-gray-900 font-semibold bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-200 shadow-sm">
                  <MapPin size={18} />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 font-medium bg-gray-100/50 px-5 py-2.5 rounded-full border border-gray-200/50">
                  <span>Information Technology Student</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
              {personalInfo.bio.map((paragraph, index) => (
                <p key={index} className="max-w-2xl">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-6 relative">
              <motion.a
                href={CV_FILE_PATH}
                download={CV_FILE_NAME}
                onClick={() => setShowDownloadToast(true)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <Download
                  size={20}
                  className="group-hover:translate-y-1 transition-transform duration-300"
                />
                <span>Download Resume</span>
              </motion.a>

              {/* Download Success Toast */}
              <AnimatePresence>
                {showDownloadToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute left-0 top-full mt-4 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl shadow-lg"
                  >
                    <CheckCircle size={18} className="text-green-500" />
                    <span className="text-sm font-medium">Resume downloading...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="pt-20">
          <div className="text-center mb-20 space-y-3">
            <h3 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight">
              My Journey
            </h3>
            <p className="text-gray-500 font-medium">Education & Professional Milestones</p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 md:-ml-px"></div>

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.15 }}
                  className="relative pl-24 md:pl-0 group"
                >
                  {/* Center Dot */}
                  <motion.div
                    className={`absolute left-[26px] md:left-1/2 top-0 w-5 h-5 rounded-full bg-white border-[4px] ${index === 0 ? 'border-black scale-110' : 'border-gray-300 group-hover:border-gray-400'} shadow-sm md:-ml-2.5 z-10 transition-all duration-300`}
                  ></motion.div>

                  <div
                    className={`md:flex items-start justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} md:gap-16`}
                  >
                    {/* Date (Opposite side on desktop) */}
                    <div
                      className={`hidden md:block w-1/2 pt-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
                    >
                      <span
                        className={`text-xl font-bold ${index === 0 ? 'text-black' : 'text-gray-400'} transition-colors duration-300`}
                      >
                        {item.year}
                      </span>
                    </div>

                    {/* Mobile Date */}
                    <div className="md:hidden mb-2 text-sm font-bold text-gray-500">
                      {item.year}
                    </div>

                    {/* Content Card */}
                    <div className="md:w-1/2 -mt-2">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`p-3.5 ${index === 0 ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-700'} rounded-2xl transition-colors`}
                          >
                            {item.type === 'work' ? (
                              <Briefcase size={22} />
                            ) : (
                              <GraduationCap size={22} />
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-black leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-gray-300 transition-all">
                              {item.role}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
