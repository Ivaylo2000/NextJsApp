"use client";
import { useState } from "react";
import styles from "./AddProduct.module.css";
import ImagePicker from "@/components/ImagePicker/image-picker";
import Button from "@/shared/Button";
import toast from "react-hot-toast";
export default function AddProduct({
  username,
  token,
  userId,
}: {
  username: string | null;
  token: string | null;
  userId: string | null;
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [textAreaCount, setTextAreaCount] = useState(0);

  const recalculateTextArena = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaCount(e.target.value.length);
  };

  const handleImagePicked = (file: File) => {
    setSelectedImage(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !token || !userId) {
      toast.error("You need to be logged in to add a product.");
      return;
    }
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    if (username) formData.append("username", username);
    if (userId) formData.append("userId", userId);
    if (selectedImage) formData.append("image", selectedImage);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/addProduct`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Product added successfully!");
        setSelectedImage(null);
        setPickedImage(null);
        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductDescription("");
        setTextAreaCount(0);
      } else {
        toast.error("Failed to add product");
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
      <header className={styles.header}>
        <h1>
          Add your <span className={styles.highlight}>Product</span>
        </h1>
      </header>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="productName"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              required
            />
          </p>
          <div className={styles.row}>
            <p>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                id="price"
                name="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </p>
            <p>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="productCategory"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Sport">Sport</option>
              </select>
            </p>
          </div>
          <div className={styles.descriptionContainer}>
            <label htmlFor="description">Description</label>
            <div className={styles.textareaWrapper}>
              <label className={styles.charCount}>
                {`${textAreaCount}/50`}{" "}
              </label>

              <textarea
                id="description"
                name="productDescription"
                value={productDescription}
                maxLength={50}
                rows={2}
                minLength={10}
                onChange={(e) => {
                  setProductDescription(e.target.value);
                  recalculateTextArena(e);
                }}
                required
              ></textarea>
            </div>
          </div>
          <ImagePicker
            label="Your image"
            name="image"
            onImagePicked={handleImagePicked}
            pickedImage={pickedImage}
            setPickedImage={setPickedImage}
          />
          <p className={styles.actions}>
            <Button>Add Product</Button>
          </p>
        </form>
      </main>
    </>
  );
}
