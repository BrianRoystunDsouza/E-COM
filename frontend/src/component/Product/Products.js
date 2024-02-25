import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import Rating from '@mui/material/Rating';
import { Button } from "@material-ui/core";

const categories = [
  "Swimsuit",
  "Coat",
  "Sportswear",
  "Sleepwear",
  "Jeans",
  "Sweater",
  "Hoodie",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    console.log(event.target.value,   newPrice);
    setPrice(newPrice);
  };
  let count = filteredProductsCount;
  
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
     // eslint-disable-next-line
  }, [dispatch, currentPage, alert]);

  const handleFilter = (() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));

  })
  const handleCancel= (()=>{
    setRatings(0)
    setCategory('')
    setPrice(0)
    dispatch(getProduct(keyword,currentPage, 0, '', 0));

  })
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>

            <Slider
            onChange={priceHandler}
             defaultValue={0} 
             aria-label="Default"
             max={2500}
              valueLabelDisplay="auto" />

            <Typography>Categories</Typography>

            <select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="selectDropDown"

              value={category}
              label="Categories"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option key={1}> All type </option>
              {categories.map((category) => (
                <option
                  key={category}
                >
                  {category}
                </option>
              ))}
            </select>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>

              <Rating
                name="simple-controlled"
                value={ratings}
                onChange={(event, newValue) => {
                  setRatings(newValue || 0);
                }}
              />
            </fieldset>
            <div style={{ display: 'flex' }}>
              <Button style={{ marginTop: 10, textTransform: 'capitalize', fontSize: 10 }} onClick={handleFilter} variant="outlined">Apply Filter</Button>
              <Button style={{ marginTop: 10, }} variant="outlined" onClick={handleCancel}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </Button>
            </div>

          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
