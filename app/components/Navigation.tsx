import { Link } from "@remix-run/react";

export default function Navigation() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
      <nav className="flex justify-between items-center text-white">
        <div className="text-2xl font-bold ">
          <Link to="/">Book Remix</Link>
        </div>

        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/form">Form</Link>
        </div>
      </nav>
    </header>
  );
}
