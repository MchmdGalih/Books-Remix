import type { MetaFunction } from "@remix-run/node";
import { json, Link, redirect, useLoaderData } from "@remix-run/react";
import { showFormattedDate } from "~/utils/formatDate";

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
    const data: {
      id: string;
      title: string;
      author: string;
      description: string;
    } = await response.json();
    console.log("Data di SSR -->", data);
    return json(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }

    return redirect("/");
  };

  if (!data) {
    return <div>No books available</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-2 ">Books List</h1>
      <section className="grid  md:grid-cols-3 gap-4">
        {data.map((book) => (
          <Link to={`/books/${book.id}`} key={book.id}>
            <article className="border p-4 cursor-pointer">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p>{showFormattedDate(book.release_date)}</p>
              <p>{book.author}</p>
              <p>{book.description}</p>
              <button
                onClick={() => handleDelete(book.id)}
                className="p-2 bg-red-500 mt-2 rounded-md text-white"
              >
                Delete
              </button>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}
