import { Component, JSX, splitProps } from "solid-js";
import { Nav } from "~/components/layout/Nav";

interface LayoutProps {
  showNav?: boolean;
  class?: string;
  children: JSX.Element;
}

export const Layout: Component<LayoutProps> = (props) => {
  const [local, rest] = splitProps(props, ["showNav", "class", "children"]);

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      {local.showNav !== false && <Nav />}
      <main class={`container mx-auto px-4 py-8 ${local.class || ""}`}>
        {local.children}
      </main>
    </div>
  );
}; 
