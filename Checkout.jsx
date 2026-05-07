
Action: file_editor create /app/frontend/src/pages/Checkout.jsx --file-text "import React, { useState } from \"react\";
import { useNavigate, Link } from \"react-router-dom\";
import { useCart } from \"../context/CartContext\";
import { createOrder } from \"../lib/api\";
import { toast } from \"sonner\";
import { ArrowLeft, Lock } from \"lucide-react\";

export default function Checkout() {
  const { items, subtotal, deliveryFee, total, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customer_name: \"\",
    email: \"\",
    phone: \"\",
    address: \"\",
    city: \"\",
    zip_code: \"\",
    notes: \"\",
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error(\"Your basket is empty\");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        items,
        subtotal,
        delivery_fee: deliveryFee,
        total,
      };
      const order = await createOrder(payload);
      clear();
      navigate(`/order/${order.id}`);
    } catch (err) {
      toast.error(\"Could not place order. Please try again.\");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className=\"px-6 md:px-12 lg:px-20 py-20 text-center\">
        <p className=\"font-serif text-4xl text-[#1B3B24] mb-4\">Your basket is empty</p>
        <p className=\"text-[#4A4A4A] mb-8\">Add a few good things first.</p>
        <Link
          to=\"/shop\"
          data-testid=\"back-to-shop-empty\"
          className=\"inline-flex items-center gap-2 bg-[#1B3B24] text-white px-8 py-4 hover:bg-[#2C5A37] transition-colors\"
        >
          Browse the market
        </Link>
      </div>
    );
  }

  return (
    <div data-testid=\"checkout-page\" className=\"px-6 md:px-12 lg:px-20 py-12 lg:py-16\">
      <Link
        to=\"/shop\"
        data-testid=\"checkout-back-link\"
        className=\"inline-flex items-center gap-2 text-sm text-[#1B3B24] hover:text-[#B85D43] mb-8\"
      >
        <ArrowLeft size={16} />
        Continue shopping
      </Link>

      <div className=\"grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20\">
        <div className=\"lg:col-span-7\">
          <p className=\"text-xs tracking-[0.25em] uppercase text-[#B85D43] mb-3\">
            Step 1 of 1
          </p>
          <h1 className=\"font-serif text-4xl lg:text-6xl text-[#1B3B24] tracking-tighter mb-10\">
            Checkout
          </h1>

          <form onSubmit={submit} className=\"space-y-8\" data-testid=\"checkout-form\">
            <fieldset>
              <legend className=\"text-xs tracking-[0.2em] uppercase text-[#1B3B24] mb-5\">
                Contact
              </legend>
              <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
                <Field
                  label=\"Full name\"
                  required
                  testid=\"input-name\"
                  value={form.customer_name}
                  onChange={update(\"customer_name\")}
                />
                <Field
                  label=\"Phone\"
                  type=\"tel\"
                  required
                  testid=\"input-phone\"
                  value={form.phone}
                  onChange={update(\"phone\")}
                />
                <div className=\"md:col-span-2\">
                  <Field
                    label=\"Email\"
                    type=\"email\"
                    required
                    testid=\"input-email\"
                    value={form.email}
                    onChange={update(\"email\")}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className=\"text-xs tracking-[0.2em] uppercase text-[#1B3B24] mb-5\">
                Delivery
              </legend>
              <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
                <div className=\"md:col-span-2\">
                  <Field
                    label=\"Address\"
                    required
                    testid=\"input-address\"
                    value={form.address}
                    onChange={update(\"address\")}
                  />
                </div>
                <Field
                  label=\"City\"
                  required
                  testid=\"input-city\"
                  value={form.city}
                  onChange={update(\"city\")}
                />
                <Field
                  label=\"ZIP code\"
                  required
                  testid=\"input-zip\"
                  value={form.zip_code}
                  onChange={update(\"zip_code\")}
                />
                <div className=\"md:col-span-2\">
                  <label className=\"block\">
                    <span className=\"text-sm text-[#4A4A4A]\">Notes (optional)</span>
                    <textarea
                      data-testid=\"input-notes\"
                      value={form.notes}
                      onChange={update(\"notes\")}
                      rows={3}
                      placeholder=\"Gate code, doorman, allergies…\"
                      className=\"w-full bg-transparent border-b-2 border-[#D1CFC7] py-3 px-0 mt-1 focus:outline-none focus:border-[#1B3B24] resize-none\"
                    />
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className=\"text-xs tracking-[0.2em] uppercase text-[#1B3B24] mb-5\">
                Payment
              </legend>
              <div className=\"border border-[#D1CFC7] p-6 bg-[#F2EFEB] flex items-start gap-4\">
                <Lock size={20} strokeWidth={1.5} className=\"text-[#1B3B24] mt-1\" />
                <div>
                  <p className=\"font-serif text-lg text-[#1B3B24]\">Cash on Delivery</p>
                  <p className=\"text-sm text-[#4A4A4A] mt-1\">
                    Pay your courier in cash or card on arrival. Online payment coming soon.
                  </p>
                </div>
              </div>
            </fieldset>

            <button
              type=\"submit\"
              data-testid=\"place-order-button\"
              disabled={submitting}
              className=\"w-full bg-[#1B3B24] text-white py-5 hover:bg-[#2C5A37] transition-colors font-medium tracking-wide disabled:opacity-50\"
            >
              {submitting ? \"Placing order…\" : `Place order · $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Summary */}
        <aside className=\"lg:col-span-5\">
          <div className=\"lg:sticky lg:top-32 border border-[#D1CFC7] bg-[#F2EFEB] p-6 lg:p-8\">
            <h3 className=\"font-serif text-2xl text-[#1B3B24] mb-6\">Order Summary</h3>
            <ul className=\"divide-y divide-[#D1CFC7]\">
              {items.map((i) => (
                <li
                  key={i.product_id}
                  data-testid={`summary-item-${i.product_id}`}
                  className=\"flex gap-4 py-4\"
                >
                  <div className=\"w-16 h-16 bg-[#FAF9F6] overflow-hidden flex-shrink-0\">
                    <img src={i.image} alt={i.name} className=\"w-full h-full object-cover\" />
                  </div>
                  <div className=\"flex-1 min-w-0\">
                    <p className=\"font-serif text-base text-[#1B3B24] leading-tight\">
                      {i.name}
                    </p>
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
              <Row label=\"Subtotal\" value={`$${subtotal.toFixed(2)}`} />
              <Row
                label=\"Delivery\"
                value={
                  deliveryFee === 0 ? (
                    <span className=\"text-[#7A8B56]\">Free</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )
                }
              />
              <Row
                strong
                label=\"Total\"
                value={`$${total.toFixed(2)}`}
                testid=\"summary-total\"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, type = \"text\", value, onChange, required, testid }) {
  return (
    <label className=\"block\">
      <span className=\"text-sm text-[#4A4A4A]\">{label}</span>
      <input
        data-testid={testid}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className=\"w-full bg-transparent border-b-2 border-[#D1CFC7] py-3 px-0 mt-1 focus:outline-none focus:border-[#1B3B24]\"
      />
    </label>
  );
}

function Row({ label, value, strong, testid }) {
  return (
    <div
      className={`flex justify-between ${
        strong ? \"pt-3 border-t border-[#D1CFC7] mt-3 font-medium text-[#1B3B24] text-base\" : \"\"
      }`}
    >
      <span className={strong ? \"\" : \"text-[#4A4A4A]\"}>{label}</span>
      <span data-testid={testid}>{value}</span>
    </div>
  );
}
"
Observation: Create successful: /app/frontend/src/pages/Checkout.jsx
