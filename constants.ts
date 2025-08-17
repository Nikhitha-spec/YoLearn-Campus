
import React from 'react';
import { User, Skill, SkillType, SkillLevel, Badge, Notification, ForumQuestion, Match, MatchStatus, Answer } from './components/types';
import { BookIcon, CodeIcon, FirstAidIcon, MusicIcon, LanguageIcon, MentorIcon, StarIcon, UsersIcon } from './components/Icons';

export const YOLearnLogoURL = 'https://res.cloudinary.com/darm86u7g/image/upload/v1755411179/YoLearn_Campus_Logo_Design_oam3lz.png';

export const DEPARTMENTS = [
    "Computer Science",
    "Fine Arts",
    "Music",
    "Linguistics",
    "Kinesiology",
    "Business",
    "Engineering",
    "Humanities",
    "Natural Sciences",
    "Undeclared"
];

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Aditya Kumar',
    email: 'aditya.kumar@university.edu',
    password: 'password123',
    department: 'Computer Science',
    year: 3,
    bio: 'Aspiring full-stack developer. Love teaching Python and learning new languages. Let\'s connect!',
    profilePhoto: 'https://picsum.photos/seed/aditya/200',
    skillsCount: 5,
    badgesCount: 3,
    dateJoined: '2023-09-01T10:00:00Z',
    education: {
        degree: {
            institution: 'IIT Bombay',
            degreeName: 'B.Tech',
            major: 'Computer Science',
            cgpa: '8.8',
            about: 'Focusing on AI and machine learning. Part of the coding club and open-source contributor.',
        },
        intermediate: {
            institution: 'Delhi Public School, R.K. Puram',
            board: 'CBSE',
            cgpa: '95.6%',
        },
        schooling: {
            institution: 'Delhi Public School, R.K. Puram',
            board: 'CBSE',
            marks: '98.2%',
        }
    }
  },
  {
    id: 'user-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@university.edu',
    password: 'password123',
    department: 'Fine Arts',
    year: 2,
    bio: 'Digital artist and painter. I can teach you Procreate and Photoshop, and I want to learn guitar!',
    profilePhoto: 'https://picsum.photos/seed/priya/200',
    skillsCount: 3,
    badgesCount: 2,
    dateJoined: '2023-10-15T14:30:00Z',
    education: {
        degree: {
            institution: 'Sir J.J. Institute of Applied Art',
            degreeName: 'B.F.A.',
            major: 'Illustration',
            cgpa: '8.2',
            about: 'Specializing in digital illustration and character design. My work has been featured in the campus magazine.',
        },
        intermediate: {
            institution: 'St. Xavier\'s Collegiate School, Kolkata',
            board: 'ISC',
            cgpa: '92.0%',
        },
        schooling: {
            institution: 'St. Xavier\'s Collegiate School, Kolkata',
            board: 'ICSE',
            marks: '94.5%',
        }
    }
  },
  {
    id: 'user-3',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@university.edu',
    password: 'password123',
    department: 'Music',
    year: 4,
    bio: 'Guitar enthusiast and music theory nerd. Happy to teach chords, scales, and song structure.',
    profilePhoto: 'https://picsum.photos/seed/rohan/200',
    skillsCount: 8,
    badgesCount: 5,
    dateJoined: '2022-08-20T11:00:00Z',
    education: {
        degree: {
            institution: 'Whistling Woods International',
            degreeName: 'B.A. in Music',
            major: 'Performance',
            cgpa: '9.1',
            about: 'Lead guitarist in a campus band. My main focus is on rock and blues fusion.',
        },
        intermediate: {
            institution: 'The Doon School, Dehradun',
            board: 'ISC',
            cgpa: '88.5%',
        },
        schooling: {
            institution: 'The Doon School, Dehradun',
            board: 'ICSE',
            marks: '91.0%',
        }
    }
  },
   {
    id: 'user-4',
    name: 'Anjali Rao',
    email: 'anjali.rao@university.edu',
    password: 'password123',
    department: 'Linguistics',
    year: 2,
    bio: 'Polyglot in training. I can teach Spanish and French, and I\'m looking to learn Japanese.',
    profilePhoto: 'https://picsum.photos/seed/anjali/200',
    skillsCount: 4,
    badgesCount: 2,
    dateJoined: '2024-01-10T09:00:00Z',
    education: {
        degree: {
            institution: 'Jawaharlal Nehru University (JNU)',
            degreeName: 'B.A. (Hons)',
            major: 'Linguistics',
            cgpa: '7.9',
            about: 'Exploring the intersection of language and culture. Secretary of the debate club.',
        },
        intermediate: {
            institution: 'Bombay Scottish School, Mahim',
            board: 'ISC',
            cgpa: '94.2%',
        },
        schooling: {
            institution: 'Bombay Scottish School, Mahim',
            board: 'ICSE',
            marks: '96.8%',
        }
    }
  },
   {
    id: 'user-5',
    name: 'Vikram Singh',
    email: 'vikram.singh@university.edu',
    password: 'password123',
    department: 'Kinesiology',
    year: 3,
    bio: 'Certified first-aid instructor and fitness coach. Let me teach you life-saving skills!',
    profilePhoto: 'https://picsum.photos/seed/vikram/200',
    skillsCount: 2,
    badgesCount: 4,
    dateJoined: '2023-02-18T18:00:00Z',
    education: {
        degree: {
            institution: 'Manipal University',
            degreeName: 'B.Sc.',
            major: 'Kinesiology',
            cgpa: '8.5',
            about: 'Passionate about sports science and rehabilitation. Captain of the university cricket team.',
        },
        intermediate: {
            institution: 'Bishop Cotton Boys\' School, Bangalore',
            board: 'ISC',
            cgpa: '90.5%',
        },
        schooling: {
            institution: 'Bishop Cotton Boys\' School, Bangalore',
            board: 'ICSE',
            marks: '93.0%',
        }
    }
  }
];

export const MOCK_SKILLS: Skill[] = [
  // Technology
  {
    id: 'skill-6',
    user: MOCK_USERS[0],
    skillName: 'React State Management',
    skillType: SkillType.TEACH,
    category: 'Technology',
    level: SkillLevel.ADVANCED,
    description: 'Deep dive into React hooks, Context API, and an introduction to state management libraries like Redux Toolkit.',
    datePosted: '2024-05-05T14:00:00Z',
  },
  {
    id: 'skill-tech-2',
    user: MOCK_USERS[0],
    skillName: 'Python for Data Science',
    skillType: SkillType.TEACH,
    category: 'Technology',
    level: SkillLevel.INTERMEDIATE,
    description: 'Learn the fundamentals of data analysis and visualization in Python using libraries like Pandas, Matplotlib, and Seaborn.',
    datePosted: '2024-05-16T10:00:00Z',
  },
  {
    id: 'skill-tech-3',
    user: MOCK_USERS[3],
    skillName: 'Intro to UI/UX Design',
    skillType: SkillType.LEARN,
    category: 'Technology',
    level: SkillLevel.BEGINNER,
    description: 'I want to learn the basics of UI/UX design, including wireframing, prototyping, and user research. Anyone available to mentor?',
    datePosted: '2024-05-15T11:00:00Z',
  },
  // Art & Design
  {
    id: 'skill-2',
    user: MOCK_USERS[1],
    skillName: 'Introduction to Procreate',
    skillType: SkillType.TEACH,
    category: 'Art & Design',
    level: SkillLevel.BEGINNER,
    description: 'I\'ll walk you through the Procreate interface, basic brushes, layers, and creating your first digital illustration.',
    datePosted: '2024-05-09T15:20:00Z',
  },
  {
    id: 'skill-art-2',
    user: MOCK_USERS[1],
    skillName: 'Digital Photography Basics',
    skillType: SkillType.TEACH,
    category: 'Art & Design',
    level: SkillLevel.BEGINNER,
    description: 'Understand your DSLR or mirrorless camera. Learn about aperture, shutter speed, ISO, and basic composition techniques.',
    datePosted: '2024-05-14T18:00:00Z',
  },
  {
    id: 'skill-art-3',
    user: MOCK_USERS[2],
    skillName: 'Adobe Illustrator Fundamentals',
    skillType: SkillType.LEARN,
    category: 'Art & Design',
    level: SkillLevel.BEGINNER,
    description: 'Looking for someone to teach me the pen tool, pathfinder, and other core concepts of Adobe Illustrator for logo design.',
    datePosted: '2024-05-13T12:00:00Z',
  },
  // Music
  {
    id: 'skill-1',
    user: MOCK_USERS[2],
    skillName: 'Acoustic Guitar Basics',
    skillType: SkillType.TEACH,
    category: 'Music',
    level: SkillLevel.BEGINNER,
    description: 'Learn the basic chords, strumming patterns, and how to play your first song on the acoustic guitar.',
    datePosted: '2024-05-10T12:00:00Z',
  },
  {
    id: 'skill-7',
    user: MOCK_USERS[1],
    skillName: 'Learn to play the Ukulele',
    skillType: SkillType.LEARN,
    category: 'Music',
    level: SkillLevel.BEGINNER,
    description: 'I have a ukulele but don\'t know where to start! Anyone can teach me the basics?',
    datePosted: '2024-05-04T10:00:00Z',
  },
   {
    id: 'skill-music-3',
    user: MOCK_USERS[2],
    skillName: 'Music Production with Ableton',
    skillType: SkillType.TEACH,
    category: 'Music',
    level: SkillLevel.INTERMEDIATE,
    description: 'Let\'s create a track from scratch. I\'ll cover MIDI, audio recording, and basic mixing techniques in Ableton Live.',
    datePosted: '2024-05-12T20:00:00Z',
  },
  // Languages
  {
    id: 'skill-3',
    user: MOCK_USERS[0],
    skillName: 'Japanese Conversation Practice',
    skillType: SkillType.LEARN,
    category: 'Languages',
    level: SkillLevel.INTERMEDIATE,
    description: 'Looking for a native or fluent speaker to practice conversational Japanese with me. I can help with English in return!',
    datePosted: '2024-05-08T09:00:00Z',
  },
  {
    id: 'skill-4',
    user: MOCK_USERS[3],
    skillName: 'Spanish for Beginners',
    skillType: SkillType.TEACH,
    category: 'Languages',
    level: SkillLevel.BEGINNER,
    description: 'Hola! Let\'s cover the basics of Spanish, from greetings to simple sentence structures.',
    datePosted: '2024-05-07T18:45:00Z',
  },
  {
    id: 'skill-lang-3',
    user: MOCK_USERS[3],
    skillName: 'Beginner German',
    skillType: SkillType.TEACH,
    category: 'Languages',
    level: SkillLevel.BEGINNER,
    description: 'Guten Tag! I can teach basic German grammar, vocabulary, and common phrases for travel or daily conversation.',
    datePosted: '2024-05-11T16:00:00Z',
  },
  // Health & Wellness
   {
    id: 'skill-5',
    user: MOCK_USERS[4],
    skillName: 'CPR & First-Aid Certification Prep',
    skillType: SkillType.TEACH,
    category: 'Health & Wellness',
    level: SkillLevel.INTERMEDIATE,
    description: 'I am a certified instructor and can help you prepare for your CPR and First-Aid exam.',
    datePosted: '2024-05-06T11:30:00Z',
  },
  {
    id: 'skill-health-2',
    user: MOCK_USERS[4],
    skillName: 'Yoga for Stress Relief',
    skillType: SkillType.TEACH,
    category: 'Health & Wellness',
    level: SkillLevel.BEGINNER,
    description: 'Unwind and de-stress with a gentle yoga session. We will focus on breathing techniques and simple poses. No experience needed!',
    datePosted: '2024-05-15T08:00:00Z',
  },
   {
    id: 'skill-health-3',
    user: MOCK_USERS[0],
    skillName: 'Basics of Nutrition',
    skillType: SkillType.LEARN,
    category: 'Health & Wellness',
    level: SkillLevel.BEGINNER,
    description: 'Want to learn about macronutrients, calorie tracking, and building a healthy meal plan. Looking for a kinesiology or nutrition student to guide me.',
    datePosted: '2024-05-14T21:00:00Z',
  },
];

export const MOCK_LEADERBOARD = [
    { user: MOCK_USERS[2], points: 2450 },
    { user: MOCK_USERS[0], points: 2100 },
    { user: MOCK_USERS[4], points: 1980 },
    { user: MOCK_USERS[1], points: 1750 },
    { user: MOCK_USERS[3], points: 1500 },
];

export const MOCK_BADGES: Badge[] = [
  {
    id: 'badge-1',
    name: 'First Step',
    icon: React.createElement(StarIcon),
    dateAwarded: '2023-09-15T10:00:00Z',
  },
  {
    id: 'badge-2',
    name: 'Code Wizard',
    icon: React.createElement(CodeIcon),
    dateAwarded: '2023-11-20T14:30:00Z',
  },
  {
    id: 'badge-3',
    name: 'Mentor',
    icon: React.createElement(MentorIcon),
    dateAwarded: '2024-01-10T11:00:00Z',
  },
  {
    id: 'badge-4',
    name: 'Polyglot',
    icon: React.createElement(LanguageIcon),
    dateAwarded: '2024-02-22T09:00:00Z',
  },
  {
    id: 'badge-5',
    name: 'Bookworm',
    icon: React.createElement(BookIcon),
    dateAwarded: '2024-03-18T18:00:00Z',
  },
  {
    id: 'badge-6',
    name: 'Maestro',
    icon: React.createElement(MusicIcon),
    dateAwarded: '2024-04-05T12:00:00Z',
  },
  {
    id: 'badge-7',
    name: 'Savior',
    icon: React.createElement(FirstAidIcon),
    dateAwarded: '2024-05-01T16:45:00Z',
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'notif-1', text: 'Priya Sharma accepted your request to learn Procreate.', time: '2h ago', read: false },
    { id: 'notif-2', text: 'You have an incoming request from Aditya Kumar for "Spanish for Beginners".', time: '1d ago', read: false },
    { id: 'notif-3', text: 'Reminder: Your session "Acoustic Guitar Basics" with Rohan Mehta is tomorrow.', time: '3d ago', read: true },
    { id: 'notif-4', text: 'Welcome to YoLearn! Post a skill to get started.', time: '5d ago', read: true },
];

const mockAnswers: Answer[] = [
    {
        id: 'ans-1',
        content: 'For smaller projects, Context API is great! It\'s built-in, so no extra libraries. For larger, more complex apps, Redux is more scalable and has better dev tools.',
        author: MOCK_USERS[3],
        datePosted: '2024-05-12T11:00:00Z',
    },
    {
        id: 'ans-2',
        content: 'I agree with Rohan. Start with Context for sure. You can always migrate to Redux or Zustand later if you need to.',
        author: MOCK_USERS[4],
        datePosted: '2024-05-12T11:30:00Z',
    }
];

export const MOCK_FORUM_QUESTIONS: ForumQuestion[] = [
    {
        id: 'q-1',
        title: 'How do you manage state in large React applications?',
        content: 'I\'m working on a project and my state is getting really messy with useState. I\'ve heard about Context API and Redux but not sure which one to choose. What are the pros and cons?',
        author: MOCK_USERS[0],
        tags: ['react', 'javascript', 'state-management'],
        datePosted: '2024-05-12T10:30:00Z',
        answers: mockAnswers,
    },
    {
        id: 'q-2',
        title: 'Best way to learn music theory for a beginner guitarist?',
        content: 'I know the basic chords but I want to understand the "why" behind them. Any good resources (books, websites, videos) for learning music theory from scratch?',
        author: MOCK_USERS[2],
        tags: ['music', 'guitar', 'theory'],
        datePosted: '2024-05-11T18:00:00Z',
        answers: [],
    },
    {
        id: 'q-3',
        title: 'Tips for getting started with digital art on a budget?',
        content: 'I really want to get into digital painting but can\'t afford an expensive tablet or software right now. Are there any good free alternatives to Procreate or Photoshop? What about affordable drawing tablets?',
        author: MOCK_USERS[1],
        tags: ['art', 'digital-art', 'budget'],
        datePosted: '2024-05-10T14:15:00Z',
        answers: [],
    }
];

export const MOCK_MATCHES: Match[] = [
    {
        id: 'match-1',
        learner: MOCK_USERS[0],
        mentor: MOCK_USERS[1],
        skill: MOCK_SKILLS[3], // Introduction to Procreate
        status: MatchStatus.ACCEPTED,
        requestMessage: 'Hi Priya, I love your art style and would be thrilled to learn Procreate from you!',
        scheduledTime: '2024-05-25T16:00:00Z',
        dateRequested: '2024-05-13T10:00:00Z',
        dateUpdated: '2024-05-13T18:00:00Z',
    },
    {
        id: 'match-6',
        learner: MOCK_USERS[1],
        mentor: MOCK_USERS[0],
        skill: MOCK_SKILLS[0], // React State Management
        status: MatchStatus.ACCEPTED,
        requestMessage: 'Your React deep dive sounds amazing, I\'d love to schedule a session!',
        scheduledTime: '2024-05-28T18:00:00Z',
        dateRequested: '2024-05-15T12:00:00Z',
        dateUpdated: '2024-05-16T09:30:00Z',
    },
    {
        id: 'match-3',
        learner: MOCK_USERS[1],
        mentor: MOCK_USERS[0],
        skill: MOCK_SKILLS[0], // React State Management
        status: MatchStatus.PENDING,
        requestMessage: 'Hi Aditya, I need some help understanding React hooks for a project. Could you help me?',
        dateRequested: '2024-05-14T09:00:00Z',
        dateUpdated: '2024-05-14T09:00:00Z',
    },
     {
        id: 'match-7',
        learner: MOCK_USERS[3],
        mentor: MOCK_USERS[0],
        skill: MOCK_SKILLS[0], // React State Management
        status: MatchStatus.PENDING,
        requestMessage: 'Hey Aditya, I saw you teach React. I\'m struggling with hooks. Can you help?',
        dateRequested: '2024-05-15T14:00:00Z',
        dateUpdated: '2024-05-15T14:00:00Z',
    },
    {
        id: 'match-8',
        learner: MOCK_USERS[0],
        mentor: MOCK_USERS[2],
        skill: MOCK_SKILLS[6], // Acoustic Guitar Basics
        status: MatchStatus.PENDING,
        requestMessage: 'Hey Rohan, I\'ve always wanted to learn guitar. Your beginner course looks great!',
        dateRequested: '2024-05-15T16:00:00Z',
        dateUpdated: '2024-05-15T16:00:00Z',
    },
    {
        id: 'match-2',
        learner: MOCK_USERS[4],
        mentor: MOCK_USERS[2],
        skill: MOCK_SKILLS[6], // Acoustic Guitar Basics
        status: MatchStatus.PENDING,
        requestMessage: 'Hey Rohan, I\'m a total beginner with the guitar. Your course looks perfect!',
        dateRequested: '2024-05-14T11:20:00Z',
        dateUpdated: '2024-05-14T11:20:00Z',
    },
    {
        id: 'match-4',
        learner: MOCK_USERS[3],
        mentor: MOCK_USERS[0],
        skill: MOCK_SKILLS[0], // React State Management
        status: MatchStatus.DECLINED,
        requestMessage: 'React help please!',
        dateRequested: '2024-05-12T15:00:00Z',
        dateUpdated: '2024-05-13T09:00:00Z',
    },
     {
        id: 'match-5',
        learner: MOCK_USERS[2],
        mentor: MOCK_USERS[4],
        skill: MOCK_SKILLS[12], // CPR & First-Aid
        status: MatchStatus.COMPLETED,
        requestMessage: 'I need to get my First-Aid cert, can you help me prep?',
        dateRequested: '2024-04-20T10:00:00Z',
        dateUpdated: '2024-04-28T17:00:00Z',
    },
];