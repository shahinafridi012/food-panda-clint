"use client";

export default function Footer() {
  return (
    <footer className="relative w-full mt-28 px-6 py-20 bg-white text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">

      {/* Top Gradient Line */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-300 dark:bg-neutral-800">
        <div className="absolute mx-auto h-px w-48 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80" />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 max-w-7xl mx-auto">

        {/* Logo + About */}
        <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 shadow-lg" />
          
          <h1 className="text-3xl font-extrabold tracking-tight">
            SomeFood
          </h1>

          <p className="leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-sm">
            Fresh meals, warm ambiance, and flavors you’ll always remember.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-semibold text-xl mb-4 tracking-tight">
            Quick Links
          </h2>

          <ul className="flex flex-col gap-2 text-neutral-700 dark:text-neutral-400">
            {["Home", "Menu", "About Us", "Reservations", "Contact"].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="hover:text-red-500 hover:tracking-wide transition-all duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-semibold text-xl mb-4 tracking-tight">
            Contact Us
          </h2>

          <div className="space-y-1 text-neutral-700 dark:text-neutral-400">
            <p>123 Flavor Street, Foodtown</p>
            <p>+1 (555) 987-6543</p>
            <p>support@somefood.com</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-5 mt-5">
            {["Instagram", "Facebook", "Twitter"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-neutral-800 dark:text-neutral-400 hover:text-red-500 transition duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-20 border-t border-neutral-300 dark:border-neutral-800 pt-6 text-center text-neutral-600 dark:text-neutral-400 text-sm">
        © {new Date().getFullYear()} SomeFood — All Rights Reserved.
      </div>
    </footer>
  );
}
