import { type NextPage } from "next";
import Head from "next/head";
import { CreateCategory } from "~/features/category/";
import { SelectCategory } from "~/features/category/";
import { UserWidget } from "~/features/user/";
import { Logo } from "~/ui-kit";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const selectedCategory = api.category.getSelected.useQuery().data;

  return (
    <>
      <Head>
        <title>Motype</title>
      </Head>
      <main className="min-h-screen">
        <div className="container mx-auto flex items-center justify-between p-6">
          <Logo />
          <div className="flex items-center">
            <SelectCategory />
            <CreateCategory />
          </div>
          <UserWidget />
        </div>

        <pre className="container mx-auto mt-20 flex flex-1 flex-col items-center justify-center space-y-10">
          {(JSON.parse(selectedCategory?.fragments || "[]") as string[])[0]}
        </pre>
      </main>
    </>
  );
};

export default Home;
