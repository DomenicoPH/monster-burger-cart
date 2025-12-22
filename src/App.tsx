import Footer from "./components/Footer"
import Burger from "./components/Burger"
import Header from "./components/Header"
//hooks
import { useCart } from "./hooks/useCart.ts"
import { useReducer } from "react"
import { cartReducer, initialState } from "./reducers/cart-reducer.ts"

function App() {

  const { cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal } = useCart()
  const [ state, dispatch ] = useReducer(cartReducer, initialState)

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">

          <h2 className="text-center">Our Tasty Burgers!</h2>
          <h2 className="text-center slogan">We're tasty as hell!</h2>
          <div className="row mt-5">
            {state?.data.map((burger) => (
              <Burger 
                key={burger.id}
                burger={burger}
                dispatch={dispatch}
              />
            ))}
          </div>

      </main>

      <Footer />
      
    </>
  )
}

export default App