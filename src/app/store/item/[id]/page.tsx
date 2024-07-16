'use client';

import React, {useEffect, useState} from "react";
import {useParams} from 'next/navigation'
import styles from './styles.module.css';
import CommentSection from "@/app/ui/commentSection/commentSection";
import {Item, Review} from "@/lib/definitions";
import {API_BASE_URL} from "@/lib/api";
import StarRating from "@/app/ui/starRating/starRating";

const ItemPage: React.FC = () => {
    const {id} = useParams();
    // const item = items.find((item) => item._id === Number(id));

    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState<number[]>([]);

    useEffect(() => {
        const fetchSingleItem = async () => {
            try {
                const [itemResponse, ratingResponse] = await Promise.all([
                    fetch(`${API_BASE_URL}/items/${id}`),
                    fetch(`${API_BASE_URL}/items/${id}/rating`)
                ]);

                if (!itemResponse.ok) {
                    throw new Error('Failed to fetch data');
                }
                const items = await itemResponse.json();
                const ratings = await ratingResponse.json() as Review[];

                setItem(items);
                setRating(ratings.map(el => el.rating));
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchSingleItem();
    }, [id]);


    const handleRating = async (newRating: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/items/${id}/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({rating: newRating}),
            });
            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }
            const data = await response.json() as Review[];
            setRating(data.map(el => el.rating));
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };


    if (loading) {
        return <div className={styles.notFound}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.notFound}>Error: {error}</div>;
    }

    if (!item) {
        return (
            <div className={styles.notFound}>Item not found</div>
        );
    }

    return (
        <main className={styles.container}>
            <div className={styles.item}>
                <img className={styles.image} src={item.images[0]} alt={item.name}/>
                <div className={styles.details}>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    <p className={styles.price}>${item.price}</p>
                    <p>Size: {item.size}</p>
                    <p>Store: {item.storeName}</p>
                    <StarRating rating={rating} onRate={handleRating}/>
                </div>
            </div>
            <CommentSection itemId={item._id}/>
        </main>
    );
};

export default ItemPage;
