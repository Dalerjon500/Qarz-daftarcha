import { FaShoppingCart, FaTrash, FaArrowLeft, FaCreditCard, FaTag } from 'react-icons/fa';
import { IoBagCheckOutline } from 'react-icons/io5';
import useContextPro from '../../hooks/useContextPro';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const { state: { cart }, dispatch } = useContextPro();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const totalSavings = cart.reduce((total, item) => total + (item.oldPrice - item.price), 0);
    const navigate = useNavigate();
    const handleCheckout = () => {
        alert('Proceeding to checkout!');
    };

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1 className="cart-title">
                    <FaShoppingCart className="cart-title-icon" />
                    Shopping Cart
                </h1>
                
                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-cart-icon">🛒</div>
                        <p>Your cart is feeling lonely 😔</p>
                        <button 
                            className="continue-shopping-btn"
                            onClick={ () => navigate('/') }
                        >
                            <FaArrowLeft className="btn-icon" />
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.imageUrl} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h2 className="item-name">{item.name}</h2>
                                        <p className="item-description">{item.description}</p>
                                        <div className="price-container">
                                            <span className="current-price">${item.price.toFixed(2)}</span>
                                            {item.oldPrice && item.oldPrice > item.price && (
                                                <span className="old-price">${item.oldPrice.toFixed(2)}</span>
                                            )}
                                        </div>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                                        >
                                            <FaTrash className="btn-icon" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="cart-summary">
                            <div className="summary-card">
                                <h3>
                                    <IoBagCheckOutline className="summary-icon" />
                                    Order Summary
                                </h3>
                                <div className="summary-line">
                                    <span>Items ({cart.length})</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                {totalSavings > 0 && (
                                    <div className="summary-line savings">
                                        <span>
                                            <FaTag className="savings-icon" />
                                            Savings
                                        </span>
                                        <span>-${totalSavings.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="summary-line total">
                                    <span>Total Amount</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <button className="checkout-btn" onClick={handleCheckout}>
                                    <FaCreditCard className="btn-icon" />
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage;