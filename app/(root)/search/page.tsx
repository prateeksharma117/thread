import UserCard from "@/components/cards/UserCard"
import Searchbar from "@/components/shared/Searchbar"
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"


const page = async () => {

    const user = await currentUser()

    if (!user) return null
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')

    const result = await fetchUsers({
        userId: user.id,
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
                    {result.users.length === 0 ? (
                        <p className=" no-result">No user found</p>
                    ) : (
                        <>
                            {result.users.map((person) => (
                                <div key={person.id}>
                                    <UserCard
                                    id={person.id}
                                    name={person.name}
                                    username={person.username}
                                    imgUrl={person.image}
                                    personType="User"
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
