Action: file_editor create /app/frontend/src/components/Footer.jsx --file-text "import React from \"react\";
import { Link } from \"react-router-dom\";
import { Leaf, Instagram, Facebook, Twitter } from \"lucide-react\";

export default function Footer() {
  return (
    <footer
      data-testid=\"site-footer\"
      className=\"border-t border-[#D1CFC7] bg-[#F2EFEB] mt-24\"
    >
      <div className=\"px-6 md:px-12 lg:px-20 py-16\">
        <div className=\"grid grid-cols-1 md:grid-cols-12 gap-12\">
          <div className=\"md:col-span-5\">
            <div className=\"flex items-center gap-2 mb-4\">
              <Leaf size={22} strokeWidth={1.5} className=\"text-[#1B3B24]\" />
              <span className=\"font-serif text-2xl text-[#1B3B24]\">
                FreshCart
              </span>
            </div>
            <p className=\"font-serif text-2xl md:text-3xl text-[#1B3B24] leading-tight max-w-md\">
              The market, brought to your kitchen — picked this morning, never warehoused.
            </p>
            <div className=\"flex items-center gap-4 mt-8\">
              <a href=\"#\" aria-label=\"Instagram\" className=\"text-[#1B3B24] hover:text-[#B85D43]\">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href=\"#\" aria-label=\"Facebook\" className=\"text-[#1B3B24] hover:text-[#B85D43]\">
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a href=\"#\" aria-label=\"Twitter\" className=\"text-[#1B3B24] hover:text-[#B85D43]\">
                <Twitter size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className=\"md:col-span-2\">
            <h4 className=\"text-xs tracking-[0.2em] uppercase text-[#B85D43] mb-4\">
              Shop
            </h4>
            <ul className=\"space-y-2 text-sm\">
              <li><Link to=\"/shop/fruits\" className=\"hover:text-[#B85D43]\">Fruits</Link></li>
              <li><Link to=\"/shop/vegetables\" className=\"hover:text-[#B85D43]\">Vegetables</Link></li>
              <li><Link to=\"/shop/dairy\" className=\"hover:text-[#B85D43]\">Dairy</Link></li>
              <li><Link to=\"/shop/bakery\" className=\"hover:text-[#B85D43]\">Bakery</Link></li>
              <li><Link to=\"/shop/pantry\" className=\"hover:text-[#B85D43]\">Pantry</Link></li>
            </ul>
          </div>

          <div className=\"md:col-span-2\">
            <h4 className=\"text-xs tracking-[0.2em] uppercase text-[#B85D43] mb-4\">
              Care
            </h4>
            <ul className=\"space-y-2 text-sm\">
              <li>Delivery Areas</li>
              <li>Returns</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className=\"md:col-span-3\">
            <h4 className=\"text-xs tracking-[0.2em] uppercase text-[#B85D43] mb-4\">
              The Weekly Market
            </h4>
            <p className=\"text-sm text-[#4A4A4A] mb-4\">
              Seasonal recipes & first dibs on harvest drops.
            </p>
            <form
              data-testid=\"newsletter-form\"
              onSubmit={(e) => e.preventDefault()}
              className=\"flex border-b border-[#1B3B24]\"
            >
              <input
                data-testid=\"newsletter-input\"
                type=\"email\"
                required
                placeholder=\"your@email.com\"
                className=\"flex-1 bg-transparent py-3 px-1 text-sm focus:outline-none placeholder:text-[#4A4A4A]\"
              />
              <button
                data-testid=\"newsletter-submit\"
                className=\"px-4 text-xs tracking-[0.18em] uppercase text-[#1B3B24] hover:text-[#B85D43]\"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className=\"mt-16 pt-8 border-t border-[#D1CFC7] flex flex-col md:flex-row justify-between gap-4 text-xs tracking-wide text-[#4A4A4A]\">
          <span>© {new Date().getFullYear()} FreshCart Market Co.</span>
          <div className=\"flex gap-6\">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
"
Observation: Create successful: /app/frontend/src/components/Footer.jsx
