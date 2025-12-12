import { useMemo } from "react";
import { FaHamburger } from "react-icons/fa";

export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) {
  // State derivado
  const isEmpty = cart.length === 0;
  const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.price * item.quantity), 0 ), [cart]);

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html" className="d-flex align-items-center gap-3">
              <div className="text-yellow px-1"><FaHamburger size={110} /></div>
              <h2 className="m-0 lh-3">Monster Burger</h2>
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">The cart is empty</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th className="cart-product-name">Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((burger) => (
                          <tr key={burger.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${burger.image}.png`}
                                alt="burger image"
                              />
                            </td>
                            <td>{burger.name}</td>
                            <td className="fw-bold">${burger.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button 
                                type="button" 
                                className="btn btn-dark"
                                onClick={() => decreaseQuantity(burger.id)}
                              >
                                -
                              </button>
                              {burger.quantity}
                              <button 
                                type="button" 
                                className="btn btn-dark"
                                onClick={() => increaseQuantity(burger.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button 
                                className="btn btn-danger" 
                                type="button"
                                onClick={() => removeFromCart(burger.id)}  
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end totalAPagar">
                      Total: <span className="fw-bold total">${cartTotal.toFixed(2)}</span>
                    </p>
                  </>
                )}

                <button 
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                >
                  Empty Cart
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
