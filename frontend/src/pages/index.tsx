import Center from "../components/Center";
import LinkButton from "../components/LinkButton";

export default function Home() {
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
          <LinkButton className="ml-1 flex-grow" href="#">
            Register
          </LinkButton>
        </div>
      </div>
    </Center>
  );
}
