/**
 * @fileoverview Type Definitions
 * @description Centralized TypeScript interfaces and types for the portfolio
 */

/**
 * Represents a portfolio project
 */
export interface Project {
  /** Unique identifier for the project */
  id: number;
  /** Project title/name */
  title: string;
  /** Brief description of the project and its features */
  description: string;
  /** Array of technologies used in the project */
  technologies: string[];
  /** URL to the project's thumbnail/cover image */
  imageUrl: string;
  /** Optional URL to the live demo/deployed version */
  demoUrl?: string;
  /** Optional URL to the source code repository */
  repoUrl?: string;
}

/**
 * Represents a category of skills
 */
export interface SkillCategory {
  /** Category title (e.g., "Frontend", "Backend") */
  title: string;
  /** Array of skill names within this category */
  skills: string[];
}

/**
 * Represents a navigation link
 */
export interface NavLink {
  /** URL path or hash for the link */
  path: string;
  /** Display label for the link */
  label: string;
}

/**
 * Represents a timeline entry (education/work experience)
 */
export interface TimelineEntry {
  /** Year or date range (e.g., "2023 - Present") */
  year: string;
  /** Job title or degree/institution name */
  role: string;
  /** Description of responsibilities or achievements */
  description: string;
  /** Type of entry: work experience or education */
  type: 'work' | 'education';
}

/**
 * Represents social media links
 */
export interface SocialLinks {
  /** GitHub profile URL */
  github: string;
  /** LinkedIn profile URL */
  linkedin: string;
  /** Facebook profile URL */
  facebook: string;
  /** Twitter/X profile URL */
  twitter: string;
}

/**
 * Represents personal information
 */
export interface PersonalInfo {
  /** Full name */
  name: string;
  /** Job title/role */
  role: string;
  /** Location (city, country) */
  location: string;
  /** Email address */
  email: string;
  /** Phone number */
  phone: string;
  /** Social media links */
  socials: SocialLinks;
  /** Bio paragraphs */
  bio: string[];
  /** Years of experience */
  experienceYears: string;
}