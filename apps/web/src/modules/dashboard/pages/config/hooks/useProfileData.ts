// hooks/useProfileData.ts
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import Toasts from "@/lib/toast";

export function useProfileData() {
  const [profileData, setProfileData] = useState<{
    profileName: string;
    email: string;
    profileImage: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/users/profile");
        setProfileData(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        Toasts.show("Erro ao carregar dados do perfil.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return { profileData, isLoading };
}
