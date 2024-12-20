import React from "react"
import EditForm from "@/app/ui/edit-form";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Page: React.FC = async () => {
    const session = await getServerSession(options);

    return (
        <div>
            <EditForm session={session} />
        </div>
    );
};


export default Page;