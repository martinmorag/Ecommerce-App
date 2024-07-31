import Header from "@/app/ui/header";
import { LayoutProps } from "@/lib/definitions";
import React from "react";

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout;