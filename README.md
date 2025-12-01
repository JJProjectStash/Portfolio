# Juztyne Clever Dalupang - Portfolio

<div align="center">
  <img width="1200" height="475" alt="Portfolio Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  
  <p align="center">
    <strong>A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS</strong>
  </p>
  
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#scripts">Scripts</a>
  </p>
</div>

---

## ✨ Features

- **Modern Design**: Clean, minimalist aesthetic with smooth animations
- **Fully Responsive**: Optimized for all device sizes
- **Performance Optimized**: Code splitting, lazy loading, and optimized assets
- **Accessible**: ARIA labels, keyboard navigation, and reduced motion support
- **SEO Ready**: Meta tags, Open Graph, and Twitter cards
- **Error Handling**: Graceful error boundaries for better UX
- **Type Safe**: Written in TypeScript for better developer experience

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19, Vite 6 |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Routing** | React Router DOM v7 |

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Calliduz/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   
   Create a `.env.local` file in the root directory:
   ```env
   # Gemini API Key (if using AI features)
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Portfolio/
├── components/           # Reusable UI components
│   ├── ErrorBoundary.tsx # Error handling wrapper
│   ├── Footer.tsx        # Site footer
│   ├── Layout.tsx        # Main layout wrapper
│   ├── Navbar.tsx        # Navigation bar
│   ├── ScrollProgress.tsx # Scroll indicator
│   └── ScrollToTop.tsx   # Scroll to top utility
├── pages/                # Page components
│   ├── About.tsx         # About section
│   ├── Contact.tsx       # Contact form
│   ├── Home.tsx          # Hero section
│   ├── Projects.tsx      # Project showcase
│   └── Skills.tsx        # Skills display
├── App.tsx               # Root application component
├── data.ts               # Portfolio content data
├── index.html            # HTML entry point
├── index.tsx             # React entry point
├── types.ts              # TypeScript type definitions
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Type check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run clean` | Remove build artifacts |

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | No |

## 🎨 Customization

### Personal Information
Edit `data.ts` to update:
- Personal details (name, role, location)
- Contact information
- Social media links
- Bio and experience

### Projects
Add or modify projects in the `projects` array in `data.ts`:
```typescript
{
  id: 1,
  title: "Project Name",
  description: "Project description...",
  technologies: ["React", "Node.js"],
  imageUrl: "https://...",
  demoUrl: "https://...",
  repoUrl: "https://..."
}
```

### Skills
Update the `skillsData` array in `data.ts` to reflect your skills.

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to Netlify

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Calliduz/Portfolio/issues).

## 📧 Contact

**Juztyne Clever Dalupang**
- Email: dalupang.juztyneclever1@gmail.com
- GitHub: [@Calliduz](https://github.com/Calliduz)

---

<div align="center">
  <p>Built with ❤️ using React & Tailwind CSS</p>
</div>
