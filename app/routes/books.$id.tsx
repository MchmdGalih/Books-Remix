import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { showFormattedDate } from "~/utils/formatDate";
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) {
    <p>No book found!</p>;
  }
  const response = await fetch(`http://localhost:3000/api/books/${id}`);
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const books = await response.json();
    return json(books);
  } catch (error) {
    console.error(error);
    return [];
  }
};
const Book = () => {
  const { data } = useLoaderData<typeof loader>();
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto p-4 max-w-screen-lg">
        <Link
          to="/"
          className="inline-block text-blue-500 hover:text-blue-700 mb-4 text-lg font-semibold"
        >
          &larr; Back to Home
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/3">
            <img
              src="https://via.placeholder.com/300x450"
              alt="Book Cover"
              className="rounded-md w-full h-auto object-cover shadow-lg"
            />
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {data.title}
            </h1>
            <p className="text-xl text-gray-600 italic mb-4">
              by {data.author}
            </p>
            <p className="text-gray-700 mb-4">{data.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Release Date:</span>
              <span className="text-gray-800">
                {showFormattedDate(data.release_date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
