import LinkButton from "../components/LinkButton";

export default function Home() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="">
        <div className="w-full flex justify-center mb-5">
          <h1 className="text-5xl font-bold inline">Stronger</h1>
        </div>
        <div className="w-full flex justify-center">
          <LinkButton href="#" primary={false}>
            Login
          </LinkButton>
          <LinkButton href="#">Register</LinkButton>
        </div>
      </div>
    </div>
  );
}
