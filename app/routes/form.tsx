import { Form, json, redirect, useNavigation } from "@remix-run/react";

export const action = async ({ request }: any) => {
  try {
    const formData = await request.formData();
    const payload = Object.fromEntries(formData);

    const response = await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        release_date: new Date().toISOString(),
      }),
    });
    console.log(response);
    return redirect("/");
  } catch (error) {
    return json({
      status: false,
    });
  }
};

const FormBook = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
          className={`bg-blue-500 p-2 rounded-md text-white font-medium ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </div>
  );
};

export default FormBook;
