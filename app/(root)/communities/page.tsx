import CommunityCard from "@/components/cards/CommunityCard"
import UserCard from "@/components/cards/UserCard"
import ProfileHeader from "@/components/shared/ProfileHeader"
import Searchbar from "@/components/shared/Searchbar"
import ThreadsTab from "@/components/shared/ThreadsTab"
import { profileTabs } from "@/constants"
import { fetchCommunities } from "@/lib/actions/community.action"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"


const page = async () => {

    const user = await currentUser()

    if (!user) return null
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')

    const result = await fetchCommunities({
        searchString: '',
        pageNumber: 1,
        pageSize: 30,
    })

    return (
        <>
            <section>
                <h1 className=" mb-10 head-text">search</h1>

                <Searchbar routeType='search' />

                <div className="mt-14 flex flex-col gap-9">
                    {result.communities.length === 0 ? (
                        <p className=" no-result">No communities found</p>
                    ) : (
                        <>
                            {result.communities.map((community) => (
                                <div key={community.id}>
                                    <CommunityCard
                                    id={community.id}
                                    name={community.name}
                                    username={community.username}
                                    imgUrl={community.image}
                                    bio={community.bio}
                                    members={community.members}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>

            </section>
        </>
    )
}

export default page
