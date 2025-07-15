export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  subject: 'biology' | 'physics' | 'chemistry';
  subscription_plan: 'basic' | 'premium' | 'pro';
  progress: number;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}