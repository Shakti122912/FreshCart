Action: file_editor create /app/frontend/src/pages/Shop.jsx --file-text "import React, { useEffect, useMemo, useState } from \"react\";
import { useParams, useSearchParams, Link } from \"react-router-dom\";
import { fetchCategories, fetchProducts } from \"../lib/api\";
import ProductCard from \"../components/ProductCard\";

export default function Shop() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const q = searchParams.get(\"q\") || \"\";
  const [cats, setCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(\"featured\");

  useEffect(() => {
    fetchCategories().then(setCats);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (q) params.q = q;
    fetchProducts(params)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [category, q]);

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === \"price-asc\") arr.sort((a, b) => a.price - b.price);
    if (sort === \"price-desc\") arr.sort((a, b) => b.price - a.price);
    if (sort === \"name\") arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [products, sort]);

  const activeCat = cats.find((c) => c.slug === category);
  const headerTitle = q
    ? `Results for “${q}”`
    : activeCat
    ? activeCat.name
    : \"The whole market\";
  const headerTagline = q
    ? `${products.length} ${products.length === 1 ? \"find\" : \"finds\"}`
    : activeCat
    ? activeCat.tagline
    : \"Everything we have, in one place.\";

  return (
    <div data-testid=\"shop-page\" className=\"px-6 md:px-12 lg:px-20 py-12 lg:py-16\">
      {/* Header */}
      <div className=\"border-b border-[#D1CFC7] pb-8 mb-10\">
        <p className=\"text-xs tracking-[0.25em] uppercase text-[#B85D43] mb-3\">
          {q ? \"Search\" : \"Department\"}
        </p>
        <h1 className=\"font-serif text-5xl lg:text-7xl text-[#1B3B24] tracking-tighter\">
          {headerTitle}
        </h1>
        <p className=\"mt-3 text-[#4A4A4A]\">{headerTagline}</p>
      </div>

      {/* Filters */}
      <div className=\"flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10\">
        <div className=\"flex gap-2 overflow-x-auto no-scrollbar -mx-2 px-2\">
          <Link
            to=\"/shop\"
            data-testid=\"filter-all\"
            className={`px-4 py-2 text-sm tracking-wide whitespace-nowrap border transition-colors ${
              !category
                ? \"bg-[#1B3B24] text-white border-[#1B3B24]\"
                : \"border-[#D1CFC7] text-[#1B3B24] hover:border-[#1B3B24]\"
            }`}
          >
            All
          </Link>
          {cats.map((c) => (
            <Link
              key={c.slug}
              to={`/shop/${c.slug}`}
              data-testid={`filter-${c.slug}`}
              className={`px-4 py-2 text-sm tracking-wide whitespace-nowrap border transition-colors ${
                category === c.slug
                  ? \"bg-[#1B3B24] text-white border-[#1B3B24]\"
                  : \"border-[#D1CFC7] text-[#1B3B24] hover:border-[#1B3B24]\"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
        <select
          data-testid=\"sort-select\"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className=\"bg-transparent border border-[#D1CFC7] text-sm py-2 px-3 focus:outline-none focus:border-[#1B3B24]\"
        >
          <option value=\"featured\">Featured</option>
          <option value=\"price-asc\">Price: low to high</option>
          <option value=\"price-desc\">Price: high to low</option>
          <option value=\"name\">Name: A → Z</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6\">
          {[...Array(8)].map((_, i) => (
            <div key={i} className=\"aspect-[3/4] bg-[#F2EFEB] animate-pulse\" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div data-testid=\"shop-empty\" className=\"py-20 text-center\">
          <p className=\"font-serif text-3xl text-[#1B3B24]\">Nothing in this aisle yet.</p>
          <p className=\"text-[#4A4A4A] mt-2\">Try a different department.</p>
        </div>
      ) : (
        <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8\">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
"
Observation: Create successful: /app/frontend/src/pages/Shop.jsx
