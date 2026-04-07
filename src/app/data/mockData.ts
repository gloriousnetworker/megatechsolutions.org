import { Course, BlogPost, Staff, GalleryItem, Certificate, Payment, Enrollment, Assignment, Product } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    description: 'Master modern web development with React, Node.js, and MongoDB',
    instructor: 'HRM Iniubong Udofot',
    instructorId: 'staff-1',
    price: 100000,
    category: 'Web Development',
    level: 'Intermediate',
    duration: '12 weeks',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    curriculum: [
      'HTML, CSS & JavaScript Fundamentals',
      'React.js & Modern Frontend',
      'Node.js & Express Backend',
      'Database Design with MongoDB',
      'Authentication & Security',
      'Deployment & DevOps'
    ],
    requirements: [
      'Basic programming knowledge',
      'Computer with internet connection',
      'Passion for learning'
    ],
    learningOutcomes: [
      'Build complete web applications',
      'Master React and Node.js',
      'Deploy to production',
      'Work with databases'
    ],
    enrolledStudents: 234,
    rating: 4.8,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Data Science & Machine Learning',
    description: 'Learn Python, data analysis, and machine learning algorithms',
    instructor: 'Happiness Owele',
    instructorId: 'staff-2',
    price: 150000,
    category: 'Data Science',
    level: 'Advanced',
    duration: '16 weeks',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    curriculum: [
      'Python Programming',
      'Data Analysis with Pandas',
      'Machine Learning Algorithms',
      'Deep Learning with TensorFlow',
      'Real-world Projects'
    ],
    requirements: [
      'Strong mathematical background',
      'Python basics',
      'Statistical knowledge'
    ],
    learningOutcomes: [
      'Build ML models',
      'Analyze complex datasets',
      'Deploy AI solutions'
    ],
    enrolledStudents: 189,
    rating: 4.9,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps for iOS and Android',
    instructor: 'HRM Iniubong Udofot',
    instructorId: 'staff-3',
    price: 120000,
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '10 weeks',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    curriculum: [
      'React Native Basics',
      'Navigation & State Management',
      'Native Modules',
      'App Deployment'
    ],
    requirements: [
      'JavaScript knowledge',
      'React basics'
    ],
    learningOutcomes: [
      'Build mobile apps',
      'Publish to app stores',
      'Integrate native features'
    ],
    enrolledStudents: 156,
    rating: 4.7,
    isFeatured: true
  },
  {
    id: '4',
    title: 'UI/UX Design Masterclass',
    description: 'Master design principles and create stunning user experiences',
    instructor: 'Idris Muhammed Hafeez',
    instructorId: 'staff-4',
    price: 100000,
    category: 'Design',
    level: 'Beginner',
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    curriculum: [
      'Design Principles',
      'Figma & Design Tools',
      'User Research',
      'Prototyping',
      'Portfolio Building'
    ],
    requirements: [
      'Creative mindset',
      'No prior experience needed'
    ],
    learningOutcomes: [
      'Create beautiful designs',
      'Build a portfolio',
      'Land design jobs'
    ],
    enrolledStudents: 312,
    rating: 4.9,
    isFeatured: false
  },
  {
    id: '5',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn to protect systems and networks from cyber threats',
    instructor: 'David Brown',
    instructorId: 'staff-5',
    price: 130000,
    category: 'Security',
    level: 'Intermediate',
    duration: '12 weeks',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    curriculum: [
      'Network Security',
      'Ethical Hacking',
      'Cryptography',
      'Security Tools',
      'Incident Response'
    ],
    requirements: [
      'Basic networking knowledge',
      'Linux basics'
    ],
    learningOutcomes: [
      'Secure networks',
      'Perform security audits',
      'Respond to threats'
    ],
    enrolledStudents: 145,
    rating: 4.8,
    isFeatured: false
  },
  {
    id: '6',
    title: 'Digital Marketing Mastery',
    description: 'Master SEO, social media, and online advertising',
    instructor: 'Lawal Esther',
    instructorId: 'staff-6',
    price: 100000,
    category: 'Marketing',
    level: 'Beginner',
    duration: '6 weeks',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    curriculum: [
      'SEO Fundamentals',
      'Social Media Marketing',
      'Google Ads',
      'Content Strategy',
      'Analytics & Metrics'
    ],
    requirements: [
      'No prior experience needed'
    ],
    learningOutcomes: [
      'Run marketing campaigns',
      'Grow online presence',
      'Measure ROI'
    ],
    enrolledStudents: 278,
    rating: 4.6,
    isFeatured: false
  },
  {
    id: '7',
    title: 'Graphic Design',
    description: 'Learn professional graphic design with Adobe Creative Suite',
    instructor: 'Abraham Emmanuel',
    instructorId: 'staff-7',
    price: 100000,
    category: 'Design',
    level: 'Beginner',
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    curriculum: [
      'Design Fundamentals',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Typography',
      'Branding & Identity',
      'Portfolio Development'
    ],
    requirements: [
      'Creative mindset',
      'No prior experience needed'
    ],
    learningOutcomes: [
      'Create professional designs',
      'Master Adobe tools',
      'Build a design portfolio',
      'Work with clients'
    ],
    enrolledStudents: 198,
    rating: 4.7,
    isFeatured: false
  }
];

export const mockStaff: Staff[] = [
  {
    id: 'staff-1',
    name: 'Dr. Chukwuemeka Okonkwo',
    position: 'Senior Full Stack Instructor & Head of Web Development',
    bio: 'Dr. Chukwuemeka has over 15 years of experience in web development and has taught thousands of students. He holds a PhD in Computer Science and has worked with major tech companies including Microsoft and Google.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript', 'Docker', 'AWS'],
    email: 'c.okonkwo@megatech.com',
    social: {
      linkedin: 'https://linkedin.com/in/chukwuemeka-okonkwo',
      twitter: 'https://twitter.com/chukwuemeka_dev',
      github: 'https://github.com/chukwuemeka-okonkwo'
    }
  },
  {
    id: 'staff-2',
    name: 'Dr. Aisha Babangida',
    position: 'Data Science Lead & AI Research Director',
    bio: 'Dr. Aisha specializes in machine learning and has published over 30 research papers. She has worked on AI projects for Fortune 500 companies and led data science teams at Amazon and IBM.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'Data Analysis', 'R'],
    email: 'a.babangida@megatech.com',
    social: {
      linkedin: 'https://linkedin.com/in/aisha-babangida',
      github: 'https://github.com/aisha-babangida'
    }
  },
  {
    id: 'staff-3',
    name: 'Oluwaseun Adebayo',
    position: 'Mobile Development Expert & iOS Specialist',
    bio: 'Oluwaseun has built over 80 mobile applications for clients worldwide. He is a certified iOS developer and React Native expert with 12 years of experience in mobile app development.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    skills: ['React Native', 'iOS', 'Swift', 'Android', 'Flutter', 'Kotlin', 'Firebase'],
    email: 'o.adebayo@megatech.com',
    social: {
      linkedin: 'https://linkedin.com/in/oluwaseun-adebayo',
      twitter: 'https://twitter.com/seun_mobile',
      github: 'https://github.com/oluwaseun-adebayo'
    }
  },
  {
    id: 'staff-4',
    name: 'Ngozi Eze',
    position: 'UI/UX Design Director & Product Designer',
    bio: 'Ngozi is passionate about creating beautiful, user-friendly designs. She has worked with top design agencies and has won multiple awards for her innovative design work.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping', 'Design Systems', 'UI/UX'],
    email: 'n.eze@megatech.com',
    social: {
      linkedin: 'https://linkedin.com/in/ngozi-eze',
      twitter: 'https://twitter.com/ngozi_designs'
    }
  },
  {
    id: 'staff-5',
    name: 'Ibrahim Musa',
    position: 'Cybersecurity Specialist & Ethical Hacker',
    bio: 'Ibrahim has 15+ years in cybersecurity and ethical hacking. He is a certified CISSP, CEH, and OSCP holder who has helped secure systems for banks and government agencies.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    skills: ['Penetration Testing', 'Network Security', 'Cryptography', 'Ethical Hacking', 'Security Auditing', 'Kali Linux'],
    email: 'i.musa@megatech.com',
    social: {
      linkedin: 'https://linkedin.com/in/ibrahim-musa',
      github: 'https://github.com/ibrahim-musa'
    }
  },
  {
    id: 'staff-6',
    name: 'Funmilayo Ogunleye',
    position: 'Digital Marketing Strategist & SEO Expert',
    bio: 'Funmilayo helps businesses grow their online presence with proven digital marketing strategies. She has managed campaigns for over 100 brands and generated millions in revenue.',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    skills: ['SEO', 'SEM', 'Social Media Marketing', 'Google Ads', 'Content Marketing', 'Email Marketing', 'Analytics'],
    email: 'f.ogunleye@megatech.com',
    social: {
      linkedin: 'https://linkedin.com/in/funmilayo-ogunleye',
      twitter: 'https://twitter.com/funmi_marketing'
    }
  },
  {
    id: 'staff-7',
    name: 'Chidinma Nwosu',
    position: 'Cloud Computing & DevOps Engineer',
    bio: 'Chidinma specializes in cloud infrastructure and DevOps practices. She is AWS and Azure certified and has helped numerous companies migrate to the cloud successfully.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins', 'DevOps'],
    email: 'c.nwosu@megatech.com',
    social: {
      linkedin: 'https://linkedin.com/in/chidinma-nwosu',
      github: 'https://github.com/chidinma-nwosu'
    }
  },
  {
    id: 'staff-8',
    name: 'Yusuf Abdullahi',
    position: 'Blockchain Developer & Smart Contract Specialist',
    bio: 'Yusuf is a pioneer in blockchain technology with expertise in Ethereum, Solidity, and DeFi applications. He has developed smart contracts for multiple successful blockchain projects.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    skills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'Blockchain', 'DeFi', 'NFTs'],
    email: 'y.abdullahi@megatech.com',
    social: {
      linkedin: 'https://linkedin.com/in/yusuf-abdullahi',
      github: 'https://github.com/yusuf-abdullahi',
      twitter: 'https://twitter.com/yusuf_blockchain'
    }
  },
  {
    id: 'staff-9',
    name: 'Blessing Okoro',
    position: 'Database Administrator & Backend Architect',
    bio: 'Blessing has extensive experience in database design and backend architecture. She has optimized databases handling billions of records for major e-commerce platforms.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL', 'Database Design', 'Redis', 'Performance Tuning'],
    email: 'b.okoro@megatech.com',
    social: {
      linkedin: 'https://linkedin.com/in/blessing-okoro',
      github: 'https://github.com/blessing-okoro'
    }
  },
  {
    id: 'staff-10',
    name: 'Emeka Okafor',
    position: 'Game Development & Unity Instructor',
    bio: 'Emeka is a passionate game developer with 10+ years of experience. He has published multiple successful games on Steam and mobile app stores.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    skills: ['Unity', 'C#', 'Game Design', 'Unreal Engine', '3D Modeling', 'Animation', 'VR/AR'],
    email: 'e.okafor@megatech.com',
    social: {
      linkedin: 'https://linkedin.com/in/emeka-okafor',
      twitter: 'https://twitter.com/emeka_gamedev',
      github: 'https://github.com/emeka-okafor'
    }
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Education',
    excerpt: 'Discover how artificial intelligence is transforming the learning experience.',
    content: 'Full article content here...',
    author: 'Jane Smith',
    date: '2026-02-20',
    category: 'Tech Updates',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    tags: ['AI', 'Education', 'Technology']
  },
  {
    id: '2',
    title: 'New Web Development Bootcamp Starting March',
    excerpt: 'Join our intensive 12-week program and become a professional developer.',
    content: 'Full article content here...',
    author: 'John Doe',
    date: '2026-02-18',
    category: 'Announcements',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    tags: ['Bootcamp', 'Web Development', 'Announcement']
  },
  {
    id: '3',
    title: '10 Tips for Aspiring Data Scientists',
    excerpt: 'Expert advice to kickstart your data science career.',
    content: 'Full article content here...',
    author: 'Jane Smith',
    date: '2026-02-15',
    category: 'Articles',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Data Science', 'Career', 'Tips']
  }
];

export const mockGallery: GalleryItem[] = [
  {
    id: '1',
    title: 'Entrance into MegaTech HQ',
    category: 'workshops',
    type: 'image',
    url: 'src/assets/entrance.jpeg',
    date: '2026-07-04'
  },
  {
    id: '2',
    title: 'Front-Desk',
    category: 'trainings',
    type: 'image',
    url: '/src/assets/frontdesk.jpeg',
    date: '2026-07-04'
  },
  {
    id: '3',
    title: 'Management Office',
    category: 'conferences',
    type: 'image',
    url: '/src/assets/mng office.jpeg',
    date: '2026-07-04'
  },
  {
    id: '4',
    title: 'Computer Room',
    category: 'trainings',
    type: 'image',
    url: '/src/assets/cmp room.jpeg',
    date: '2026-07-04'
  },
  {
    id: '5',
    title: 'Confrence Room',
    category: 'conferences',
    type: 'image',
    url: '/src/assets/con room.jpeg',
    date: '2026-07-04'
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    studentId: 'student-1',
    studentName: 'Alex Johnson',
    courseId: '1',
    courseName: 'Full Stack Web Development',
    issueDate: '2025-12-15',
    certificateNumber: 'MT-2025-001234',
    status: 'valid'
  },
  {
    id: '2',
    studentId: 'student-1',
    studentName: 'Alex Johnson',
    courseId: '4',
    courseName: 'UI/UX Design Masterclass',
    issueDate: '2025-11-20',
    certificateNumber: 'MT-2025-001156',
    status: 'valid'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    studentId: 'student-1',
    courseId: '1',
    amount: 49999,
    date: '2025-09-01',
    status: 'confirmed',
    method: 'Bank Transfer'
  },
  {
    id: '2',
    studentId: 'student-1',
    courseId: '4',
    amount: 39999,
    date: '2025-10-15',
    status: 'confirmed',
    method: 'Card'
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    studentId: 'student-1',
    courseId: '1',
    enrolledDate: '2025-09-01',
    progress: 85,
    status: 'active'
  },
  {
    id: '2',
    studentId: 'student-1',
    courseId: '4',
    enrolledDate: '2025-10-15',
    progress: 100,
    status: 'completed'
  },
  {
    id: '3',
    studentId: 'student-1',
    courseId: '2',
    enrolledDate: '2026-01-10',
    progress: 45,
    status: 'active'
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Build a React Todo App',
    description: 'Create a fully functional todo application using React hooks',
    dueDate: '2026-03-01',
    status: 'submitted',
    grade: 92,
    submittedDate: '2026-02-28'
  },
  {
    id: '2',
    courseId: '1',
    title: 'Node.js REST API Project',
    description: 'Build a RESTful API with authentication',
    dueDate: '2026-03-15',
    status: 'pending'
  },
  {
    id: '3',
    courseId: '2',
    title: 'Data Analysis Project',
    description: 'Analyze a dataset and create visualizations',
    dueDate: '2026-03-10',
    status: 'pending'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Python Programming E-Book',
    type: 'ebook',
    price: 2999,
    description: 'Comprehensive guide to Python programming',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop'
  },
  {
    id: '2',
    name: 'Web Development Study Materials',
    type: 'material',
    price: 1999,
    description: 'Complete study pack with exercises and solutions',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop'
  },
  {
    id: '3',
    name: 'JavaScript Mastery Course',
    type: 'course',
    price: 29999,
    description: 'From basics to advanced JavaScript concepts',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=600&fit=crop'
  }
];