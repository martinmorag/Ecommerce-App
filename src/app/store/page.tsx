// app/page.jsx
import ServerComponent from './page-server';
import ClientComponent from './page-client';

export default function Page() {

    return (
        <ServerComponent>

            {(session: any) => {

                // @ts-ignore
                return <ClientComponent session={session} />}

            }
        </ServerComponent>
    );
}
