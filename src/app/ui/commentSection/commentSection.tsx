import React, { useState, useEffect } from 'react';
import styles from './commentSection.module.css';
import {API_BASE_URL} from "@/lib/api";

interface Comment {
    _id: number;
    itemId: number;
    author: string;
    text: string;
}

const CommentSection: React.FC<{ itemId: number }> = ({ itemId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setNewText] = useState<string>('');
    const [author, setAuthor] = useState<string>('');

    useEffect(() => {
        // Fetch existing comments (this is a placeholder URL)
        fetch(`${API_BASE_URL}/items/${itemId}/comments`)
            .then(response => response.json())
            .then(data => setComments(data));
    }, [itemId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`${API_BASE_URL}/items/${itemId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author, text })
        });

        if (response.ok) {
            const comments = await response.json();
            setComments([...comments]);
            setNewText('');
            setAuthor('');
        }
    };

    return (
        <div className={styles.commentSection}>
            <h2>Comments</h2>
            <form onSubmit={handleSubmit} className={styles.commentForm}>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your name"
                    className={styles.input}
                    required
                />
                <textarea
                    value={text}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Your comment"
                    className={styles.textarea}
                    required
                ></textarea>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
            <div className={styles.commentsList}>
                {comments.map(comment => (
                    <div key={comment._id} className={styles.comment}>
                        <p className={styles.author}>{comment.author}</p>
                        <p className={styles.commentText}>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
