'use client';

import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import ItemCard from "@/app/ui/item/item";
import { Item } from "@/lib/definitions";
import Link from "next/link";
import {API_BASE_URL} from "@/lib/api";
import { useRouter } from 'next/navigation';

// @ts-ignore
const Store: React.FC = ({session}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [items, setItems] = useState<Item[]>([]);
    const router = useRouter();

    console.log(API_BASE_URL)
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/items`);

                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItems(data);
            } catch (error: any) {
                console.error('Error fetching items:', error.message);
            }
        };

        fetchItems();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = items.filter(item =>
        item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (itemId: number, itemEmail: string) => {
        try {
            if (session.user && session.user.email === itemEmail) {
                const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log(`Item with ID ${itemId} deleted successfully.`);
                } else {
                    const errorData = await response.json();
                    console.error('Failed to delete item:', errorData.message);
                }
            } else {
                console.log("You don't have permission to delete this item.");
            }
        } catch (error: any) {
            console.error('An error occurred while deleting the item:', error.message);
        }
    };

    return (

        <main className={styles.container}>
            <Link className={styles.logout} href="/api/auth/signout">Log Out</Link>
            <img className={styles.logo} src='/logo.png' alt='logo'/>
            <div className={styles.searchContainer}>
                <input
                    type='text'
                    placeholder='Search items...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.grid}>
                {filteredItems.map((item: Item) => (
                    <div key={item._id} 
                        onClick={(e) => {
                            if ((e.target as HTMLElement).tagName !== 'BUTTON') {
                                router.push(`/store/item/${item._id}`);
                            }
                        }}
                    >
                        <ItemCard
                                key={item._id}
                                item={item}
                                session={session}
                                handleDelete={handleDelete}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Store;
