/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, OrbitControls } from '@react-three/drei';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Facebook,
  Instagram,
  Code2, 
  Cpu, 
  Globe, 
  Layout, 
  Server, 
  ChevronRight, 
  Menu, 
  X,
  Send,
  Zap,
  Layers,
  Terminal,
  Briefcase,
  GraduationCap,
  Calendar,
  Award
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-dark-bg/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter flex items-center gap-2"
        >
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">MITIKU.DEV</div>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="nav-link"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="btn-primary py-2 px-6"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-bg border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium hover:text-brand-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button 
                className="btn-primary w-full mt-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const words = ["Full-Stack", "Creative", "Modern", "Futuristic"];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 lg:pt-32">
      <HeroScene />
      
      {/* Decorative Circles from Design */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-64 h-64 border border-blue-500/20 rounded-full opacity-30 pointer-events-none" />
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-96 h-96 border border-purple-500/20 rounded-full opacity-20 pointer-events-none" />

      <div className="relative z-10 text-center lg:text-left px-6 max-w-screen-2xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <h2 className="section-tag">// Hello, my name is</h2>
          <motion.h1 
            animate={{ 
              x: [-20, 20, -20],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="text-6xl md:text-8xl font-black mb-4 tracking-tight leading-none uppercase perspective-1000"
          >
            Mitiku <span className="text-gradient">Etafa</span>
          </motion.h1>
          <h3 className="text-2xl md:text-4xl font-light text-gray-400 mb-8">
            Full Stack <span className="text-brand-accent italic">{words[wordIdx]}</span> Engineer
          </h3>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
            Architecting scalable digital experiences from Ethiopia. Open to high-performance remote collaborations and physical opportunities worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              VIEW PROJECTS <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              className="btn-secondary w-full sm:w-auto"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Mitiku_Etafa_CV.pdf';
                link.download = 'Mitiku_Etafa_CV.pdf';
                link.click();
              }}
            >
              DOWNLOAD CV
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 hidden lg:grid grid-rows-3 gap-6"
        >
          <div className="glass p-8 rounded-2xl flex flex-col justify-between shadow-2xl relative group overflow-hidden">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-bold uppercase tracking-tighter text-blue-400">Expertise</h4>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 opacity-50"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 opacity-20"></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["React", "Node", "PostgreSQL", "AWS", "Three.js", "Docker"].map(s => (
                <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase font-bold tracking-widest">{s}</span>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-2xl flex flex-col justify-center items-center shadow-2xl relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent"></div>
            <div className="text-4xl font-black text-white mb-1">12+</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Global Reach</div>
            <div className="mt-4 text-[10px] font-mono text-blue-300">Ethiopia ➔ Remote ➔ Worldwide</div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl flex flex-col justify-center">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">Status</h4>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Terminal className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-sm font-light">Available for hire</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-sm font-light">Lead Architect @ Astra</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-primary to-transparent" />
      </motion.div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle, className, count }: { title: string, subtitle?: string, className?: string, count?: string }) => (
  <div className={cn("mb-20", className)}>
    <div className="flex items-center gap-4 mb-4">
      {count && <span className="font-mono text-xs text-brand-primary opacity-40">{count}</span>}
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="section-tag mb-0 uppercase tracking-[0.3em] font-black"
      >
        // {title}
      </motion.span>
    </div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9]"
    >
      {subtitle}
    </motion.h2>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-all" />
          <div className="aspect-square rounded-2xl overflow-hidden glass relative">
            <img 
              src="https://images.stockcake.com/public/0/5/9/059abcd3-426e-4d69-9cdf-c0d353c63189_large/coder-at-work-stockcake.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl hidden md:block">
            <div className="text-3xl font-bold text-brand-primary">05+</div>
            <div className="text-sm text-gray-400">Years Industry Experience</div>
          </div>
        </motion.div>

        <div>
          <SectionHeader title="Discovery" subtitle="Behind the code" count="01" />
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Hello! I'm a full-stack architect obsessed with building modular, scalable, and pixel-perfect applications. With a foundation in computer science and a passion for design, I've spent the last 5 years pushing the boundaries of what's possible on the web.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-10">
            {[
              { icon: Globe, label: "Addis Ababa, Ethiopia", title: "Location" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 glass rounded-xl">
                <item.icon className="w-6 h-6 text-brand-primary mt-1" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.title}</div>
                  <div className="font-semibold text-sm">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="btn-secondary flex items-center gap-2 group"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/Mitiku_Etafa_CV.pdf';
              link.download = 'Mitiku_Etafa_CV.pdf';
              link.click();
            }}
          >
            Download Resume <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
   const experiences = [
     {
       company: "Global Remote",
       role: "Full-Stack Software Engineer",
       period: "2023 - Present",
       description: "Collaborating with diverse international teams to build scalable web architectures. Delivering high-performance solutions for multiple remote clients across various industries.",
       icon: Globe,
       color: "from-blue-500 to-cyan-500"
     },
     {
       company: "Afronex",
       role: "Software Developer Intern",
       period: "2022 - 2023",
       description: "Contributed to core software modules and system optimization. Gained deep hands-on experience in full-cycle software development within a leading tech environment.",
       icon: Briefcase,
       color: "from-purple-500 to-pink-500"
     },
     {
       company: "Ethiopia Hackathons",
       role: "Competitive Programmer",
       period: "2020 - 2022",
       description: "Participated in numerous national hackathons, solving complex algorithmic challenges and building rapid prototypes. Honed problem-solving skills under intense pressure.",
       icon: Award,
       color: "from-orange-500 to-red-500"
     },
     {
       company: "Tech University",
       role: "B.Sc. in Computer Science",
       period: "2018 - 2022",
       description: "Focused on Software Engineering and Computational Theory. Developed a strong foundation in modern programming paradigms and systems design.",
       icon: GraduationCap,
       color: "from-green-500 to-emerald-500"
     }
   ];

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeader title="Chronicles" subtitle="Professional Odyssey" count="02" className="text-center md:text-left" />
        
        <div className="relative mt-20">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary via-brand-secondary to-transparent hidden md:block" />
          
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-8 md:gap-0",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Content Card */}
                <div className="w-full md:w-[45%]">
                  <motion.div 
                    whileHover={{ scale: 1.02, rotateY: idx % 2 === 0 ? 5 : -5 }}
                    className="glass p-8 rounded-2xl relative group overflow-hidden border border-white/5 hover:border-brand-primary/30 transition-all duration-500"
                  >
                    <div className={cn("absolute top-0 left-0 w-1 h-full bg-gradient-to-b", exp.color)} />
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn("w-12 h-12 rounded-xl glass flex items-center justify-center bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity", exp.color)}>
                        <exp.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold uppercase tracking-tight">{exp.role}</h4>
                        <div className="text-sm text-brand-primary font-mono">{exp.company}</div>
                      </div>
                    </div>
                    <p className="text-gray-400 font-light leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                  </motion.div>
                </div>

                {/* Center Node */}
                <div className="hidden md:flex w-[10%] justify-center relative z-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className={cn("w-4 h-4 rounded-full border-2 border-dark-bg relative", exp.color.replace('from-', 'bg-'))}
                  >
                    <div className={cn("absolute inset-0 rounded-full animate-ping opacity-40", exp.color.replace('from-', 'bg-'))} />
                  </motion.div>
                </div>

                {/* Empty Space for the other side */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    {
      name: "Frontend",
      icon: Layout,
      skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion", "WebGL"]
    },
    {
      name: "Backend",
      icon: Server,
      skills: ["Node.js & Express", "PostgreSQL", "Prisma ORM", "Firebase", "REST & GraphQL", "Docker"]
    },
    {
      name: "Architecture",
      icon: Cpu,
      skills: ["Microservices", "System Design", "Cloud Edge", "Performance Optimization", "CI/CD", "Security"]
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeader title="Technical Stack" subtitle="The weapons of choice" className="text-center" count="03" />
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-10 rounded-sm group relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-all" />
              <div className="w-16 h-16 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-brand-primary/50 transition-colors">
                <cat.icon className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-black mb-6 uppercase tracking-widest">{cat.name}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {cat.skills.map((skill) => (
                  <span key={skill} className="bg-white/5 border border-white/10 px-4 py-2 rounded-sm text-[10px] uppercase font-bold tracking-[0.1em] text-gray-400 hover:text-white hover:bg-brand-primary/10 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      title: "Nebula E-commerce",
      desc: "A futuristic shopping experience with 3D product previews and real-time inventory management.",
      tags: ["React", "Three.js", "PostgreSQL"],
      image: "https://c7.alamy.com/comp/D52WR2/petrol-pump-attendant-filling-car-with-fuel-at-a-filling-station-in-D52WR2.jpg",
      link: "https://fuel-tracker-6tun.vercel.app/"
    },
    {
      title: "Omni Dashboard",
      desc: "Enterprise-grade analytics platform featuring complex data streaming and AI-driven insights.",
      tags: ["Next.js", "TypeScript", "D3.js"],
      image: "https://media.istockphoto.com/id/1419580307/photo/students-walking-on-the-university-campus.jpg?s=612x612&w=0&k=20&c=DPTfhcehBeiINfFiEIaldBhjqn4Isf8p1d_twUJRVkk=",
      link: "https://university-grade-portal.vercel.app/"
    },
    {
      title: "Astro Portal",
      desc: "A collaborative 3D space for remote teams to brainstorm and visualize ideas in real-time.",
      tags: ["WebSockets", "Node.js", "Framer"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Jkk3pm7UgHZS8OtqqQORlvz0BrsAUmq0ziK8W-EI7r0Kxo8hvW3jLBprAvRG",
      link: "https://market-link-online-marketing-uqj9.vercel.app/"
    },
    {
      title: "Cyber Shield",
      desc: "Advanced security monitoring system with real-time threat detection and automated response.",
      tags: ["Go", "React", "Redis"],
      image: "https://images.stockcake.com/public/d/0/2/d02996d6-f368-45e0-8451-f76a5996f081_large/monitoring-cyber-security-stockcake.jpg",
      link: "#"
    },
    {
      title: "Pulse Health",
      desc: "Healthcare management platform connecting patients with providers through encrypted video calls.",
      tags: ["Next.js", "WebRTC", "Supabase"],
      image: "https://images.stockcake.com/public/4/4/6/4467f9a2-5881-49f3-80e5-2965421c6183_large/digital-heartbeat-monitor-stockcake.jpg",
      link: "#"
    },
    {
      title: "Eco Track",
      desc: "Sustainability tracking tool for businesses to monitor and reduce their carbon footprint.",
      tags: ["Vue.js", "Django", "Chart.js"],
      image: "https://images.stockcake.com/public/e/f/1/ef1496a3-6705-4c01-9494-845115286595_large/eco-friendly-concept-stockcake.jpg",
      link: "#"
    }
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeader title="Portfolio" subtitle="Latest Creations" count="04" />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {visibleProjects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </div>

        {projects.length > 3 && (
          <div className="mt-16 text-center">
            <button 
              className="btn-secondary group"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All Projects"} 
              <ChevronRight className={cn(
                "w-4 h-4 inline-block ml-1 transition-transform",
                showAll ? "rotate-90" : "group-hover:translate-x-1"
              )} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-screen-2xl mx-auto glass rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-secondary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-8 relative z-10">
          <div>
            <SectionHeader title="Inquiry" subtitle="Let's build the future together" count="05" />
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Have a project in mind or just want to chat? Reach out and I'll get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Github, value: "@mitihans-1", label: "GitHub", link: "https://github.com/mitihans-1" },
                { icon: Linkedin, value: "mitiku-etafa", label: "LinkedIn", link: "https://www.linkedin.com/in/mitiku-etafa-a909803a8/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Bet384yDGTDuTO%2Fo4w5E2UA%3D%3D" },
                { icon: Facebook, value: "Mitiku Etafa", label: "Facebook", link: "https://web.facebook.com/mitiku.etafa.865028" },
                { icon: Instagram, value: "@mitihans22", label: "Instagram", link: "https://www.instagram.com/mitihans22/" },
              ].map((item) => (
                <a key={item.label} href={item.link} target={item.link.startsWith('http') ? "_blank" : undefined} rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-brand-primary/20 transition-all">
                    <item.icon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">{item.label}</div>
                    <div className="font-semibold">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

           <form 
             className="space-y-6 lg:p-12 p-8 glass rounded-sm relative" 
             action="https://formspree.io/f/xzdovnzv" 
             method="POST"
             target="_blank"
           >
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] opacity-20 uppercase tracking-widest hidden md:block">
              Secure Channel Encrypted
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 block">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name " 
                  required
                  className="w-full bg-white/[0.02] border border-white/10 rounded-sm px-5 py-4 focus:outline-none focus:border-brand-primary/50 transition-all text-white font-light" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 block">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email " 
                  required
                  className="w-full bg-white/[0.02] border border-white/10 rounded-sm px-5 py-4 focus:outline-none focus:border-brand-primary/50 transition-all text-white font-light" 
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 block">Subject</label>
              <input 
                type="text" 
                name="subject"
                placeholder="Project Inquiry" 
                required
                className="w-full bg-white/[0.02] border border-white/10 rounded-sm px-5 py-4 focus:outline-none focus:border-brand-primary/50 transition-all text-white font-light" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 block">Message</label>
              <textarea 
                name="message"
                placeholder="Tell me about your project..." 
                rows={6} 
                required
                className="w-full bg-white/[0.02] border border-white/10 rounded-sm px-5 py-4 focus:outline-none focus:border-brand-primary/50 transition-all text-white font-light resize-none"
              ></textarea>
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 py-6">
              Establish Connection <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
        <div>© 2026 Mitiku Etafa. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-brand-primary transition-colors">About</a>
          <a href="#experience" className="hover:text-brand-primary transition-colors">Experience</a>
          <a href="#projects" className="hover:text-brand-primary transition-colors">Projects</a>
          <a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a>
          <span>Designed for the 2026 Web Standard</span>
        </div>
      </div>
    </footer>
  );
};

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="cursor-glow hidden lg:block"
      style={{ 
        left: position.x, 
        top: position.y 
      }}
    />
  );
};

const Services = () => {
  const services = [
    { title: "SaaS Architecture", icon: Server, desc: "Building scalable, distributed systems ready for millions of users." },
    { title: "High-End UX/UI", icon: Layout, desc: "Crafting immersive, high-conversion interfaces with precision design." },
    { title: "WebGL & 3D", icon: Cpu, desc: "Bringing the next dimension to the web with real-time 3D experiences." }
  ];

  return (
    <section className="py-24 px-6 border-y border-white/5">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-8">
        {services.map((s, idx) => (
          <motion.div 
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex-1 group"
          >
            <div className="text-xs font-black text-brand-primary mb-4 opacity-50 font-mono tracking-widest">0{idx + 1}</div>
            <h4 className="text-2xl font-black uppercase mb-4 group-hover:translate-x-2 transition-transform">{s.title}</h4>
            <p className="text-gray-500 font-light leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-dark-bg min-h-screen selection:bg-brand-primary selection:text-white">
      {/* Texture & Overlays */}
      <div className="noise" />
      <div className="fixed inset-0 grid-pattern opacity-40 pointer-events-none" />
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary origin-left z-[70]"
        style={{ scaleX }}
      />
      
      <CursorGlow />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        {/* Decorative Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex items-center justify-center">
          <div className="w-2 h-2 bg-brand-primary rotate-45 mb-[1px]" />
        </div>

        <About />
        <Experience />
        <Services />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

// --- Enhanced Components ---

function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.5} />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#3b82f6"
              attach="material"
              distort={0.45}
              speed={2.5}
              roughness={0.1}
              metalness={0.9}
            />
          </Sphere>
        </Float>

        {/* Floating geometric detail */}
        <Float speed={3} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[4, 2, -5]} rotation={[0.5, 0.5, 0]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#a855f7" wireframe />
          </mesh>
        </Float>

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={0.5} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  );
}

const ProjectCard = ({ project, idx }: { project: any, idx: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * 10, y: -x * 10 });
  };

  const resetRotate = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotate}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="glass rounded-sm overflow-hidden group cursor-pointer relative"
      onClick={() => project.link !== "#" && window.open(project.link, "_blank")}
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
            <ExternalLink className="w-5 h-5 text-black" />
          </div>
        </div>
      </div>
      <div className="p-8 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="flex gap-3 mb-5">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[9px] uppercase tracking-[0.2em] font-black text-brand-primary px-2 py-1 bg-brand-primary/10 rounded-sm">{tag}</span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-brand-primary transition-colors uppercase">{project.title}</h3>
        <p className="text-sm text-gray-500 mb-8 line-clamp-2 leading-relaxed font-light">
          {project.desc}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <a href="https://github.com/mitihans-1" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <Github className="w-5 h-5 text-gray-600 hover:text-white transition-all hover:scale-110" />
            </a>
            <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <ExternalLink className="w-5 h-5 text-gray-600 hover:text-white transition-all hover:scale-110" />
            </a>
          </div>
          <motion.div 
            whileHover={{ x: 5 }}
            className="text-[10px] uppercase font-bold tracking-widest text-gray-400 group-hover:text-white transition-colors flex items-center gap-2"
          >
            Case Study <ChevronRight className="w-3 h-3" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
