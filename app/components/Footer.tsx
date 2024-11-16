const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-semibold text-white">BookRemix</h2>
              <p className="mt-2 text-lg text-opacity-80">
                Explore the world of books with us!
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-opacity-80">
          <p>&copy; 2024 BookRemix. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
