import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  console.log("Params:", id);

  const response = await fetch(`http://localhost:3000/api/books/${id}`);
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const books: {
      id: string;
      title: string;
      author: string;
      description: string;
    } = await response.json();
    console.log("Data di Loader -->", books);
    return json(books);
  } catch (error) {
    console.error(error);
    return [];
  }

  return null;
};
const Book = () => {
  const { data } = useLoaderData<typeof loader>();
  console.log("Book di CSR:", data);
  return (
    <section>
      <div className="p-4 max-w-[800px] m-auto">
        <h1 className="text-2xl font-bold text-center mb-2 ">
          Book Detail: test
        </h1>
        <article className="border p-4  rounded-md shadow-md ">
          <Link to={`/`}>Home</Link>
          <div className="text-center">
            <h2 className="text-lg font-semibold">{data.title}</h2>
            <em>{data.author}</em>
            <p>{data.description}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Book;
