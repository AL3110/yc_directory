import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
export default async function Home({ searchParams } : { searchParams : Promise<{ query? : string}>}) { // <Form> specified the searchParams id/key to be 'query'
  const parameters = await searchParams;
  const query = parameters.query;

  const params = { search: query || null}

  const session = await auth();
  console.log(session?.id);

  // const posts = await client.fetch(STARTUPS_QUERY);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params }); // made it real time streaming data
  // console.log(JSON.stringify(posts));

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch your startup <br /> Connect With Enterpreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          { posts?.length>0 ? (posts.map((post: StartupTypeCard, index: number) => ( // implicitly returned by function using '()' (an expression)
            <StartupCard key={post?._id} post={post} />
          ))) : (
            <p className='no-results'>No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
