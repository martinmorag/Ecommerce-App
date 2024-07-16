import {getServerSession} from "next-auth/next";
import {options} from "@/app/api/auth/[...nextauth]/options";

// @ts-ignore
export default async function ServerComponent({ children }) {
    const session = await getServerSession(options)

    return (
        <div>
            {children(session)}
        </div>
    );
}
