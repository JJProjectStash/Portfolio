/**
 * @fileoverview Skills Page Component
 * @description Displays technical skills organized by category with animated cards
 * Features icon mapping, hover effects, and staggered animations
 */

import React from 'react';
import { Code2, Layout as LayoutIcon, Database, Terminal } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { skillsData } from '../data';

interface SkillsProps {
  /** Section ID for navigation */
  id: string;
}

/**
 * Icon mapping for skill categories
 * Maps string icon names from data to actual React components
 */
const iconMap: Record<string, React.ReactNode> = {
  "Layout": <LayoutIcon className="w-6 h-6 text-white" />,
  "Database": <Database className="w-6 h-6 text-white" />,
  "Terminal": <Terminal className="w-6 h-6 text-white" />,
  "Code2": <Code2 className="w-6 h-6 text-white" />
};

/**
 * Skills Component
 * Displays technical skills grouped by category with animated interactions
 * 
 * @param props - Component props
 * @param props.id - Section ID for navigation scrolling
 * @returns The rendered skills section
 */
const Skills: React.FC<SkillsProps> = ({ id }) => {
  // Animation variants for staggered container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Animation variants for individual cards
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <section id={id} className="py-32 relative" aria-label="Skills section">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4 border-b border-gray-200/60 pb-10">
          <h2 className="text-5xl font-extrabold tracking-tighter text-black">Skills & Expertise</h2>
          <p className="text-lg text-gray-500 max-w-2xl font-light leading-relaxed">
            My technical toolkit and the technologies I use to build scalable digital products. I am constantly learning and expanding my stack.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillsData.map((set) => (
            <motion.div 
              key={set.category} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group p-10 bg-white/50 backdrop-blur-md border border-white/60 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-gray-200 transition-all duration-500 flex flex-col h-full"
            >
              <div className="flex items-start gap-6 mb-10">
                <motion.div 
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="p-4 bg-black rounded-2xl shadow-lg shrink-0 cursor-pointer text-white"
                >
                  {iconMap[set.iconName]}
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2 tracking-tight">{set.category}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">{set.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {set.skills.map((skill, idx) => (
                  <motion.span 
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff", borderColor: "#000" }}
                    className="px-4 py-2 text-sm font-semibold bg-white text-gray-600 border border-gray-200 rounded-lg transition-all duration-200 cursor-default select-none shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;