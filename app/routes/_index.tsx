import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// export const loader: LoaderFunction = async () => {
//   try {
//     const books = await getAllBooks();
//     console.log("Books data:", books);
//   } catch (error) {
//     return json({ books: [] });
//   }
// };

export async function loader() {
  const response = await fetch(`http://localhost:3000/api/books`);

  try {
    const books = await response.json();
    return books.data;
  } catch (error) {
    return [];
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: "Books Remix App" },
    { name: "description", content: "Welcome to Book Remix!" },
  ];
};

export default function Index() {
  const { books } = useLoaderData<typeof loader>();

  console.log("Books data:", books);

  if (!books || books.length === 0) {
    return <div>No books available</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 mt-8 bg-white rounded-md ">
      <h1 className="text-2xl text-center mb-2 ">Books</h1>

      {books.map((book) => (
        <article key={book.id} className="mb-4">
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-gray-600">{book.author}</p>
        </article>
      ))}
    </div>
  );
}
