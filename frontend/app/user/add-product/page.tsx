"use client";

import { useState } from "react";
import styles from "./addproduct.module.css";
import ImagePicker from "@/components/ImagePicker/image-picker";
import Button from "@/shared/Button";

export default function AddProductPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleImagePicked = (file: File) => {
    setSelectedImage(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/products/addProduct",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Product added successfully!");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred.");
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
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </p>
          <div className={styles.row}>
            <p>
              <label htmlFor="price">Price</label>
              <input
                type="number"
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
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Sport">Sport</option>
              </select>
            </p>
          </div>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            ></textarea>
          </p>
          <ImagePicker
            label="Your image"
            name="image"
            onImagePicked={handleImagePicked}
          />
          <p className={styles.actions}>
            <Button>Add Product</Button>
          </p>
        </form>
      </main>
    </>
  );
}
