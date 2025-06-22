"use client";
import styles from "./EditProduct.module.css";
import Button from "@/shared/Button";
import { IProduct } from "../../interface/IProduct";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ImagePicker from "../ImagePicker/image-picker";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

type EditProductProps = {
  product: IProduct;
};

export default function EditProduct({ product }: EditProductProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price.toString());

  const [productDescription, setProductDescription] = useState(
    product.description
  );

  const handleImagePicked = (file: File) => {
    setSelectedImage(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);

    if (selectedImage) formData.append("image", selectedImage);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Product updated successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Image
        className={styles.editIcon}
        width={20}
        height={20}
        src="/icons/pencil.svg"
        alt="Edit Product"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h4 className={styles.highlight}>Edit Product Information</h4>
            <div className={styles.formGroup}>
              <label className={styles.highlight} htmlFor="productName">
                New Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                defaultValue={product.name}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.highlight} htmlFor="productPrice">
                New Price
              </label>
              <input
                type="text"
                id="productPrice"
                name="productPrice"
                defaultValue={product.price}
                onChange={(e) => {
                  setProductPrice(e.target.value);
                }}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.highlight} htmlFor="productDescription">
                New Description
              </label>
              <textarea
                id="productDescription"
                name="productDescription"
                defaultValue={product.description}
                onChange={(e) => {
                  setProductDescription(e.target.value);
                }}
                required
              ></textarea>
            </div>

            <ImagePicker
              label="Your image"
              name="image"
              onImagePicked={handleImagePicked}
              pickedImage={pickedImage}
              setPickedImage={setPickedImage}
              initialImage={`${process.env.NEXT_PUBLIC_FIREBASE_IMAGE_BASE_URL}${product.imageUrl}?alt=media&token=${process.env.NEXT_PUBLIC_FIREBASE_IMAGE_TOKEN}`}
            />
            <Button type="submit" className={styles.submitButton}>
              Save Changes
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
}
