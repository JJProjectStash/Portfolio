/**
 * @fileoverview Contact Page Component
 * @description Contact form and information section with form validation,
 * loading states, and success feedback animations.
 * Uses Web3Forms API for email delivery.
 */

import React, { useState, useCallback } from 'react';
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  Phone,
  ArrowRight,
  AlertCircle,
  Download,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data';

interface ContactProps {
  /** Section ID for navigation */
  id: string;
}

/** Form data interface */
interface FormData {
  name: string;
  email: string;
  message: string;
}

/** Form submission status type */
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Web3Forms API Key - Free tier allows 250 submissions/month
 * Get your own key at https://web3forms.com/
 * Set VITE_WEB3FORMS_ACCESS_KEY in your .env file
 */
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

/**
 * Contact Component
 * Displays contact information and a message form
 *
 * @param props - Component props
 * @param props.id - Section ID for navigation scrolling
 * @returns The rendered contact section
 */
const Contact: React.FC<ContactProps> = ({ id }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  /**
   * Handles form input changes
   * @param e - Change event from input or textarea
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  /**
   * Handles form submission via Web3Forms API
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Check if API key is configured
    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus('error');
      setErrorMessage(
        'Contact form is not configured. Please email me directly at ' + personalInfo.email
      );
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: Message from ${formData.name}`,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset status after showing success message
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      );
      // Reset error status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id={id} className="py-32 relative" aria-label="Contact section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4 pb-4">
          <h2 className="text-5xl font-extrabold tracking-tighter text-theme-primary">
            Get in Touch
          </h2>
          <p className="text-lg text-theme-secondary font-light">
            Interested in working together? I'm always open to discussing new projects, creative
            ideas or opportunities to be part of your visions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10 bg-theme-secondary backdrop-blur-md p-10 rounded-[2.5rem] border border-theme-primary shadow-theme-sm h-full flex flex-col justify-between"
          >
            <div>
              <h3 className="text-3xl font-bold text-theme-primary mb-6 tracking-tight">
                Let's talk about everything!
              </h3>
              <p className="text-theme-secondary mb-10 leading-relaxed font-light">
                I am currently open to internship opportunities, freelance projects, and open-source
                collaborations. Feel free to reach out via the form or my direct channels.
              </p>

              <div className="space-y-6">
                <motion.a
                  whileHover={{ x: 5 }}
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-5 group p-5 rounded-3xl transition-all border border-transparent hover:border-theme-primary hover:shadow-theme-sm hover:bg-theme-tertiary"
                >
                  <div className="p-4 btn-theme-primary rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-theme-primary text-sm uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <span className="text-theme-secondary break-all text-lg font-medium group-hover:text-theme-primary transition-colors">
                      {personalInfo.email}
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 5 }}
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-5 group p-5 rounded-3xl transition-all border border-transparent hover:border-theme-primary hover:shadow-theme-sm hover:bg-theme-tertiary"
                >
                  <div className="p-4 bg-theme-secondary text-theme-primary border border-theme-primary rounded-2xl shadow-theme-sm group-hover:btn-theme-primary transition-colors duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-theme-primary text-sm uppercase tracking-wider mb-1">
                      Phone
                    </p>
                    <span className="text-theme-secondary text-lg font-medium group-hover:text-theme-primary transition-colors">
                      {personalInfo.phone}
                    </span>
                  </div>
                </motion.a>

                <div className="flex items-center gap-5 p-5 rounded-3xl border border-transparent">
                  <div className="p-4 bg-theme-secondary text-theme-primary border border-theme-primary rounded-2xl shadow-theme-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-theme-primary text-sm uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="text-theme-secondary text-lg font-medium">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>

                {/* Quick CV Download */}
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/Trimmed CV.pdf"
                  download="Juztyne_Clever_Dalupang_CV.pdf"
                  className="flex items-center gap-5 group p-5 rounded-3xl transition-all border border-transparent hover:border-theme-primary hover:shadow-theme-sm hover:bg-theme-tertiary"
                >
                  <div className="p-4 bg-theme-secondary text-theme-primary border border-theme-primary rounded-2xl shadow-theme-sm group-hover:btn-theme-primary transition-colors duration-300">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-theme-primary text-sm uppercase tracking-wider mb-1">
                      Curriculum Vitae
                    </p>
                    <span className="text-theme-secondary text-lg font-medium group-hover:text-theme-primary transition-colors flex items-center gap-2">
                      Download CV <Download size={16} className="opacity-60" />
                    </span>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-theme-secondary backdrop-blur-xl p-10 rounded-[2.5rem] border border-theme-primary shadow-theme-xl overflow-hidden"
          >
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-theme-secondary z-20 flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <CheckCircle className="w-24 h-24 text-theme-primary mb-6" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-4xl font-extrabold text-theme-primary mb-2 tracking-tight">
                    Message Sent
                  </h3>
                  <p className="text-theme-secondary mb-10 text-lg">
                    Thanks for reaching out. I'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-10 py-4 bg-theme-tertiary text-theme-primary font-bold rounded-xl hover:btn-theme-primary transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-theme-secondary z-20 flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <AlertCircle className="w-24 h-24 text-red-500 mb-6" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-4xl font-extrabold text-theme-primary mb-2 tracking-tight">
                    Oops!
                  </h3>
                  <p className="text-theme-secondary mb-10 text-lg">
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-10 py-4 bg-theme-tertiary text-theme-primary font-bold rounded-xl hover:btn-theme-primary transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-theme-primary uppercase tracking-wider ml-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-theme-tertiary border border-theme-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all placeholder:text-theme-tertiary font-medium text-theme-primary"
                  placeholder="What should I call you?"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-theme-primary uppercase tracking-wider ml-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-theme-tertiary border border-theme-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all placeholder:text-theme-tertiary font-medium text-theme-primary"
                  placeholder="Where can I reach you?"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-theme-primary uppercase tracking-wider ml-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-theme-tertiary border border-theme-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all resize-none placeholder:text-theme-tertiary font-medium text-theme-primary"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 px-8 py-5 btn-theme-primary font-bold text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-theme-lg hover:shadow-theme-xl"
              >
                {status === 'submitting' ? (
                  <>
                    Sending <Loader2 className="animate-spin" size={20} />
                  </>
                ) : (
                  <>
                    Send Message <ArrowRight size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
