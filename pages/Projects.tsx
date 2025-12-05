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
  <div className="flex flex-col bg-theme-secondary border border-theme-primary rounded-2xl overflow-hidden h-full shadow-theme-sm">
    <div className="aspect-video bg-theme-tertiary animate-pulse" />
    <div className="p-6 flex-grow space-y-4">
      <div className="h-7 bg-theme-tertiary rounded-md w-3/4 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-theme-tertiary rounded-md w-full animate-pulse" />
        <div className="h-4 bg-theme-tertiary rounded-md w-5/6 animate-pulse" />
        <div className="h-4 bg-theme-tertiary rounded-md w-4/6 animate-pulse" />
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
    <section id={id} className="py-16 sm:py-24 md:py-32 relative" aria-label="Projects section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 md:space-y-16">
        <div className="space-y-4 border-b border-theme-primary pb-6 sm:pb-8 md:pb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-theme-primary">
            Selected Work
          </h2>
          <p className="text-base sm:text-lg text-theme-secondary max-w-2xl font-light leading-relaxed">
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
            className="flex flex-col items-center justify-center py-24 text-center space-y-4 bg-theme-secondary backdrop-blur-md rounded-3xl border border-theme-primary border-dashed"
          >
            <div className="p-4 bg-theme-tertiary rounded-full shadow-theme-sm">
              <Search className="w-8 h-8 text-theme-tertiary" />
            </div>
            <h3 className="text-xl font-bold text-theme-primary">No Projects Found</h3>
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
                className="group flex flex-col bg-theme-secondary backdrop-blur-md border border-theme-primary rounded-[2rem] overflow-hidden shadow-theme-sm hover:shadow-theme-xl hover:border-theme-hover transition-all duration-500 relative"
              >
                {/* Subtle White Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>

                {/* Project Image Area with Optimization */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-theme-tertiary relative z-0">
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
                        className="w-12 h-12 bg-theme-secondary text-theme-primary rounded-full shadow-theme-xl flex items-center justify-center hover:btn-theme-primary transition-colors"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="flex flex-col flex-grow p-8 relative z-10">
                  <div className="mb-6 space-y-2">
                    <h3 className="text-2xl font-bold text-theme-primary tracking-tight">
                      {project.title}
                    </h3>
                    <div className="h-0.5 w-full bg-theme-tertiary rounded-full overflow-hidden">
                      <div className="h-full btn-theme-primary w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                    </div>
                  </div>

                  <p className="text-theme-secondary mb-8 flex-grow text-base leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-theme-secondary border border-theme-primary rounded-full text-theme-secondary group-hover:border-theme-hover transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-theme-secondary">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-theme-primary hover:text-theme-secondary transition-colors"
                      >
                        <ExternalLink size={16} /> Live Preview
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-theme-tertiary hover:text-theme-primary transition-colors ml-auto"
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
