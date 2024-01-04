import ProfileHeader from "@/components/shared/ProfileHeader"
import ThreadsTab from "@/components/shared/ThreadsTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from "@/constants"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"


const page = async ({ params }: { params: { id: string } }) => {

    if (!params.id) return null
    const user = await currentUser()

    if (!user) return null

    const userInfo = await fetchUser(params.id)
    if (!userInfo?.onboarded) redirect('/onboarding')

    return (
        <>
            <section className=" text-white">
                <ProfileHeader
                    accountId={userInfo.id}
                    authUserId={user.id}
                    name={userInfo.name}
                    username={userInfo.username}
                    imageUrl={userInfo.image}
                    bio={userInfo.bio}
                />

                <div className=" mt-9">
                    <Tabs defaultValue="threads" className=" w-full">
                        <TabsList className="tab justify-between ">
                            {profileTabs.map((tab) => (
                                <TabsTrigger key={tab.label} value={tab.value} className=" gap-3 items-center text-gray-1">
                                    {tab.icon}
                                    <p className=" max-sm:hidden">{tab.label}</p>
                                    {tab.label === "Threads" && (
                                        <p className=" ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                            {userInfo?.threads?.length}
                                        </p>
                                    )}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        
                        {profileTabs.map((tab) => (
                            <TabsContent key={`content-${tab.label}`} value={tab.value}
                                className=" w-full text-light-1"
                            >
                                <ThreadsTab
                                    currentUserId={user.id}
                                    accountId={userInfo.id}
                                    accountType="User"
                                />
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>
        </>
    )
}

export default page
