export type AcademyType = 'next_pro' | 'angels';

export type AgeCategory = 'u10' | 'u13' | 'u15' | 'u17' | 'free_age';

export type PlayerPosition = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  cleanSheets?: number;
}

export interface Player {
  _id: string;
  name: string;
  academy: AcademyType;
  category: AgeCategory;
  position: PlayerPosition;
  jerseyNumber: number;
  age: number;
  photoUrl: string;
  bio?: string;
  stats: PlayerStats;
  featured?: boolean;
  createdAt?: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  caption?: string;
  category: string;
  academy: 'all' | AcademyType;
  imageUrl: string;
  tags?: string[];
  createdAt?: string;
}

export interface CoachItem {
  _id: string;
  name: string;
  role: string;
  license: string;
  academy: 'all' | AcademyType;
  photoUrl: string;
  bio: string;
  experienceYears: number;
  whatsAppNumber: string;
}

export interface AlumniItem {
  _id: string;
  name: string;
  currentClub: string;
  league: string;
  country: string;
  graduationYear: number;
  position: string;
  academy: AcademyType;
  photoUrl: string;
  highlight: string;
  stats?: string;
}

export interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  summary?: string;
  content: string;
  coverImage: string;
  category?: string;
  academy: 'all' | AcademyType;
  author: string;
  date: string;
  featured?: boolean;
  createdAt?: string;
}

export interface MatchItem {
  _id: string;
  title?: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  academy: AcademyType;
  category: AgeCategory;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'completed' | 'live';
  homeScore?: number;
  awayScore?: number;
  competition: string;
  scorers?: string[];
  createdAt?: string;
}

export interface RegistrationItem {
  _id: string;
  playerName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  academyPreference: AcademyType;
  category: AgeCategory;
  parentName?: string;
  phone: string;
  email: string;
  address?: string;
  position: string;
  experience?: string;
  status: 'pending' | 'reviewed' | 'invited';
  paymentStatus?: 'unpaid' | 'paid' | 'failed' | 'pending';
  paymentAmount?: number;
  paymentTxRef?: string;
  paymentTransactionId?: string;
  paidAt?: string;
  createdAt: string;
}

export interface PaymentItem {
  _id: string;
  tx_ref: string;
  transaction_id: string;
  amount: number;
  currency: string;
  status: 'successful' | 'failed' | 'cancelled' | 'pending';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod?: string;
  registrationId?: string;
  createdAt: string;
}

export interface AdminUser {
  username: string;
  role: string;
  name: string;
}

