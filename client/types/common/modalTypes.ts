import { IImage } from "@/types/image/imageTypes";

export interface ConfirmActionModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isLoading?: boolean;
}

export interface EditImageModalProps {
  isOpen: boolean;
  image: IImage | null;
  onClose: () => void;
  onUpdated: (img: IImage) => void;
}
