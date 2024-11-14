import { useActionData, Form, json, redirect } from "@remix-run/react";

export const action = async ({ request }: any) => {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const author = formData.get("author");
    const description = formData.get("description");
    const release_date = formData.get("release_date");

    const payload = {
      title,
      author,
      description,
      release_date: new Date(release_date),
    };

    const response = await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("success -->", response);

    return redirect("/");
  } catch (error) {
    console.log("error in action:", error);
  }
};

const FormBook = () => {
  const actionData = useActionData();
  console.log("Action Data", actionData);
  return (
    <div className="p-4 max-w-[800px] m-auto mt-5">
      <h1 className="text-center">Form Book</h1>
      <Form method="post" className="flex flex-col gap-3 space-y-3 ">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="text-[18px] p-[5px] mt-2  w-full outline-none bg-white text-black border border-[#C4D1EB] rounded-[5px]  "
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            className="text-[18px] p-[5px] mt-2  w-full outline-none bg-white text-black border border-[#C4D1EB] rounded-[5px]  "
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            required
            className="text-[18px] p-[5px] mt-2  w-full outline-none bg-white text-black border border-[#C4D1EB] rounded-[5px] "
          ></textarea>
        </div>
        <div>
          <label htmlFor="release_date">Release Date:</label>
          <input type="date" name="release_date" id="release_date" />
        </div>

        <button
          type="submit"
          className="bg-blue-300 p-2 rounded-md text-white font-medium"
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default FormBook;
