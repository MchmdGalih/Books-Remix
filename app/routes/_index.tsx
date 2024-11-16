import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import Card from "~/components/Card";
import HeroSection from "~/components/HeroSection";
import { Book } from "~/types/books";

export const meta: MetaFunction = () => {
  return [
    { title: "Books Remix App" },
    { name: "description", content: "Welcome to Book Remix!" },
  ];
};
export async function loader() {
  const response = await fetch(`http://localhost:3000/api/books`);

  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const book: Book[] = await response.json();

    return json(book);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");

  const response = await fetch(`http://localhost:3000/api/books/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return null;
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  console.log;

  if (!data) {
    return <div>No books available</div>;
  }

  return (
    <div>
      <HeroSection />

      <h1 className="text-3xl font-bold text-center mb-4 mt-4 ">Books List</h1>
      <section className="grid p-4  md:grid-cols-3 gap-4" id="book-list">
        {data.map((book: Book) => (
          <Card key={book.id} book={book} />
        ))}
      </section>
    </div>
  );
}
