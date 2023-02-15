import { useMeQuery } from "../generated/graphql";

export default function Home() {
  const { data, loading } = useMeQuery();

  if (loading) {
    return <p>Loading...</p>;
  }
  return <p>{data?.me?.username}</p>;
}
