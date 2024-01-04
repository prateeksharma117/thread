import UserCard from "@/components/cards/UserCard"
import ProfileHeader from "@/components/shared/ProfileHeader"
import ThreadsTab from "@/components/shared/ThreadsTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { communityTabs } from "@/constants"
import { fetchCommunityDetails } from "@/lib/actions/community.action"
import { currentUser } from "@clerk/nextjs"


const page = async ({ params }: { params: { id: string } }) => {

    if (!params.id) return null
    const user = await currentUser()
    if (!user) return null;

    const communityDetails = await fetchCommunityDetails(params.id)

    return (
        <>
            <section className=" text-white">
                <ProfileHeader
                    accountId={communityDetails.id}
                    authUserId={user.id}
                    name={communityDetails.name}
                    username={communityDetails.username}
                    imageUrl={communityDetails.image}
                    bio={communityDetails.bio}
                    type="Community"
                />

                <div className=" mt-9">
                    <Tabs defaultValue="threads" className=" w-full">
                        <TabsList className="tab justify-between ">
                            {communityTabs.map((tab) => (
                                <TabsTrigger key={tab.label} value={tab.value} className=" gap-3 items-center text-gray-1">
                                    {tab.icon}
                                    <p className=" max-sm:hidden">{tab.label}</p>
                                    {tab.label === "Threads" && (
                                        <p className=" ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                            {communityDetails?.threads?.length}
                                        </p>
                                    )}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="threads"
                            className=" w-full text-light-1"
                        >
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={communityDetails._id}
                                accountType="Community"
                            />
                        </TabsContent>

                        <TabsContent value="members"
                            className=" w-full text-light-1"
                        >
                            <section className=" mt-9 flex flex-col gap-10">
                                {communityDetails?.members?.map((member:any) =>(
                                    <UserCard
                                    id={member.id}
                                    name={member.name}
                                    username={member.username}
                                    imgUrl={member.image}
                                    personType="User"
                                    />
                                ))}
                            </section>
                        </TabsContent>

                        <TabsContent value="requests"
                            className=" w-full text-light-1"
                        >
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={communityDetails._id}
                                accountType="Community"
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </>
    )
}

export default page
