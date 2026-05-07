Action: file_editor create /app/frontend/src/components/CartDrawer.jsx --file-text "import React from \"react\";
import { useNavigate } from \"react-router-dom\";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from \"./ui/sheet\";
import { useCart } from \"../context/CartContext\";
import { Minus, Plus, Trash2, ShoppingBag } from \"lucide-react\";

export default function CartDrawer() {
  const {
    open,
    setOpen,
    items,
    updateQty,
    removeItem,
    subtotal,
    deliveryFee,
    total,
  } = useCart();
  const navigate = useNavigate();

  const checkout = () => {
    setOpen(false);
    navigate(\"/checkout\");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        data-testid=\"cart-drawer\"
        className=\"bg-[#FAF9F6] border-l border-[#D1CFC7] w-full sm:max-w-md p-0 flex flex-col\"
      >
        <SheetHeader className=\"px-6 py-5 border-b border-[#D1CFC7]\">
          <SheetTitle className=\"font-serif text-2xl text-[#1B3B24] tracking-tight\">
            Your Basket
          </SheetTitle>
          <p className=\"text-xs tracking-[0.18em] uppercase text-[#B85D43]\">
            {items.length} {items.length === 1 ? \"item\" : \"items\"}
          </p>
        </SheetHeader>

        <div className=\"flex-1 overflow-y-auto px-6 py-4\">
          {items.length === 0 ? (
            <div
              data-testid=\"empty-cart\"
              className=\"flex flex-col items-center justify-center text-center py-20 text-[#4A4A4A]\"
            >
              <ShoppingBag size={36} strokeWidth={1.2} className=\"mb-4 text-[#7A8B56]\" />
              <p className=\"font-serif text-2xl text-[#1B3B24] mb-2\">Your basket is empty</p>
              <p className=\"text-sm\">Add a few good things from the market.</p>
            </div>
          ) : (
            <ul className=\"divide-y divide-[#D1CFC7]\">
              {items.map((i) => (
                <li
                  key={i.product_id}
                  data-testid={`cart-item-${i.product_id}`}
                  className=\"flex gap-4 py-5\"
                >
                  <div className=\"w-20 h-20 bg-[#F2EFEB] overflow-hidden flex-shrink-0\">
                    <img
                      src={i.image}
                      alt={i.name}
                      className=\"w-full h-full object-cover\"
                    />
                  </div>
                  <div className=\"flex-1 min-w-0\">
                    <div className=\"flex justify-between gap-2\">
                      <h4 className=\"font-serif text-lg leading-tight text-[#1B3B24]\">
                        {i.name}
                      </h4>
                      <button
                        data-testid={`remove-${i.product_id}`}
                        onClick={() => removeItem(i.product_id)}
                        className=\"text-[#4A4A4A] hover:text-[#B91C1C]\"
                        aria-label=\"Remove\"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className=\"text-xs text-[#4A4A4A] mt-1\">{i.unit}</p>
                    <div className=\"flex items-center justify-between mt-3\">
                      <div className=\"flex items-center border border-[#D1CFC7]\">
                        <button
                          data-testid={`dec-${i.product_id}`}
                          onClick={() => updateQty(i.product_id, i.quantity - 1)}
                          className=\"w-8 h-8 flex items-center justify-center hover:bg-[#F2EFEB]\"
                        >
                          <Minus size={14} />
                        </button>
                        <span className=\"w-8 text-center text-sm\">
                          {i.quantity}
                        </span>
                        <button
                          data-testid={`inc-${i.product_id}`}
                          onClick={() => updateQty(i.product_id, i.quantity + 1)}
                          className=\"w-8 h-8 flex items-center justify-center hover:bg-[#F2EFEB]\"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className=\"font-medium text-[#1B3B24]\">
                        ${(i.price * i.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className=\"border-t border-[#D1CFC7] px-6 py-5 bg-[#F2EFEB]\">
            <div className=\"space-y-2 text-sm\">
              <div className=\"flex justify-between\">
                <span className=\"text-[#4A4A4A]\">Subtotal</span>
                <span data-testid=\"cart-subtotal\">${subtotal.toFixed(2)}</span>
              </div>
              <div className=\"flex justify-between\">
                <span className=\"text-[#4A4A4A]\">Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className=\"text-[#7A8B56]\">Free</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className=\"flex justify-between pt-3 border-t border-[#D1CFC7] mt-3 font-medium text-base text-[#1B3B24]\">
                <span>Total</span>
                <span data-testid=\"cart-total\">${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              data-testid=\"checkout-button\"
              onClick={checkout}
              className=\"w-full mt-5 bg-[#1B3B24] text-white py-4 hover:bg-[#2C5A37] transition-colors font-medium tracking-wide\"
            >
              Continue to Checkout
            </button>
            <p className=\"text-[10px] tracking-[0.18em] uppercase text-center text-[#4A4A4A] mt-3\">
              Free delivery over $50 · Cash on delivery available
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
"
Observation: Create successful: /app/frontend/src/components/CartDrawer.jsx
