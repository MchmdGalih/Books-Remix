import { Link } from "@remix-run/react";

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center h-64 sm:h-80 lg:h-96"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1613191413996-3d8f57c6e5b3?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative text-center text-white flex flex-col justify-center items-center h-full px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
          Selamat Datang di Book Remix!
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl">
          Temukan Buku Favorit Anda dan Mulai Petualangan Baru!
        </p>
        <Link
          to="#book-list"
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Jelajahi Koleksi Buku
        </Link>
      </div>
    </section>
  );
}
