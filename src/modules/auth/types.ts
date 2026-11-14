import { User, Organization } from "@shared/store/useAuthStore";

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    organization: Organization;
    accessToken: string;
    refreshToken: string;
  };
}

export interface MessageResponse {
  success: boolean;
  data: { message: string };
}

export interface LoginPayload {
  email: string;
  password: string;
  /** Ends the user's other sessions so this device can take a slot. */
  signOutOthers?: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  password: string;
}

/** One signed-in device. The refresh token itself is never sent to the client. */
export interface DeviceSession {
  id: string;
  deviceName: string;
  userAgent: string;
  ip: string;
  lastSeenAt: string;
  createdAt: string;
  /** True for the device making the request. */
  current: boolean;
}

export interface SessionList {
  /** Devices allowed at once — set on the server (MAX_DEVICES_PER_USER). */
  limit: number;
  used: number;
  sessions: DeviceSession[];
}
