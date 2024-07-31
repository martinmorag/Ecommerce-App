import React from "react";
import { Itemv2, CardProps } from "@/lib/definitions";
import styles from "./card.module.css";

const Card: React.FC<CardProps> = ({ item, quantity, totalPrice, onIncrease, onDecrease }) => {
  // Safeguard against undefined or empty images array
  const imageSrc = item.images && item.images.length > 0 ? item.images[0] : "/default-image.jpg";
  const formattedPrice = totalPrice.toFixed(2); // Use totalPrice instead of item.price

  return (
    <div className={styles.card}>
      <img src={imageSrc} alt={item.name} className={styles.image} />
      <div className={styles.cardContent}>
        <div className={styles.info}>
          <h2>{item.name}</h2>
          <p className={styles.description}>{item.description}</p>
          <p className={styles.price}>${formattedPrice}</p>
        </div>
        <div className={styles.quantityContainer}>
          <p className={styles.quantity}>Quantity: {quantity}</p>
          <button className={styles.increaseButton} onClick={onIncrease}>+</button>
          <button className={styles.decreaseButton} onClick={onDecrease}>-</button>
        </div>
      </div>
    </div>
  );
};

export default Card;