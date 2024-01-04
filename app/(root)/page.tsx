import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  const result = await fetchPosts(1, 20);

  return (
    <>
      {user ? (
        <h1 className=" head-text">Welcome, {user?.firstName}❤️</h1>
      ) : (
        <h1 className=" head-text">Thread❤️</h1>
      )}

      <section className=" mt-9 flex flex-col gap-10">
        {result?.posts?.length === 0 ? (
          <p className=" no-result">no Threads found</p>
        ) : (
          <>
            {result?.posts?.map((post) => (
              <>
                <div key={post?._id}>
                  <ThreadCard
                    id={post?._id}
                    currentUserId={user?.id || ""}
                    parentId={post?.parentId}
                    content={post?.text}
                    image={post?.image}
                    author={post?.author}
                    community={post?.community}
                    createdAt={post?.createdAt}
                    comments={post?.children}
                  />
                </div>
              </>
            ))}
          </>
        )}
      </section>
    </>
  );
}
