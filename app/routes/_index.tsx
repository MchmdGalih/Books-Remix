import type { MetaFunction } from "@remix-run/node";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllBooks } from "app/utils/api";
export const loader: LoaderFunction = async () => {
  try {
    const books = await getAllBooks();
    return json({ books });
  } catch (error) {
    return json({ books: [] });
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "Books Remix App" },
    { name: "description", content: "Welcome to Book Remix!" },
  ];
};

export default function Index() {
  const { books } = useLoaderData() as {
    books: { id: number; title: string; author: string; description: string }[];
  };

  console.log("Books data:", books);

  if (!books || books.length === 0) {
    return <div>No books available</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 mt-8 bg-white rounded-md ">
      <h1 className="text-2xl text-center mb-2 ">Books</h1>
      <ul>
        {books.map((book) => (
          <>
            <li key={book.id}>Judul: {book.title}</li>
            <li>Author: {book.author}</li>
            <li>Description: {book.description}</li>
          </>
        ))}
      </ul>
    </div>
  );
}
