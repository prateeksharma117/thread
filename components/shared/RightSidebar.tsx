import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserCard from "../cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.action";
import LeftCommunityCard from "../cards/LeftCommunityCard";

const RightSidebar = async () => {
  const user = await currentUser();

  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const resultUser = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 30,
  });

  const resultCommunity = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 30,
  });

  return (
    <>
      <section className=" custom-scrollbar rightsidebar">
        {user ? (
          <>
            <div className="flex flex-1 justify-start flex-col">
              <h3 className=" text-heading4-medium text-light-1">
                Suggested Users
              </h3>

              <div className="mt-8 flex flex-col gap-9">
                {resultUser.users.length === 0 ? (
                  <p className=" no-result">No user found</p>
                ) : (
                  <>
                    {resultUser.users.splice(0, 3).map((person) => (
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
            </div>

            <div className="flex flex-1 justify-start flex-col">
              <h3 className=" text-heading4-medium text-light-1">
                Suggested Communities
              </h3>

              <div className="mt-8 flex flex-col gap-9">
                {resultCommunity.communities.length === 0 ? (
                  <p className=" no-result">No communities found</p>
                ) : (
                  <>
                    {resultCommunity.communities
                      .splice(0, 3)
                      .map((community) => (
                        <div key={community.id}>
                          <LeftCommunityCard
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
            </div>
          </>
        ) : (
          <p className=" flex justify-center items-center">
            Currently no user Login
          </p>
        )}
      </section>
    </>
  );
};

export default RightSidebar;
