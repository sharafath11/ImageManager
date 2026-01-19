import {  MultiImageValidationResult } from "@/types/image/imageTypes";

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; 


export const validateImageTitle = (title: string): string => {
  const trimmed = title.trim();
  if (!trimmed) return "Title is required";
  if (trimmed.length < 3) return "Title must be at least 3 characters";
  if (trimmed.length > 100) return "Title cannot exceed 100 characters";
  return "";
};

export const validateImageFile = (file: File): string => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Only PNG, JPEG, and WebP images are allowed";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "Image size must be less than 5MB";
  }
  return "";
};

export const validateMultiImageUpload = (images: { id: string, file: File, title: string }[]): MultiImageValidationResult => {
  const results: MultiImageValidationResult = {
    valid: true,
    errors: {}
  };

  if (images.length === 0) {
    results.valid = false;
    return results;
  }

  images.forEach(img => {
    const titleError = validateImageTitle(img.title);
    const fileError = validateImageFile(img.file);

    if (titleError || fileError) {
      results.valid = false;
      results.errors[img.id] = {
        ...(titleError && { title: titleError }),
        ...(fileError && { file: fileError })
      };
    }
  });

  return results;
};
