/**
 * @fileoverview Projects Page Component
 * @description Displays portfolio projects with images, descriptions, and links
 * Features animated cards with hover effects and loading skeletons
 */

import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ExternalLink, Github, Search, ArrowUpRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { projects as projectsData } from '../data';

interface ProjectsProps {
  /** Section ID for navigation */
  id: string;
}

/**
 * Project Skeleton Component
 * Displays a loading placeholder while projects are being fetched
 */
const ProjectSkeleton: React.FC = () => (
  <div className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden h-full shadow-sm">
    <div className="aspect-video bg-gray-100 animate-pulse" />
    <div className="p-6 flex-grow space-y-4">
      <div className="h-7 bg-gray-100 rounded-md w-3/4 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-100 rounded-md w-full animate-pulse" />
        <div className="h-4 bg-gray-100 rounded-md w-5/6 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded-md w-4/6 animate-pulse" />
      </div>
    </div>
  </div>
);

/**
 * Projects Component
 * Displays a grid of portfolio projects with animations
 *
 * @param props - Component props
 * @param props.id - Section ID for navigation scrolling
 * @returns The rendered projects section
 */
const Projects: React.FC<ProjectsProps> = ({ id }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load projects immediately - no artificial delay
    setProjects(projectsData);
    setLoading(false);
  }, []);

  // Animation variants for staggered container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Animation variants for individual items
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } },
  };

  return (
    <section id={id} className="py-32 relative" aria-label="Projects section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4 border-b border-gray-200/60 pb-10">
          <h2 className="text-5xl font-extrabold tracking-tighter text-black">Selected Work</h2>
          <p className="text-lg text-gray-500 max-w-2xl font-light leading-relaxed">
            A showcase of my recent work, ranging from frontend prototypes to full-stack
            applications. Each project represents a unique challenge and solution.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map((n) => (
              <ProjectSkeleton key={n} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center space-y-4 bg-white/60 backdrop-blur-md rounded-3xl border border-gray-200 border-dashed"
          >
            <div className="p-4 bg-gray-50 rounded-full shadow-sm">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No Projects Found</h3>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group flex flex-col bg-white/40 backdrop-blur-md border border-white/60 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-white/80 transition-all duration-500 relative"
              >
                {/* Subtle White Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>

                {/* Project Image Area with Optimization */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100 relative z-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/800x500/f3f4f6/9ca3af?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

                  {/* Floating Action Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100 z-20">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white text-black rounded-full shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="flex flex-col flex-grow p-8 relative z-10">
                  <div className="mb-6 space-y-2">
                    <h3 className="text-2xl font-bold text-black tracking-tight">
                      {project.title}
                    </h3>
                    <div className="h-0.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-black w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-8 flex-grow text-base leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-white border border-gray-200 rounded-full text-gray-500 group-hover:border-gray-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100/50">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-black hover:text-gray-600 transition-colors"
                      >
                        <ExternalLink size={16} /> Live Preview
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-colors ml-auto"
                      >
                        <Github size={16} /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
