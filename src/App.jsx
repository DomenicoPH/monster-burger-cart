import { useState, useEffect } from "react"
import { db } from "./data/db"
import Footer from "./components/Footer"
import Burger from "./components/Burger"
import Header from "./components/Header"


function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data, setData] = useState([]);
  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 10;
  
  useEffect(() => {
    setData(db);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(item){

    const itemExists = cart.findIndex(burger => burger.id === item.id);
    if(itemExists >= 0){
      if(cart[itemExists].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item])
    }
  };

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(burger => burger.id !== id));
  };

  function decreaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item;
    })
    setCart(updatedCart);
  };

  function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item;
    })
    setCart(updatedCart);
  };

  function clearCart(){
    setCart([]);
  };

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">

          <h2 className="text-center">Our Tasty Burgers!</h2>
          <h2 className="text-center slogan">We're tasty as hell!</h2>
          <div className="row mt-5">
            {data.map((burger) => (
              <Burger 
                key={burger.id}
                burger={burger}
                addToCart={addToCart}
              />
            ))}
          </div>

      </main>

      <Footer />
      
    </>
  )
}

export default App