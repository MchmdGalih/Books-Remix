import { Form, Link } from "@remix-run/react";
import { Book } from "~/types/books";
import { showFormattedDate } from "~/utils/formatDate";
interface BookCardProps {
  book: Book;
}

export default function Card({ book }: BookCardProps) {
  return (
    <article
      key={book.id}
      className="border p-4 cursor-pointer rounded-md shadow-md hover:translate-y-[-5px] transition flex flex-col"
    >
      <Link to={`/books/${book.id}`} className="flex-1 ">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <em className="text-sm font-light">
            {showFormattedDate(book.release_date)}
          </em>
        </div>
        <p className="mb-1">{book.author}</p>
        <p className="mb-2">{book.description}</p>
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
  );
}
