Action: file_editor create /app/frontend/src/components/ProductCard.jsx --file-text "import React from \"react\";
import { Plus } from \"lucide-react\";
import { useCart } from \"../context/CartContext\";
import { toast } from \"sonner\";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const onAdd = () => {
    addItem(product, 1);
    toast.success(`${product.name} added to basket`, {
      description: `$${product.price.toFixed(2)} · ${product.unit}`,
    });
  };

  return (
    <article
      data-testid={`product-card-${product.id}`}
      className=\"bg-transparent border border-[#D1CFC7] p-5 flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all duration-300\"
    >
      <div className=\"relative aspect-square overflow-hidden bg-[#F2EFEB]\">
        <img
          src={product.image}
          alt={product.name}
          className=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out\"
          loading=\"lazy\"
        />
        {product.badge && (
          <span className=\"absolute top-3 left-3 bg-[#FAF9F6] text-[#1B3B24] text-[10px] tracking-[0.18em] uppercase px-2 py-1\">
            {product.badge}
          </span>
        )}
      </div>
      <div className=\"pt-5 flex-1 flex flex-col\">
        <h3 className=\"font-serif text-xl text-[#1B3B24] leading-tight\">
          {product.name}
        </h3>
        <p className=\"text-xs text-[#4A4A4A] mt-1 line-clamp-2 flex-1\">
          {product.description}
        </p>
        <div className=\"flex items-end justify-between mt-4\">
          <div>
            <p className=\"font-medium text-[#1B3B24] text-lg\">
              ${product.price.toFixed(2)}
            </p>
            <p className=\"text-[11px] uppercase tracking-[0.18em] text-[#4A4A4A]\">
              {product.unit}
            </p>
          </div>
          <button
            data-testid={`add-to-cart-${product.id}`}
            onClick={onAdd}
            aria-label={`Add ${product.name} to basket`}
            className=\"w-11 h-11 border border-[#1B3B24] text-[#1B3B24] hover:bg-[#1B3B24] hover:text-[#FAF9F6] transition-colors flex items-center justify-center\"
          >
            <Plus size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
"
Observation: Create successful: /app/frontend/src/components/ProductCard.jsx
