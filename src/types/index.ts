export interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
  count: number;
  slug: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
  tags: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
