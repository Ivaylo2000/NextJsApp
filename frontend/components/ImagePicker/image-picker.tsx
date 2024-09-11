// components/ImagePicker/image-picker.tsx
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./image-picker.module.css";

interface ImagePickerProps {
  label: string;
  name: string;
  onImagePicked: (file: File) => void;
}

export default function ImagePicker({
  label,
  name,
  onImagePicked,
}: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const imageInput = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    imageInput.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setPickedImage(URL.createObjectURL(file)); // Use ObjectURL for preview
      onImagePicked(file); // Pass the file to the parent component
    }
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage ? (
            <p>No image picked yet.</p>
          ) : (
            <Image
              src={pickedImage as string}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          required
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
