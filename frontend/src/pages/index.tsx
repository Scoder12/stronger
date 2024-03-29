import { useRouter } from "next/router";
import { useEffect } from "react";
import Center from "../components/Center";
import LinkButton from "../components/LinkButton";
import { useMeQuery } from "../generated/graphql";

export default function Index() {
  const router = useRouter();
  const { data } = useMeQuery();

  useEffect(() => {
    if (data?.me?.username) {
      router.push("/home");
    }
  }, [router, data]);

  return (
    <Center className="h-full">
      <div>
        <div className="w-full flex justify-center mb-5">
          <h1 className="text-6xl font-bold inline">Stronger</h1>
        </div>
        <div className="w-full flex">
          <LinkButton className="mr-1 flex-grow" href="/login" primary={false}>
            Login
          </LinkButton>
          <LinkButton className="ml-1 flex-grow" href="/register">
            Register
          </LinkButton>
        </div>
      </div>
    </Center>
  );
}
