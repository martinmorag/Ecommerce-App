import React, { useState } from 'react';
import styles from './starRating.module.css';

interface StarRatingProps {
    onRate: (rating: number) => void;
    rating: number[];
}

const StarRating: React.FC<StarRatingProps> = ({ onRate, rating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (rating: number) => {
        onRate(rating);
    };

    const handleMouseEnter = (rating: number) => {
        setHoverRating(rating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const calculateAverageRating = (ratings: number[]) => {
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((a, b) => a + b, 0);
        return sum / ratings.length;
    };

    return (
        <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`
                        ${styles.star}
                        ${star <= (hoverRating || calculateAverageRating(rating)) ? styles.filled : ''}`}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default StarRating;
