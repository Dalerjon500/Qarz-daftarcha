import ProductList from "./ProductList";

function Products() {
    return (
        <div className="products">
            <div className="products-container">
                <div className="selling-products-title">
                    <h1>New Products</h1>
                </div>
                <ProductList/>
            </div>
        </div>
    );
}

export default Products;