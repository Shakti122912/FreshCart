Action: file_editor create /app/frontend/src/pages/Home.jsx --file-text "import React, { useEffect, useState } from \"react\";
import { Link } from \"react-router-dom\";
import { ArrowRight, Truck, Sprout, Clock, Award } from \"lucide-react\";
import { fetchCategories, fetchFeatured } from \"../lib/api\";
import ProductCard from \"../components/ProductCard\";

const HERO_BG =
  \"https://static.prod-images.emergentagent.com/jobs/79a0f4b1-079d-4f0a-ac3d-5bb3b9863edf/images/ce8b8f2191460bc586bc95ba1e07dc7f77356ebeb28d7794757e6065438576a5.png\";

export default function Home() {
  const [cats, setCats] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchFeatured()])
      .then(([c, f]) => {
        setCats(c);
        setFeatured(f);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid=\"home-page\">
      {/* HERO */}
      <section className=\"relative overflow-hidden\">
        <div className=\"px-6 md:px-12 lg:px-20 pt-12 lg:pt-20 pb-20 lg:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end\">
          <div className=\"lg:col-span-6 fade-up\">
            <p className=\"text-xs tracking-[0.25em] uppercase text-[#B85D43] mb-6\">
              Est. 2025 · Picked at Dawn
            </p>
            <h1 className=\"font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#1B3B24] leading-[0.95] tracking-tighter\">
              The market,
              <br />
              <em className=\"italic font-normal text-[#B85D43]\">delivered</em>
              <br />
              before lunch.
            </h1>
            <p className=\"mt-8 text-base lg:text-lg text-[#4A4A4A] max-w-md leading-relaxed\">
              Small farms, slow bakers, honest fishmongers. We curate the best
              of the season — then bring it to your door, often the same day.
            </p>
            <div className=\"mt-10 flex flex-col sm:flex-row gap-4\">
              <Link
                to=\"/shop\"
                data-testid=\"hero-shop-cta\"
                className=\"bg-[#1B3B24] text-white px-8 py-4 hover:bg-[#2C5A37] transition-colors font-medium tracking-wide flex items-center justify-center gap-2\"
              >
                Shop the Market
                <ArrowRight size={18} strokeWidth={1.5} />
              </Link>
              <Link
                to=\"/shop/fruits\"
                data-testid=\"hero-secondary-cta\"
                className=\"bg-transparent border-2 border-[#1B3B24] text-[#1B3B24] px-8 py-4 hover:bg-[#1B3B24] hover:text-white transition-colors font-medium tracking-wide flex items-center justify-center gap-2\"
              >
                This week's harvest
              </Link>
            </div>
          </div>

          <div className=\"lg:col-span-6 relative fade-up\">
            <div className=\"relative aspect-[4/5] overflow-hidden grain\">
              <img
                src={HERO_BG}
                alt=\"Fresh organic produce\"
                className=\"w-full h-full object-cover\"
              />
              <div className=\"absolute inset-0 bg-gradient-to-t from-[#1B3B24]/30 via-transparent to-transparent\" />
              <div className=\"absolute bottom-6 left-6 right-6 text-white\">
                <p className=\"text-[10px] tracking-[0.25em] uppercase opacity-80\">
                  Featured Producer
                </p>
                <p className=\"font-serif text-2xl lg:text-3xl mt-1\">
                  Holler Hill Farm — Vermont
                </p>
              </div>
            </div>
            <div className=\"hidden lg:block absolute -left-12 top-12 bg-[#B85D43] text-white px-5 py-3 -rotate-6\">
              <p className=\"text-[10px] tracking-[0.25em] uppercase\">Today</p>
              <p className=\"font-serif text-2xl\">Free Delivery $50+</p>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className=\"border-y border-[#D1CFC7] py-5 overflow-hidden bg-[#F2EFEB]\">
          <div className=\"marquee-track text-[#1B3B24]\">
            {[...Array(2)].flatMap((_, k) =>
              [
                \"Heirloom Tomatoes — In Season\",
                \"Sourdough — Baked Hours Ago\",
                \"Wild King Salmon — Fresh Today\",
                \"Pasture Eggs — From This Morning\",
                \"Cultured Butter — Hand Rolled\",
                \"Stone Milled Polenta — Heritage Corn\",
              ].map((t, i) => (
                <span
                  key={`${k}-${i}`}
                  className=\"font-serif italic text-2xl whitespace-nowrap flex items-center gap-12\"
                >
                  {t}
                  <span className=\"text-[#B85D43]\">✦</span>
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className=\"px-6 md:px-12 lg:px-20 py-16 lg:py-24\">
        <div className=\"grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12\">
          {[
            { icon: Sprout, title: \"Small Farm Sourced\", text: \"Direct from growers we know by name.\" },
            { icon: Clock, title: \"Same-Day Delivery\", text: \"Order before noon, eat by sunset.\" },
            { icon: Award, title: \"Editorial Selection\", text: \"We taste everything before it lists.\" },
            { icon: Truck, title: \"Free Over $50\", text: \"Standard delivery, on us.\" },
          ].map((v) => (
            <div key={v.title} className=\"border-t border-[#D1CFC7] pt-6\">
              <v.icon size={28} strokeWidth={1.2} className=\"text-[#B85D43] mb-4\" />
              <h3 className=\"font-serif text-xl lg:text-2xl text-[#1B3B24] mb-2\">
                {v.title}
              </h3>
              <p className=\"text-sm text-[#4A4A4A]\">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className=\"px-6 md:px-12 lg:px-20 py-16 lg:py-24\">
        <div className=\"flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6\">
          <div>
            <p className=\"text-xs tracking-[0.25em] uppercase text-[#B85D43] mb-3\">
              Departments
            </p>
            <h2 className=\"font-serif text-4xl lg:text-5xl text-[#1B3B24] tracking-tight\">
              Wander the aisles.
            </h2>
          </div>
          <Link
            to=\"/shop\"
            data-testid=\"categories-shop-all\"
            className=\"text-sm tracking-wide text-[#1B3B24] hover:text-[#B85D43] transition-colors flex items-center gap-2\"
          >
            Browse everything
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className=\"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6\">
          {cats.map((c, i) => (
            <Link
              key={c.slug}
              to={`/shop/${c.slug}`}
              data-testid={`category-card-${c.slug}`}
              className={`relative overflow-hidden group aspect-square flex items-end p-5 border border-[#D1CFC7] ${
                i % 5 === 0 ? \"md:col-span-2 md:row-span-2 md:aspect-auto\" : \"\"
              }`}
            >
              <img
                src={c.image}
                alt={c.name}
                className=\"absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700\"
              />
              <div className=\"absolute inset-0 bg-gradient-to-t from-[#1B3B24]/80 via-[#1B3B24]/10 to-transparent\" />
              <div className=\"relative text-white\">
                <p className=\"text-[10px] tracking-[0.25em] uppercase opacity-80\">
                  {c.tagline}
                </p>
                <p className=\"font-serif text-2xl lg:text-3xl mt-1\">{c.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className=\"px-6 md:px-12 lg:px-20 py-16 lg:py-24 bg-[#F2EFEB]\">
        <div className=\"flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6\">
          <div>
            <p className=\"text-xs tracking-[0.25em] uppercase text-[#B85D43] mb-3\">
              This Week
            </p>
            <h2 className=\"font-serif text-4xl lg:text-5xl text-[#1B3B24] tracking-tight\">
              At their best, right now.
            </h2>
          </div>
        </div>

        {loading ? (
          <div className=\"grid grid-cols-2 lg:grid-cols-4 gap-6\">
            {[...Array(4)].map((_, i) => (
              <div key={i} className=\"aspect-[3/4] bg-[#E8E4DB] animate-pulse\" />
            ))}
          </div>
        ) : (
          <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8\">
            {featured.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* EDITORIAL CTA */}
      <section className=\"px-6 md:px-12 lg:px-20 py-20 lg:py-32\">
        <div className=\"max-w-3xl\">
          <p className=\"text-xs tracking-[0.25em] uppercase text-[#B85D43] mb-6\">
            Our Standard
          </p>
          <p className=\"font-serif text-3xl lg:text-5xl text-[#1B3B24] leading-tight tracking-tight\">
            We ask growers three questions before we list anything: <em className=\"italic text-[#B85D43]\">how</em> was it grown, <em className=\"italic text-[#B85D43]\">when</em> was it picked, and would you serve it to your own family tonight?
          </p>
          <Link
            to=\"/shop\"
            className=\"inline-flex items-center gap-2 mt-10 text-[#1B3B24] hover:text-[#B85D43] underline-offset-4 hover:underline tracking-wide\"
            data-testid=\"editorial-cta\"
          >
            Shop the standard
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
"
Observation: Create successful: /app/frontend/src/pages/Home.jsx
