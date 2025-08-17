
export interface Degree {
  institution: string;
  degreeName: string;
  major: string;
  cgpa: string;
  about: string;
}

export interface Intermediate {
  institution: string;
  board: string;
  cgpa: string;
}

export interface Schooling {
  institution: string;
  board: string;
  marks: string;
}

export interface Education {
  degree: Degree;
  intermediate: Intermediate;
  schooling: Schooling;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  department: string;
  year: number;
  bio: string;
  profilePhoto: string;
  skillsCount: number;
  badgesCount: number;
  dateJoined: string;
  education: Education;
}

export enum SkillType {
  TEACH = 'teach',
  LEARN = 'learn',
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert',
}

export interface Skill {
  id: string;
  user: User;
  skillName: string;
  skillType: SkillType;
  category: string;
  level: SkillLevel;
  description: string;
  datePosted: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: JSX.Element;
  dateAwarded: string;
}

export interface Notification {
  id: string;
  text: string;
  time: string;
  read: boolean;
}

export interface Answer {
  id: string;
  content: string;
  author: User;
  datePosted: string;
}

export interface ForumQuestion {
  id: string;
  title: string;
  content: string;
  author: User;
  tags: string[];
  datePosted: string;
  answers: Answer[];
}

export enum MatchStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    COMPLETED = 'completed',
}

export interface Match {
    id: string;
    learner: User;
    mentor: User;
    skill: Skill;
    status: MatchStatus;
    requestMessage?: string;
    scheduledTime?: string;
    dateRequested: string;
    dateUpdated: string;
}

export type Page = 'dashboard' | 'profile' | 'matches' | 'notifications' | 'community' | 'settings' | 'liveSession' | 'questionDetail';