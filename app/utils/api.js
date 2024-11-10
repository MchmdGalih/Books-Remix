const BASE_URL = "http://localhost:3000/api";

async function getAllBooks() {
  const response = await fetch(`${BASE_URL}/books`);
  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  const responseJson = await response.json();

  return responseJson;
}

async function getBookById(id) {
  const response = await fetch(`${BASE_URL}/books/${id}`);
  if (!response.ok) {
    throw new Error(response.message);
  }

  const responseJson = await response.json();

  return responseJson;
}

async function createBook(book) {
  const response = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  const responseJson = await response.json();

  return responseJson;
}

async function updateBook(id, book) {
  const response = await fetch(`${BASE_URL}/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  const responseJson = await response.json();

  return responseJson;
}

async function deleteBook(id) {
  const response = await fetch(`${BASE_URL}/books/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  const responseJson = await response.json();

  return responseJson;
}

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
