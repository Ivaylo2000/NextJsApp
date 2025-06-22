"use client";

import { useRef } from "react";
import styles from "./image-picker.module.css";
import CustomImage from "@/shared/Image";
interface ImagePickerProps {
  label: string;
  name: string;
  onImagePicked: (file: File) => void;
  pickedImage: string | ArrayBuffer | null;
  setPickedImage: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >;
  initialImage?: string | null;
}

export default function ImagePicker({
  label,
  name,
  onImagePicked,
  pickedImage,
  setPickedImage,
  initialImage = null,
}: ImagePickerProps) {
  const imageInput = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    imageInput.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPickedImage(objectUrl);
      onImagePicked(file);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }

  return (
    <div className={styles.picker}>
      <label className={styles.highlight} htmlFor={name}>
        {label}
      </label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && !initialImage ? (
            <p>No image picked yet.</p>
          ) : (
            <CustomImage
              src={(pickedImage as string) || initialImage!}
              alt="Selected image"
            />
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg, image/jpg"
          name={name}
          required={!pickedImage && !initialImage}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          className={styles.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
