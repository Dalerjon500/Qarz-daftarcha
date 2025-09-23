import FilterCategories from "../product/FilterCategories";
import ProductList from "../product/ProductList";

function SellingProducts() {
  return (
    <div className="selling-products">
        <div className="selling-products-container">
            <div className="selling-products-title">
                <h1 >Best Selling Products</h1>
            </div>
            <FilterCategories/>
            <ProductList />
        </div>
    </div>
  )
}

export default SellingProducts