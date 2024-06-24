import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductsList } from '../helpers/ProductsList';
import { categories } from '../helpers/category';
import classes from '../style/shop.module.css';
import '../style/Products.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Products({ searchTerm }) {
  const [selectedCategory, setCategory] = useState(null);
  const [searchTermLocal, setSearchTermLocal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [resetPage, setResetPage] = useState(false); // State để đặt lại trang khi chọn category hoặc thay đổi search term
  const productsPerPage = 3;

  const onClickCategoryHandler = (cat_id) => {
    setCategory(cat_id);
    setResetPage(true);
  };

  const showAllCategories = () => {
    setCategory(null);
    setResetPage(true);
  };

  const handleSearchTermChange = (event) => {
    setSearchTermLocal(event.target.value);
    setResetPage(true);
  };

  useEffect(() => {
    // Đặt lại trang khi category hoặc search term thay đổi
    setCurrentPage(1);
    setResetPage(false);
  }, [selectedCategory, searchTermLocal]);

  let filteredProduct = [...ProductsList];

  if (searchTermLocal) {
    filteredProduct = filteredProduct.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTermLocal.toLowerCase())
    );
  } else if (selectedCategory !== null) {
    filteredProduct = filteredProduct.filter(
      (product) => product.category_id === selectedCategory
    );
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProduct.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className='productsTitle'></h1>
      <div className={classes.layout}>
        <div className={classes.left}>
          <input
            className={classes.search}
            type='text'
            placeholder='Search products...'
            value={searchTermLocal}
            onChange={handleSearchTermChange}
          />
          <h2 className={classes.text1}>Categories</h2>
          <div className={classes.cat} onClick={() => showAllCategories()}>
            All Products
          </div>
          {categories.map((cate) => (
            <div
              className={classes.cat}
              key={cate.id}
              onClick={() => onClickCategoryHandler(cate.id)}
            >
              {cate.name}
            </div>
          ))}
        </div>

        <div className={classes.right}>
          <h2>Products</h2>
          <div className={classes.boxes}>
            {currentProducts.map((ProductsList) => (
              <Link
                to={`/product/${ProductsList.id}`}
                className={`${classes.ProductsList} ${classes.linkWithoutUnderline}`}
                key={ProductsList.id}
              >
                <div className={classes.item3}>
                <div className={classes.item1}>
                  <img
                    src={ProductsList.products_image}
                    className={classes.prodimg}
                    alt={ProductsList.name}
                  /></div>
                  <div className={classes.item2}>
                    <h1>{ProductsList.name}</h1>
                    <h3>${ProductsList.price}</h3>
                    <h4>{ProductsList.brand}</h4>
                  </div>
                  </div>
                
              </Link>
            ))}
          </div>

          <ul className={classes.pagination}>
            {pageNumbers.map((number) => (
              <li key={number} className={classes.pageItem}>
                <a
                  onClick={() => paginate(number)}
                  href='#'
                  className={currentPage === number ? classes.active : ''}
                >
                  {number}
                </a>
                <p className={classes.text4}></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Products;
