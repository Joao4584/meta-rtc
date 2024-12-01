import React, { useState } from "react";
import { profileEditService } from "../services/profileEditService";
import useDelay from "@/hooks/useDelay";
import Toasts from "@/lib/toast";
import { Skeleton } from "@/modules/shared/ui/skeleton";
import { useProfileData } from "../hooks/useProfileData";
import ProfileImageUploader from "./ProfileImageUploader";
import ProfileForm from "./ProfileForm";

export default function ProfileComponent() {
  const { profileData, isLoading } = useProfileData();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { delay } = useDelay();

  const handleSubmit = async (data: { profileName: string; email: string }) => {
    setIsSubmitting(true);
    try {
      const response = await profileEditService({ ...data, profileImage: imageFile });
      await delay(600);
      Toasts.show("Usuário editado com sucesso!", "success", response.data.message);
    } catch (error) {
      console.error(error);
      Toasts.show("Erro ao editar perfil", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Skeleton />;

  return (
    <div className="flex-1 rounded-lg p-8">
      <h1 className="text-3xl font-semibold text-white mb-6">Meu Perfil</h1>
      <ProfileImageUploader
        initialImage={profileData?.profileImage || null}
        onImageChange={setImageFile}
      />
      <ProfileForm
        defaultValues={{
          profileName: profileData?.profileName || "",
          email: profileData?.email || "",
        }}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
}
