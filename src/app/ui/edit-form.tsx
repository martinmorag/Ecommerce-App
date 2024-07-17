"use client";

import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FormEvent } from "react";
import { ClipLoader } from "react-spinners";
import { API_BASE_URL } from "@/lib/api";
import styles from "@/app/ui/create-form.module.css";
import { useRouter, useParams } from "next/navigation";

interface FormData {
    name: string;
    description: string;
    price: string;
    size: string;
    images: File[];
    storeId: string;
    storeName: string;
    category: string;
}

interface ItemData {
    _id: string;
    name: string;
    description: string;
    price: number;
    size: string;
    images: string[]; // URLs of existing images
    storeId: number;
    storeName: string;
    category: number;
    email: string;
}

interface EditFormProps {
    session: any;
}

const EditForm: React.FC<EditFormProps> = ({ session }) => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        description: "",
        price: "",
        size: "",
        images: [],
        storeId: "",
        storeName: "",
        category: "",
    });
    const [currentImages, setCurrentImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { id } = useParams(); // Get item id from the URL

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/items/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch item');
                }

                const data: ItemData = await response.json();
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price.toString(),
                    size: data.size,
                    images: [], // Images will be handled separately
                    storeId: data.storeId.toString(),
                    storeName: data.storeName,
                    category: data.category.toString(),
                });
                setCurrentImages(data.images); // Correct usage
            } catch (error : any) {
                console.error('Error fetching item:', error.message);
            }
        };

        fetchItem();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, files } = e.target as HTMLInputElement;

        if (type === "file" && files) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: Array.from(files),
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const convertImageToBase64 = async (file: File) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (event) => resolve(event.target?.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const uploadImages = async (files: File[]) => {
        const imageUrls = [];
        for (const file of files) {
            const base64Image = await convertImageToBase64(file);
            imageUrls.push(base64Image);
        }
        return imageUrls;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const imageUrls = formData.images.length > 0 ? await uploadImages(formData.images) : currentImages;

            const dataToSend = {
                ...formData,
                price: parseFloat(formData.price),
                size: formData.size,
                images: imageUrls,
                storeId: parseInt(formData.storeId),
                storeName: formData.storeName,
                category: parseInt(formData.category),
                email: session.user.email,
            };

            const response = await fetch(`${API_BASE_URL}/items/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                console.log("Item updated successfully");
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    size: "",
                    images: [],
                    storeId: "",
                    storeName: "",
                    category: "",
                });
                router.push("/store");
            } else {
                console.error("Error updating item");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.title_div}>
                    <h1 className={styles.title}>Edit item</h1>
                    <Image
                        src="/flower.svg"
                        alt="Flower Icon"
                        width={40}
                        height={40}
                        className={styles.flower_icon}
                    />
                </div>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="info" className={styles.fieldset_title}>
                        Information of the item
                    </label>
                    {/* Item Name */}
                    <div>
                        <label htmlFor="name">
                            Name
                        </label>
                        <div className={styles.input}>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter the name of the item"
                                className={styles.input_box}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {/* Description */}
                    <div className={styles.input}>
                        <label htmlFor="description">
                            Description
                        </label>
                        <div>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Enter the description of the item"
                                className={styles.input_box}
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {/* Price */}
                    <div className={styles.input}>
                        <label htmlFor="price">
                            Price
                        </label>
                        <div>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="Enter the price of the item"
                                step="0.01"
                                className={styles.input_box}
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {/* Size */}
                    <div className={styles.input}>
                        <label htmlFor="size">
                            Size
                        </label>
                        <div>
                            <input
                                id="size"
                                name="size"
                                type="number"
                                placeholder="Enter the size of the item"
                                step="0.01"
                                className={styles.input_box}
                                value={formData.size}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {/* Images */}
                    <div className={styles.input}>
                        <label htmlFor="images">
                            Images
                        </label>
                        <div>
                            <input
                                id="images"
                                name="images"
                                type="file"
                                multiple
                                className={styles.input_box}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.imagePreview}>
                            {currentImages.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`Item Image ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className={styles.previewImage}
                                />
                            ))}
                        </div>
                    </div>
                    {/* StoreId */}
                    <div className={styles.input}>
                        <label htmlFor="storeId">
                            Store ID
                        </label>
                        <div>
                            <input
                                id="storeId"
                                name="storeId"
                                type="number"
                                placeholder="Enter Store ID"
                                step="1"
                                className={styles.input_box}
                                value={formData.storeId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {/* StoreName */}
                    <div className={styles.input}>
                        <label htmlFor="storeName">
                            Store Name
                        </label>
                        <div>
                            <input
                                id="storeName"
                                name="storeName"
                                type="text"
                                placeholder="Enter Store Name"
                                className={styles.input_box}
                                value={formData.storeName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {/* Category */}
                    <div className={styles.input}>
                        <label htmlFor="Category">
                            Category
                        </label>
                        <div>
                            <input
                                id="category"
                                name="category"
                                type="number"
                                placeholder="Enter category number"
                                step="1"
                                className={styles.input_box}
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.submit_button}>
                        <div className={styles.submit_div}>
                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={isLoading} // Disable button while loading
                            >
                                Update
                                <PaperAirplaneIcon className={styles.submit_icon} />
                            </button>
                        </div>
                        {isLoading && (
                            <div className={styles.loadingOverlay}>
                                <ClipLoader color="#00BFFF" loading={isLoading} size={50} />
                            </div>
                        )}
                    </div>
                </fieldset>
            </form>
        </>
    )
}

export default EditForm;