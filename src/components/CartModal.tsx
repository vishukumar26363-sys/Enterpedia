import { X, Trash2, ShoppingBag } from "lucide-react";
import { CartItem } from "../types";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
}: CartModalProps) {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-transform duration-500 ease-in-out">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2
                    className="text-2xl font-display font-bold text-slate-900 flex items-center"
                    id="slide-over-title"
                  >
                    <ShoppingBag className="mr-3 h-6 w-6 text-violet-600" />
                    Shopping Cart
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="relative -m-2 p-2 text-slate-400 hover:text-slate-500 transition-colors"
                      onClick={onClose}
                    >
                      <span className="absolute -inset-0.5"></span>
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                          <ShoppingBag className="h-10 w-10 text-slate-300" />
                        </div>
                        <p className="text-slate-500 text-lg font-medium">
                          Your cart is empty.
                        </p>
                        <button
                          onClick={onClose}
                          className="mt-6 text-violet-600 hover:text-violet-700 font-semibold"
                        >
                          Continue Shopping &rarr;
                        </button>
                      </div>
                    ) : (
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-slate-100"
                      >
                        {cartItems.map((item) => (
                          <li key={item.product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200">
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-bold text-slate-900">
                                  <h3 className="line-clamp-2 pr-4 font-display">
                                    <a href="#">{item.product.title}</a>
                                  </h3>
                                  <p className="ml-4 whitespace-nowrap">
                                    $
                                    {(
                                      item.product.price * item.quantity
                                    ).toFixed(2)}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-slate-500 font-medium">
                                  {item.product.category}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                                  <button
                                    onClick={() =>
                                      onUpdateQuantity(
                                        item.product.id,
                                        Math.max(1, item.quantity - 1),
                                      )
                                    }
                                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-l-lg transition-colors"
                                  >
                                    -
                                  </button>
                                  <span className="px-4 py-1.5 text-slate-900 font-semibold border-x border-slate-200 bg-white">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      onUpdateQuantity(
                                        item.product.id,
                                        item.quantity + 1,
                                      )
                                    }
                                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-r-lg transition-colors"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onRemoveItem(item.product.id)
                                    }
                                    className="font-semibold text-rose-500 hover:text-rose-600 flex items-center transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1.5" />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-slate-100 px-4 py-6 sm:px-6 bg-slate-50">
                  <div className="flex justify-between text-base font-bold text-slate-900 mb-4">
                    <p>Subtotal</p>
                    <p className="text-2xl font-display">${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500 mb-6 font-medium">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-2xl border border-transparent bg-slate-900 px-6 py-4 text-base font-bold text-white shadow-lg shadow-slate-900/20 hover:bg-violet-600 transition-all duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(
                          "Checkout functionality would be implemented here.",
                        );
                      }}
                    >
                      Checkout Securely
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-slate-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        className="font-bold text-violet-600 hover:text-violet-700"
                        onClick={onClose}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
