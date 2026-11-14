import { apiClient } from "@api/apiClient";
import { User } from "@shared/store/useAuthStore";

export const profileApi = {
  me: async () => {
    const res = await apiClient.get<{ success: boolean; data: User }>(
      "/users/me",
    );
    return res.data.data;
  },
  updateMe: async (patch: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => {
    const res = await apiClient.patch<{ success: boolean; data: User }>(
      "/users/me",
      patch,
    );
    return res.data.data;
  },
  changePassword: async (payload: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const res = await apiClient.post("/users/me/change-password", payload);
    return res.data;
  },
  deleteAccount: async (password: string) => {
    const res = await apiClient.delete<{
      success: boolean;
      data: { message: string };
    }>("/users/me", { data: { password } });
    return res.data.data;
  },
  /**
   * Builds a backup of the store's data server-side and emails it. Slow by
   * nature (the server zips the whole dataset), hence the long timeout.
   */
  emailBackup: async () => {
    const res = await apiClient.post<{
      success: boolean;
      data: { emailedTo: string; fileName: string; sizeBytes: number };
    }>("/backup/email", undefined, { timeout: 180_000 });
    return res.data.data;
  },
  /** Runs the nightly full backup now, to wherever the server sends it. */
  runFullBackup: async () => {
    const res = await apiClient.post<{
      success: boolean;
      data: { destination: string; fileName: string; sizeBytes: number };
    }>("/backup/run", undefined, { timeout: 300_000 });
    return res.data.data;
  },
};
