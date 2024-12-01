// components/ProfileImageUploader.tsx
import React, { useState } from "react";

interface ProfileImageUploaderProps {
  initialImage: string | null;
  onImageChange: (file: File | null) => void;
}

export default function ProfileImageUploader({
  initialImage,
  onImageChange,
}: ProfileImageUploaderProps) {
  const [previewImage, setPreviewImage] = useState(initialImage);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setPreviewImage(objectURL);
      onImageChange(file);
    }
  };

  return (
    <div className="flex items-center gap-6 mb-6">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 flex items-center text-center justify-center h-full">
            Sem Imagem
          </span>
        )}
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-2">
          Alterar Imagem de Perfil
        </label>
        <input
          type="file"
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}
