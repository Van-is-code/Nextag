import React, { useState } from 'react';
import { ProductsList } from '../helpers/ProductsList'; // Điều chỉnh đường dẫn tệp dữ liệu
import '../style/compare.css';

const ProductComparison = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hasSearchResults, setHasSearchResults] = useState(true);
  const [resetComparison, setResetComparison] = useState(false);

  const toggleProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSearchChange = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);

    // Kiểm tra xem có kết quả tìm kiếm hay không
    setHasSearchResults(keyword.trim() !== ''); // Ẩn khi keyword là chuỗi rỗng hoặc chỉ chứa khoảng trắng
  };

  const renderProducts = () => {
    const filteredProducts = ProductsList.filter((product) =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  
    // Kiểm tra xem có kết quả tìm kiếm hay không và searchKeyword không rỗng
    const shouldDisplayProducts = hasSearchResults && searchKeyword.trim() !== '';
  
    return (
      <div className="product-list">
        {shouldDisplayProducts ? (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={`product ${selectedProducts.includes(product.id) ? 'selected' : ''}`} onClick={() => toggleProduct(product.id)}>
                <h3>{product.name}</h3>
                <div className="product-image" style={{ backgroundImage: `url(${product.products_image})` }}></div>
                <p>${product.price}</p>
              </div>
            ))
          ) : (
            <h4>No products found.</h4>
          )
        ) : (
          <h4 className='text2'>Start typing to search for products.</h4>
        )}
      </div>
    );
  };

  const renderComparisonDetails = () => {
    const selectedProductsDetails = selectedProducts
      .map((productId) => ProductsList.find((product) => product.id === productId));

    if (selectedProductsDetails.length !== 2) {
      return <h4>Select exactly two products to compare.</h4>;
    }

    const [product1, product2] = selectedProductsDetails;

    return (
      <div className="comparison-details">
        <div className="product-details">
          <h2>{product1.name}</h2>
          <div className="product-image" style={{ backgroundImage: `url(${product1.products_image})` }}></div>
          <p>${product1.price}</p>
          
          <table>
            <tr>
              <th><p>Brand: {product1.brand}</p></th>
            </tr>
            <tr>
              <td><p>Styles: {product1.styles}</p></td>
            </tr>
            <tr>
              <td><p>Origin: {product1.origin}</p></td>
            </tr>
            <tr>
             <td><p>Dimension: {product1.dimension}</p></td>
            </tr>
            <tr>
             <td> <p>Material: {product1.material}</p></td>
            </tr>
          </table>
        </div>
        <div className="product-details">
          <h2>{product2.name}</h2>
          <div className="product-image" style={{ backgroundImage: `url(${product2.products_image})` }}></div>
          <p>${product2.price}</p>
          <table>
            <tr>
              <th><p>Brand: {product2.brand}</p></th>
            </tr>
            <tr>
              <td><p>Styles: {product2.styles}</p></td>
            </tr>
            <tr>
              <td><p>Origin: {product2.origin}</p></td>
            </tr>
            <tr>
             <td><p>Dimension: {product2.dimension}</p></td>
            </tr>
            <tr>
             <td> <p>Material: {product2.material}</p></td>
            </tr>
          </table>
        </div>
      </div>
    );
  };

  const resetComparisonState = () => {
    setSelectedProducts([]);
    setResetComparison(true);
    setSearchKeyword('');
    setTimeout(() => {
      setResetComparison(false);
    }, 1000);
  };

  const renderResetMessage = () => {
    if (resetComparison) {
      return <h4>Comparison has been reset.</h4>;
    }
    return null;
  };

  return (
    <div className="app">
      <h1>Product Comparison</h1>

      {/* Tìm kiếm */}
      <input className='search' type="text" placeholder="Search products..." value={searchKeyword} onChange={handleSearchChange} />

      {/* Nút Bỏ So Sánh */}
      <button className="reset-button" onClick={resetComparisonState}>Reset</button>

      {/* Thông báo đặt lại */}
      {renderResetMessage()}

      {/* Chi tiết so sánh */}
      <div className="comparison-details">{renderComparisonDetails()}</div>

      {/* Danh sách sản phẩm */}
      <div className="product-list">{renderProducts()}</div>
    </div>
  );
};

export default ProductComparison;
