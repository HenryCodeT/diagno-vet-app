// ============================================
// AUTH DTOs - Request/Response types
// ============================================

// --- Request DTOs (Frontend -> API) ---

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// --- Response DTOs (API -> Frontend) ---

export interface UserDto {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  language: string;
  onboarding: boolean;
}

export interface AuthResponseDto {
  user: UserDto;
  accessToken?: string;
}

// --- Session types (NextAuth) ---

export interface SessionUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  language: string;
  onboarding: boolean;
}
