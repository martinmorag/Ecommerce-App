import React, { useState } from "react";
import Link from "next/link";
import styles from "@/app/ui/item/item.module.css";
import { Item } from "@/lib/definitions";
import { API_BASE_URL } from "@/lib/api";

interface ChildProps {
    item: Item;
    session: any;
    handleDelete: (itemId: number, itemEmail: string) => Promise<void>;
}

const ItemCard: React.FC<ChildProps> = ({ item, session, handleDelete }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false); // State to track if item is deleted

    const onDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsLoading(true);
        try {
            await handleDelete(item._id, item.email);
            setIsLoading(false);
            setIsDeleted(true); // Set state to indicate item is deleted
        } catch (error) {
            console.error("Error deleting item:", error);
            setIsLoading(false);
        }
    };

    const addToCart = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    itemId: item._id,
                    email: session.user.email,
                    quantity: 1
                }),
            });
            if (response.ok) {
                console.log(`Item with ID ${item._id} added to cart succesfully`);
            } else {
                const errorData = await response.json();
                console.error("Failed to add item to the cart: ", errorData.message)
            } 
        }   catch (error : any) {
            console.error("An error has occurred while adding the item to the cart: ", error.message)
        }
    }

    if (isDeleted) {
        // Return null if item is deleted to hide it from rendering
        return null;
    }

    return (
        <div key={item._id} className={styles.card}>
            {session.user && session.user.email === item.email && (
                <div className={styles.actionButtons}>
                    <button
                        onClick={onDelete}
                        className={styles.deleteButton}
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                    <Link href={`/store/edit/${item._id}`}>
                        <button className={styles.editButton}>Edit</button>
                    </Link>
                </div>
            )}
            <img src={item.images[0]} alt={item.name} className={styles.image} />
            <div className={styles.cardContent}>
                <h2>{item.name}</h2>
                <p className={styles.description}>{item.description}</p>
                <p className={styles.price}>${item.price.toFixed(2)}</p>
                <button className={styles.addToCartButton} onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ItemCard;
