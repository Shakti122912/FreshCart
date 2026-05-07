Action: file_editor create /app/frontend/src/components/Header.jsx --file-text "import React, { useState } from \"react\";
import { Link, useNavigate } from \"react-router-dom\";
import { ShoppingBag, Search, Menu, X, Leaf } from \"lucide-react\";
import { useCart } from \"../context/CartContext\";

const navLinks = [
  { to: \"/shop\", label: \"Shop All\" },
  { to: \"/shop/fruits\", label: \"Fruits\" },
  { to: \"/shop/vegetables\", label: \"Vegetables\" },
  { to: \"/shop/bakery\", label: \"Bakery\" },
  { to: \"/shop/dairy\", label: \"Dairy\" },
  { to: \"/shop/pantry\", label: \"Pantry\" },
];

export default function Header() {
  const { itemCount, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState(\"\");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <header
      data-testid=\"site-header\"
      className=\"sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur border-b border-[#D1CFC7]\"
    >
      {/* Announcement strip */}
      <div className=\"bg-[#1B3B24] text-[#FAF9F6] text-xs tracking-[0.18em] uppercase py-2 text-center\">
        Free delivery on orders over $50 · Same-day in the city
      </div>

      <div className=\"px-6 md:px-12 lg:px-20\">
        <div className=\"flex items-center justify-between h-20\">
          {/* Logo */}
          <Link
            to=\"/\"
            data-testid=\"logo-link\"
            className=\"flex items-center gap-2 group\"
          >
            <Leaf
              size={22}
              strokeWidth={1.5}
              className=\"text-[#1B3B24] group-hover:rotate-12 transition-transform\"
            />
            <span className=\"font-serif text-2xl tracking-tight text-[#1B3B24]\">
              FreshCart
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className=\"hidden lg:flex items-center gap-8\">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, \"-\")}`}
                className=\"text-sm tracking-wide text-[#1A1A1A] hover:text-[#B85D43] transition-colors\"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className=\"flex items-center gap-4\">
            <form
              onSubmit={onSearch}
              className=\"hidden md:flex items-center gap-2 border-b border-[#D1CFC7] focus-within:border-[#1B3B24] transition-colors\"
            >
              <Search size={16} className=\"text-[#4A4A4A]\" />
              <input
                data-testid=\"search-input\"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder=\"Search produce…\"
                className=\"bg-transparent py-2 px-1 text-sm focus:outline-none w-44\"
              />
            </form>

            <button
              data-testid=\"open-cart-button\"
              onClick={() => setOpen(true)}
              className=\"relative flex items-center gap-2 text-[#1B3B24] hover:text-[#B85D43] transition-colors\"
              aria-label=\"Open cart\"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span
                  data-testid=\"cart-count-badge\"
                  className=\"absolute -top-2 -right-2 bg-[#B85D43] text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center\"
                >
                  {itemCount}
                </span>
              )}
              <span className=\"hidden md:inline text-sm tracking-wide\">Cart</span>
            </button>

            <button
              data-testid=\"mobile-menu-toggle\"
              className=\"lg:hidden text-[#1B3B24]\"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label=\"Toggle menu\"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className=\"lg:hidden border-t border-[#D1CFC7] px-6 py-6 bg-[#FAF9F6]\">
          <form onSubmit={onSearch} className=\"flex items-center gap-2 border-b border-[#D1CFC7] mb-6\">
            <Search size={16} className=\"text-[#4A4A4A]\" />
            <input
              data-testid=\"mobile-search-input\"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder=\"Search produce…\"
              className=\"bg-transparent py-2 px-1 text-sm focus:outline-none w-full\"
            />
          </form>
          <div className=\"flex flex-col gap-4\">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, \"-\")}`}
                onClick={() => setMobileOpen(false)}
                className=\"text-base text-[#1A1A1A] hover:text-[#B85D43]\"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
"
Observation: Create successful: /app/frontend/src/components/Header.jsx
