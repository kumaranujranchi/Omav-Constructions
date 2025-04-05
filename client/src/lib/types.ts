// Service-related types
export interface ServiceType {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  imageUrl: string;
}

// Blog post type
export interface BlogPostType {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl: string;
  date: string;
}

// Client solution type
export interface ClientSolutionType {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  features: string[];
  imageUrl: string;
}

// Process step type
export interface ProcessStepType {
  number: number;
  title: string;
  description: string;
  imageUrl: string;
}

// Resource item type
export interface ResourceItemType {
  id: string;
  title: string;
  description: string;
  type: 'calculator' | 'tracker' | 'article' | 'guide';
  icon: string;
  link: string;
}

// Testimonial type
export interface TestimonialType {
  id: number;
  text: string;
  author: string;
  position: string;
  rating?: number;
}
