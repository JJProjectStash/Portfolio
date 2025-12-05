/**
 * @fileoverview Portfolio Data Configuration
 * @description Centralized data store for all portfolio content including
 * personal information, projects, skills, and timeline entries
 */

import { Project } from './types';

/**
 * Personal information and contact details
 */
export const personalInfo = {
  name: 'Juztyne Clever Dalupang',
  role: 'MERN Stack Developer',
  location: 'Quezon City, Philippines',
  email: 'dalupang.juztyneclever1@gmail.com',
  phone: '09930861780',
  socials: {
    github: 'https://github.com/Calliduz',
    linkedin: '',
    facebook: 'https://www.facebook.com/exalted.juztyne',
    twitter: '',
  },
  bio: [
    'I am a 19-year-old Information Technology student at Quezon City University with a passion for building robust web applications. My expertise lies in the MERN stack, where I have successfully developed multiple full-scale projects, including comprehensive service systems for local Barangays.',
    'Beyond coding, I focus on creating clean, intuitive, and scalable solutions. I am proficient in the full development lifecycle—from database architecture with MongoDB to dynamic front-ends using React and Next.js.',
  ],
  experienceYears: '2+',
};

/**
 * Portfolio projects
 * Each project showcases different technical skills and problem-solving abilities
 *
 * HOW TO USE LOCAL IMAGES:
 * 1. Place your images in the public/images/ folder
 * 2. Use the path like '/images/your-image.jpg'
 * 3. Recommended: Use optimized JPG/WebP images (max 800px width, ~100KB)
 */
export const projects: Project[] = [
  {
    id: 1,
    title: 'FastLinks - URL Shortener',
    description:
      'A lightweight MERN-based URL shortening service that generates clean, shareable links with quick and reliable redirects. Includes link analytics, simple management tools, and a fast, minimalist interface.',
    technologies: [
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Vite',
      'Tailwind CSS',
      'Cloudflare',
      'Render',
    ],
    imageUrl: '/images/fastlinks.jpg',
    demoUrl: 'https://fastlinks.clev.studio',
    repoUrl: 'https://github.com/jjProjectStash/url-shortener',
  },
  {
    id: 2,
    title: 'iBarangay - Barangay E-Services Platform',
    description:
      'A web platform that digitizes essential barangay services, enabling residents to request documents, submit concerns, and access public information online. Features include resident records, request processing, and an admin dashboard for efficient local governance.',
    technologies: [
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Vite',
      'Tailwind CSS',
      'Cloudflare',
      'Render',
    ],
    imageUrl: '/images/ibarangayimg.jpg',
    demoUrl: 'https://ibarangay.clev.studio',
    repoUrl: 'https://github.com/jjProjectStash/aibarangay',
  },
  {
    id: 3,
    title: 'Notified - Student Attendance & Communication System',
    description:
      'A school-focused management system that tracks student attendance and automatically emails parents or guardians about absences, tardiness, and excused entries. Designed to improve transparency, timely updates, and school-home communication.',
    technologies: [
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Vite',
      'Tailwind CSS',
      'Cloudflare',
      'Render',
    ],
    imageUrl: '/images/notified.jpg',
    demoUrl: 'https://notified.clev.studio',
    repoUrl: 'https://github.com/jjProjectStash/notified',
  },
  {
    id: 4,
    title: 'EcoCycle Talipapa - Barangay Recycling & Management System',
    description:
      'A full MERN stack platform that manages barangay operations while promoting sustainability through a recycling barter program. Residents can exchange recyclable materials for points and redeem them for eco-friendly items such as bags, rugs, or soil—encouraging environmental responsibility at the community level.',
    technologies: [
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Vite',
      'Tailwind CSS',
      'Vercel',
      'Render',
      'AWS S3',
    ],
    imageUrl: '/images/ecocycle.jpg',
    demoUrl: 'https://www.ecocycletalipapa.com',
  },
];

/**
 * Skills data organized by category
 * Each category includes an icon reference and list of skills
 */
export const skillsData = [
  {
    category: 'Frontend Ecosystem',
    iconName: 'Layout',
    description: 'Crafting responsive and interactive user interfaces.',
    skills: [
      'React.js',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'HTML5/CSS3',
      'Vite',
      'Framer Motion',
    ],
  },
  {
    category: 'Backend & Database',
    iconName: 'Database',
    description: 'Building scalable APIs and managing data persistence.',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'JWT Auth', 'Mongoose'],
  },
  {
    category: 'DevOps & Tools',
    iconName: 'Terminal',
    description: 'Deployment, version control, and cloud services.',
    skills: ['Git / GitHub', 'Linux', 'Vercel', 'Render', 'Cloudflare (Basic)'],
  },
  {
    category: 'Professional Skills',
    iconName: 'Code2',
    description: 'Soft skills that drive project success.',
    skills: [
      'Problem Solving',
      'System Analysis',
      'Team Collaboration',
      'Project Management',
      'Agile Basics',
    ],
  },
];

/**
 * Timeline entries for education and work experience
 * Displayed in chronological order (most recent first)
 */
export const timeline = [
  {
    year: '2024 - Present',
    role: 'Freelance Software Developer',
    description:
      'Developing custom web solutions for local clients, specializing in MERN stack applications for community services including Barangay management systems.',
    type: 'work',
  },
  {
    year: '2024 - Present',
    role: 'Quezon City University',
    description:
      'Pursuing a Bachelor of Science in Information Technology with a focus on software engineering and web technologies.',
    type: 'education',
  },
];
