export interface AuthState {
  isAuthenticated: boolean;
  userEmail?: string;
}

export interface uploadFormData {
  title: string;
  description: string;
  category: string;
  file: File | null;
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_TYPES = ["image/png", "image/jpeg", "application/pdf", "text/plain"];

export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
