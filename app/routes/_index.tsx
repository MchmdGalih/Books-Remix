import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, Link, redirect, useLoaderData } from "@remix-run/react";
import { error } from "node:console";
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

    return json(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");

  console.log("-->", id);
  const response = await fetch(`http://localhost:3000/api/books/${id}`, {
    method: "DELETE",
  });

  return null;
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  if (!data) {
    return <div>No books available</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-2 ">Books List</h1>
      <section className="grid  md:grid-cols-3 gap-4">
        {data.map((book) => (
          <article key={book.id} className="border p-4 cursor-pointer">
            <Link to={`/books/${book.id}`}>
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p>{showFormattedDate(book.release_date)}</p>
              <p>{book.author}</p>
              <p>{book.description}</p>
            </Link>
            <Form method="post">
              <input type="hidden" name="id" value={book.id} />
              <button
                type="submit"
                className="p-2 bg-red-500 mt-2 rounded-md text-white"
              >
                Delete
              </button>
            </Form>
          </article>
        ))}
      </section>
    </div>
  );
}
