/* ==========================================================================
   CONTENT: the single source of truth for the whole site.
   Every component reads from here; no text is hard-coded in the JSX.
   To add an item, copy an existing entry in the same array and edit it.
   ========================================================================== */

// ===== HERO / DEV INFO — edit here =====
// Rendered as the code card in the hero. Every key below `fullName`
// shows up as a line in the card, so you can add/remove keys freely.
export const dev = {
  name: "Jemimah",
  fullName: "Jemimah O. Dela Cruz",
  role: "Full-Stack",
  stack: ["Next.js", "TypeScript", "Tailwind", "Node.js"],
  based: "Nueva Vizcaya, PH",
} as const;

// ===== LINKS — edit here =====
export const links = {
  email: "jemimahdelacruz0298@gmail.com",
  github: "https://github.com/jemwashere", // TODO: confirm this is your GitHub profile URL
  resume: "/resume.pdf", // put your resume.pdf inside the /public folder
};

// ===== HERO TEXT — edit here =====
export const hero = {
  availability: "Available for work", // set showAvailability to false to hide the badge
  showAvailability: true,
  greeting: `// Hello, I'm ${dev.fullName}`,
  headline: ["Jemimah", "Dela Cruz"], // big name, split over two lines
  typingPhrases: ["Aspiring Full-Stack Developer", "3rd Year BSIT · NVSU", "Web & Mobile App Development"],
  bio: "3rd-year BSIT student specializing in Web & Mobile Application Development. I build responsive websites with HTML, CSS, Bootstrap, PHP, and MySQL, and simple Android apps with MIT App Inventor. Always learning, always building.",
  primaryButton: { label: "View Projects", href: "#projects" },
  secondaryButton: { label: "Contact Me" }, // opens an email to links.email
  scrollCue: "scroll",
};

// ===== SECTION HEADINGS — edit here =====
// `index` is the small "01 —" label, `kanji` is the faint numeral behind the title.
export type SectionMeta = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  kanji: string;
};

export const sections = {
  education: { id: "education", index: "01", eyebrow: "Tertiary", title: "Education", kanji: "壱" },
  seminars: { id: "seminars", index: "02", eyebrow: "Always learning", title: "Seminars Attended", kanji: "弐" },
  skills: { id: "skills", index: "03", eyebrow: "Toolkit", title: "Technical Skills", kanji: "参" },
  projects: { id: "projects", index: "04", eyebrow: "Selected work", title: "Projects", kanji: "肆" },
  contact: { id: "contact", index: "05", eyebrow: "Contact", title: "Let's build something together.", kanji: "伍" },
} satisfies Record<string, SectionMeta>;

// ===== NAVBAR — edit here =====
export type NavLink = { id: string; label: string };

export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: sections.education.id, label: "Education" },
  { id: sections.seminars.id, label: "Seminars" },
  { id: sections.skills.id, label: "Skills" },
  { id: sections.projects.id, label: "Projects" },
  { id: sections.contact.id, label: "Contact" },
];

export const navbar = {
  logo: "jemimah", // shown as "jemimah.dev"
  logoSuffix: ".dev",
  resumeLabel: "Resume",
};

// ===== EDUCATION — edit here =====
export type Education = {
  id: string;
  school: string;
  program: string;
  yearRange: string; // "2024 – Present"
  gpa: string; // "1.63"
  details: string[]; // revealed on hover
  level?: string; // e.g. "3rd Year"
  location?: string;
};

export const educationLabels = {
  detailsHeading: "Highlights",
  gpaLabel: "GPA",
  expandHint: "Hover or tap to expand",
};

export const education: Education[] = [
  {
    id: "nvsu",
    school: "Nueva Vizcaya State University",
    program: "BS Information Technology — Major in Web & Mobile Application Development",
    level: "3rd Year",
    yearRange: "2024 – Present",
    location: "Bayombong, Nueva Vizcaya",
    gpa: "1.63",
    details: [
      "Specializing in Web & Mobile Application Development",
      "Hands-on projects with HTML, CSS, Bootstrap, PHP, MySQL, and MIT App Inventor",
      "Attended seminars on Artificial Intelligence and Secure Web Development",
    ],
  },
];

// ===== SEMINARS — edit here =====
export type Seminar = {
  id: string;
  title: string;
  year: string;
  description: string;
};

export const seminars: Seminar[] = [
  {
    id: "ai-seminar",
    title: "Artificial Intelligence Seminar",
    year: "2025",
    description:
      "Attended a seminar on the fundamentals of artificial intelligence and its applications in modern technology, enhancing awareness of digital tools and innovation.",
  },
  {
    id: "secure-web-dev",
    title: "Secure Web Development Building Application",
    year: "2026",
    description: "Participated in training related to secure web application development and application-building concepts.",
  },
];

// ===== SKILLS — edit here =====
// Items with a `note` are shown as a pill + short explanation;
// items without one are shown as a compact cloud of pills.
export type SkillGroup = {
  id: string;
  category: string;
  items: { name: string; note?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    category: "Programming & Web Development",
    items: [
      { name: "HTML5", note: "Structure and organization of web pages" },
      { name: "CSS", note: "Responsive layouts, styling, and user interface design" },
      { name: "JavaScript", note: "Basic programming, DOM manipulation, validation, and interactive web functionality" },
      { name: "PHP", note: "Server-side programming and basic web application development" },
      { name: "Python", note: "Basic programming, logic, data processing, and application development" },
    ],
  },
  {
    id: "database",
    category: "Database",
    items: [
      { name: "MySQL", note: "Database creation, table management, relationships, queries, and CRUD operations" },
      { name: "SQL", note: "SELECT, INSERT, UPDATE, DELETE, filtering, sorting, and basic relational database operations" },
    ],
  },
  {
    id: "development",
    category: "Development Skills",
    items: [
      { name: "Front-End Development" },
      { name: "Back-End Development" },
      { name: "Database Management" },
      { name: "CRUD Operations" },
      { name: "Form Handling and Validation" },
      { name: "Responsive Web Design" },
      { name: "Basic API and System Integration Concepts" },
      { name: "Debugging and Troubleshooting" },
      { name: "User Interface Design" },
      { name: "Version/Project Organization" },
    ],
  },
  {
    id: "tools",
    category: "Tools & Technologies",
    items: [
      { name: "Visual Studio Code" },
      { name: "Git/GitHub" },
      { name: "MySQL" },
      { name: "Bootstrap" },
      { name: "MIT App Inventor" },
      { name: "Canva" },
      { name: "Microsoft Office / Google Workspace" },
    ],
  },
];

// ===== PROJECTS — edit here =====
export type Project = {
  id: string;
  name: string;
  shortDescription: string; // shown by default
  longDescription: string; // revealed on hover / tap
  tech: string[];
};

export const projectLabels = {
  techHeading: "Languages & tools",
  hoverHint: "Hover to expand",
  tapHint: "Tap to expand",
};

export const projects: Project[] = [
  {
    id: "temperature-calculator",
    name: "Temperature Calculator",
    shortDescription: "Mobile app that converts temperatures between units.",
    longDescription:
      "An Android app built with MIT App Inventor that converts temperature values between Celsius and Fahrenheit. Uses block-based logic for the formulas, input validation for empty or invalid values, and a simple, readable layout.",
    tech: ["MIT App Inventor"],
  },
  {
    id: "salary-tax-calculator",
    name: "Salary Tax Calculator",
    shortDescription: "Computes income tax and take-home pay from a salary.",
    longDescription:
      "An MIT App Inventor app where the user enters a salary and gets the computed tax and net pay. Practices conditional logic for tax brackets, arithmetic blocks, and clear on-screen results.",
    tech: ["MIT App Inventor"],
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    shortDescription: "Calculates Body Mass Index and shows the category.",
    longDescription:
      "An MIT App Inventor app that takes height and weight, calculates BMI, and labels the result (underweight, normal, overweight, obese). Focuses on form inputs, validation, and conditional feedback.",
    tech: ["MIT App Inventor"],
  },
  {
    id: "cite-college-website",
    name: "CITE College Website",
    shortDescription: "Responsive informational website for the CITE college.",
    longDescription:
      "A multi-section website for the College of Information Technology and Engineering, built with semantic HTML and Bootstrap's grid and components. Includes a navigation bar, program information, and a layout that adapts to phones, tablets, and desktops.",
    tech: ["HTML", "CSS", "Bootstrap"],
  },
  {
    id: "html-website-guide",
    name: "HTML Website Guide",
    shortDescription: "Beginner-friendly guide to core HTML elements.",
    longDescription:
      "A learning site that explains common HTML tags with examples: headings, lists, links, images, tables, and forms. Styled with CSS and Bootstrap so the guide itself is clean and easy to navigate.",
    tech: ["HTML", "CSS", "Bootstrap"],
  },
  {
    id: "html-student-profile",
    name: "HTML Student Profile",
    shortDescription: "Personal student profile page.",
    longDescription:
      "A personal profile page presenting student details, education, skills, and hobbies. Built with HTML structure, custom CSS styling, and Bootstrap components for a responsive layout.",
    tech: ["HTML", "CSS", "Bootstrap"],
  },
];

// ===== CONTACT / FOOTER — edit here =====
export const contact = {
  titleAccentWord: "together", // this word in sections.contact.title is shown in red
  message:
    "Open to internships, freelance work, and collaborations. My inbox is always open, whether it's a question, an idea, or just a hello.",
  buttonLabel: "Say Hello",
  builtWith: "Built with Next.js & Tailwind.",
  backToTop: "Back to top ↑",
};
