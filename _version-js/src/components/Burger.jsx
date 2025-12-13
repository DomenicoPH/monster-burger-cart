import { FiShoppingCart } from "react-icons/fi";

export default function Burger({burger, addToCart}){

    const {id, name, image, description, price} = burger;

    return(
        <div className="col-md-6 col-lg-4 my-4 col align-items-center">
            <div className="col-8">
                <img className="img-fluid rounded-xl" src={`/img/${image}.png`} alt="imagen burger" />
            </div>
            <div className="col-8">
                <h3 className="text-red fs-4 fw-bold text-uppercase product-name">{name}</h3>
                <p className="description-height">{description}</p>
                <p className="fw-black text-primary fs-3 text-end">${price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(burger)}
                >Agregar al Carrito <FiShoppingCart /></button>
            </div>
        </div>
    )
};