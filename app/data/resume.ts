export interface Project {
  id: string;
  title: string;
  role: string;
  duration: string;
  description: string[];
  shortDescription: string;
  liveUrl?: string;
  tags: string[];
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
  details: string;
}

export interface WorkExperience {
  period: string;
  company: string;
  link?: string;
  role: string;
  description: string[];
}

export interface Achievement {
  period: string;
  title: string;
  description: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  address: string;
  about: string;
  aboutShort: string;
  skills: {
    category: string;
    items: string[];
  }[];
  mernExpertise: string[];
  toolsAndTech: string[];
  experienceSummary: string;
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
}

export const resumeData: ResumeData = {
  name: "THIRUMOORTHI MURUGESAN",
  title: "Full Stack Developer | OIC Developer",
  email: "thirumoorthim2200@gmail.com",
  phone: "+91 81110 34557",
  linkedin: "https://www.linkedin.com/in/thirumoorthi-murugesan-953b68233/",
  github: "http://github.com/ThirumoorthiMurugesan",
  portfolio: "https://thirumoorthi.dev",
  address: "13A Vaniyar Colony New, Edappadi Main Road, Sankari -637301, Salem (dt)",
  about: "Full-Stack Developer with 2 years of experience building scalable web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js). Skilled in developing responsive UI, secure REST APIs, and integrating enterprise services including Oracle Integration Cloud (OIC). Experienced in delivering end-to-end solutions in agile environments while writing clean, maintainable, and efficient code. Passionate about solving complex problems and building high-performance applications that create real business value.",
  aboutShort: "Full-Stack Developer with 2+ years of experience building scalable MERN web applications and integrating enterprise services like Oracle Integration Cloud (OIC) to create real business value.",
  skills: [
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "ReactJS", "NextJS"]
    },
    {
      category: "Backend & Databases",
      items: ["NodeJS", "ExpressJS", "MongoDB", "MySQL", "Python"]
    },
    {
      category: "Integration & Cloud",
      items: ["OIC", "VBCS", "REST APIs", "SOAP", "GraphQL"]
    }
  ],
  mernExpertise: ["MongoDB", "Express.js", "React.js", "Node.js"],
  toolsAndTech: ["Git & GitHub", "Postman", "Vercel", "OAuth 2.0", "Docker", "VS Code"],
  experienceSummary: "2+ Years of professional experience building scalable web apps and OIC cloud integrations.",
  workExperience: [
    {
      period: "2024 - Present",
      company: "NearTekPod APAC Technologies",
      link: "https://neartekpod.com/",
      role: "Associate Software Engineer",
      description: [
        "Developed and maintained scalable full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js), delivering responsive and high-performance user experiences.",
        "Designed and implemented RESTful APIs and backend services, ensuring secure data communication and seamless integration with enterprise systems.",
        "Integrated applications with Oracle Integration Cloud (OIC) and external APIs to enable reliable data exchange and streamline business workflows.",
        "Collaborated in Agile development environments to design, develop, test, and deploy features while maintaining clean, maintainable, and optimized code."
      ]
    }
  ],
  projects: [
    {
      id: "ihg",
      title: "InterContinental Hotels Group (IHG), USA",
      role: "OIC Developer",
      duration: "8 months",
      shortDescription: "End-to-end cloud integration linking booking engines, loyalty programs, and Opera Cloud.",
      tags: ["Oracle OIC", "VBCS", "Opera Cloud", "REST & SOAP", "OAuth 2.0"],
      liveUrl: "https://www.ihg.com",
      description: [
        "Developed end-to-end OIC integrations using REST, SOAP, FTP, OHIP, and OCI Streaming to connect booking engines, loyalty programs, and Opera Cloud.",
        "Implemented secure API connections using OAuth 2.0, with strong error handling, logging, and monitoring for high system reliability.",
        "Built a VBCS application to manage membership deposit points in Opera Cloud, improving operational efficiency.",
        "Utilized OCI services including ATP and Streaming Service for processing reservation and guest data with high performance and accuracy.",
        "Supported legacy-to-cloud migration ensuring real-time data synchronization and seamless hospitality operations."
      ]
    },
    {
      id: "simplifyai",
      title: "SimplifyAI",
      role: "MERN Stack Developer",
      duration: "3 months",
      shortDescription: "Scalable data warehouse reporting platform and AI insight engine for enterprise analytics.",
      tags: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "REST APIs"],
      description: [
        "Architected and developed a scalable SimplifyAI using the MERN Stack, designed as 3 integrated microservices applications to support centralized Data Warehouse reporting for 200+ employees.",
        "Implemented secure authentication using cookies and protected routing, ensuring 100% controlled access and session handling across 3 distinct user roles.",
        "Developed and rigorously validated 15+ RESTful APIs with Express.js and Postman, ensuring smooth data exchange and reliable service-to-service communication.",
        "Optimized MongoDB schemas and integrations with the Data Warehouse to enhance data retrieval performance and system efficiency.",
        "Designed a responsive and intuitive User Interface using React.js, improving user experience and accessibility across devices."
      ]
    },
    {
      id: "smartkonnect",
      title: "SmartKonnect",
      role: "Full Stack / Integration Developer",
      duration: "6 months",
      shortDescription: "Middleware engine connecting Property Management Systems with Opera APIs in real-time.",
      tags: ["VueJS", "NodeJS", "ExpressJS", "MySQL", "Opera APIs", "GraphQL"],
      description: [
        "Designed and developed SmartKonnect, a middleware solution connecting any PMS with Opera (OHIP APIs) for real-time hotel data synchronization using Vue.js, Node.js, and Express.js.",
        "Implemented Producer–Consumer streaming architecture for asynchronous data exchange between PMS and Opera, leveraging Streaming Services, OXI, and custom npm packages.",
        "Integrated REST and GraphQL APIs to manage diverse data types including reservations, profiles, and availability, ensuring high performance and reliability.",
        "Implemented secure authentication, optimized MySQL data structures, and improved end-to-end flow for faster processing and seamless cross-system communication."
      ]
    },
    {
      id: "airekruitpro",
      title: "AirekruitPro",
      role: "Full Stack Developer",
      duration: "3 months",
      shortDescription: "AI recruitment platform automating resume parsing, scheduling, and interview analysis.",
      tags: ["NextJS", "ReactJS", "GPT-3.5 API", "Redux", "CI/CD Pipelines"],
      description: [
        "Developed AirekruitPro using Next.js with optimized routing, Context API, Redux, and asynchronous event looping to support end-to-end recruitment workflows.",
        "Integrated an AI-agent (GPT-3.5) to parse single/bulk resumes, analyze job descriptions, generate candidate insights, and produce AI-based scoring.",
        "Built secure REST APIs for job posting, resume uploads, AI processing, and automated interview lifecycle management.",
        "Implemented CI/CD pipelines using GitHub Actions for automated builds, testing, deployments, and continuous integration.",
        "Automated interview scheduling and built an AI-driven interview engine that asks dynamic questions, converts audio responses to text, and uses the AI-agent to generate final scores for next-round decisions."
      ]
    }
  ],
  education: [
    {
      period: "2021 - 2023",
      degree: "Master of Computer Application",
      institution: "Kongu Engineering College, Erode",
      details: "CGPA of 7.7"
    },
    {
      period: "2018 - 2021",
      degree: "B.Sc (Computer Science)",
      institution: "Kongu Arts and Science College, Erode",
      details: "CGPA of 7.2"
    },
    {
      period: "2017 - 2018",
      degree: "Major Of Maths & Computer Science",
      institution: "PSG Matriculation School, Sankari",
      details: "70 Percentage"
    }
  ],
  achievements: [
    {
      period: "2024 - 2025",
      title: "Certified Application Integration Professional – Oracle Cloud Infrastructure (2024)",
      description: "Demonstrated expertise in designing and implementing cloud-based integration solutions and workflows using Oracle Integration Cloud (OIC)."
    },
    {
      period: "2024 - 2025",
      title: "Oracle Certified Foundations Associate",
      description: "Successfully completed certification validating foundational knowledge in Oracle technologies and cloud concepts."
    },
    {
      period: "2024 - 2025",
      title: "Learning Pioneer Award – NearTekPod",
      description: "Recognized for outstanding commitment to continuous learning and upskilling in emerging technologies and platforms."
    }
  ]
};
