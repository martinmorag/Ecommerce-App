import React from "react"
import CreateForm from "@/app/ui/create-form";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Page: React.FC = async () => {
    const session = await getServerSession(options);

    return (
        <div>
            <CreateForm session={session} />
        </div>
    );
};


export default Page;