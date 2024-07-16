import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon, ShoppingBagIcon, HomeIcon } from "@heroicons/react/24/outline";
import styles from "@/app/ui/header.module.css";

export default function Header() {
    return (
      <header className={styles.header}>
        <Link
        href="/store"
        >
            <Image
            className={styles.header_logo}
            src="/logo.png"
            alt="logo"
            width={90}
            height={110}
            />
        </Link>
        <div className={styles.nav_bar}>
            <Link
            className={styles.nav_link}
            href="/store"
            ><HomeIcon className={styles.nav_icon}/> <span>Home</span></Link>
            <Link
            className={styles.nav_link}
            href="/store/create"
            ><ShoppingBagIcon className={styles.nav_icon}/> <span>Post product</span></Link>
            <Link
            className={styles.nav_link}
            href="/cart"
            ><ShoppingCartIcon className={styles.nav_icon}/> <span>Cart</span></Link>
        </div>
      </header>
    );
}  