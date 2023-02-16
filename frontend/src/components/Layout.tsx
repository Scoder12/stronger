import { PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}

export default Layout;
