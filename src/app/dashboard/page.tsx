import { getSession } from "@/lib/getSession";
import DashboardClient from "@/components/DashboardClient"

async function page() {
    const session = await getSession();


    return (
        <div>
            <DashboardClient ownerId={session?.user?.id!}/>
        </div>
    )
}

export default page;