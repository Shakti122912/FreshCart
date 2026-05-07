Action: file_editor create /app/frontend/src/pages/OrderConfirmation.jsx --file-text "import React, { useEffect, useState } from \"react\";
import { Link, useParams } from \"react-router-dom\";
import { Check, ArrowRight, Truck } from \"lucide-react\";
import { fetchOrder } from \"../lib/api\";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className=\"px-6 md:px-12 lg:px-20 py-20 text-center\">
        <p className=\"text-[#4A4A4A]\">Pulling your order…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className=\"px-6 md:px-12 lg:px-20 py-20 text-center\">
        <p className=\"font-serif text-4xl text-[#1B3B24] mb-4\">Order not found</p>
        <Link
          to=\"/shop\"
          className=\"inline-flex items-center gap-2 mt-6 bg-[#1B3B24] text-white px-8 py-4 hover:bg-[#2C5A37]\"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div data-testid=\"order-confirmation-page\" className=\"px-6 md:px-12 lg:px-20 py-16 lg:py-24\">
      <div className=\"max-w-3xl mx-auto\">
        <div className=\"flex flex-col items-center text-center mb-12\">
          <div className=\"w-16 h-16 border-2 border-[#1B3B24] rounded-full flex items-center justify-center mb-6\">
            <Check size={28} strokeWidth={1.5} className=\"text-[#1B3B24]\" />
          </div>
          <p className=\"text-xs tracking-[0.25em] uppercase text-[#B85D43] mb-3\">
            Order Confirmed
          </p>
          <h1 className=\"font-serif text-4xl lg:text-6xl text-[#1B3B24] tracking-tighter\">
            Thanks, {order.customer_name.split(\" \")[0]}.
          </h1>
          <p className=\"text-[#4A4A4A] mt-4 max-w-md\">
            We've sent a confirmation to <strong>{order.email}</strong>.
            Your courier will arrive between 11am and 6pm today.
          </p>
          <p data-testid=\"order-id\" className=\"mt-6 text-xs tracking-[0.18em] uppercase text-[#4A4A4A]\">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <div className=\"border border-[#D1CFC7] bg-[#F2EFEB] p-6 lg:p-8 mb-8\">
          <div className=\"flex items-start gap-4 mb-6 pb-6 border-b border-[#D1CFC7]\">
            <Truck size={22} strokeWidth={1.5} className=\"text-[#B85D43] mt-1\" />
            <div>
              <p className=\"font-serif text-xl text-[#1B3B24]\">Delivering to</p>
              <p className=\"text-sm text-[#4A4A4A] mt-1\">
                {order.address}, {order.city} {order.zip_code}
              </p>
            </div>
          </div>

          <ul className=\"divide-y divide-[#D1CFC7]\">
            {order.items.map((i) => (
              <li key={i.product_id} className=\"flex gap-4 py-4\">
                <div className=\"w-16 h-16 bg-[#FAF9F6] overflow-hidden flex-shrink-0\">
                  <img src={i.image} alt={i.name} className=\"w-full h-full object-cover\" />
                </div>
                <div className=\"flex-1 min-w-0\">
                  <p className=\"font-serif text-base text-[#1B3B24]\">{i.name}</p>
                  <p className=\"text-xs text-[#4A4A4A]\">
                    {i.unit} · ×{i.quantity}
                  </p>
                </div>
                <span className=\"font-medium text-[#1B3B24]\">
                  ${(i.price * i.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className=\"mt-6 space-y-2 text-sm border-t border-[#D1CFC7] pt-5\">
            <div className=\"flex justify-between text-[#4A4A4A]\">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className=\"flex justify-between text-[#4A4A4A]\">
              <span>Delivery</span>
              <span>
                {order.delivery_fee === 0 ? (
                  <span className=\"text-[#7A8B56]\">Free</span>
                ) : (
                  `$${order.delivery_fee.toFixed(2)}`
                )}
              </span>
            </div>
            <div className=\"flex justify-between pt-3 border-t border-[#D1CFC7] mt-3 font-medium text-base text-[#1B3B24]\">
              <span>Total paid on delivery</span>
              <span data-testid=\"confirmation-total\">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className=\"flex justify-center\">
          <Link
            to=\"/shop\"
            data-testid=\"continue-shopping-link\"
            className=\"inline-flex items-center gap-2 bg-[#1B3B24] text-white px-8 py-4 hover:bg-[#2C5A37] transition-colors tracking-wide\"
          >
            Continue shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
"
Observation: Create successful: /app/frontend/src/pages/OrderConfirmation.jsx
