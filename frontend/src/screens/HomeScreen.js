import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <Row className="mt-3">
        <h1 className="latestProducts">Latest Products</h1>

        <DropdownButton
          id="dropdown-button-dark-example2"
          variant="secondary"
          menuVariant="dark"
          title="Sort"
          className="mr-3"
        >
          <Dropdown.Item href="#/action-1" active>
            Relevance
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Price - High to Low</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Price - Low to High</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-4">Rating</Dropdown.Item>
        </DropdownButton>

        <DropdownButton
          id="dropdown-button-dark-example2"
          variant="secondary"
          menuVariant="dark"
          title="Filter"
          className="sortDropdown mr-3"
        >
          <Dropdown.Item href="#/action-1" active disabled>
            Price
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-2">Under ₹1000</Dropdown.Item>
          <Dropdown.Item href="#/action-3">₹1000 - ₹2000</Dropdown.Item>
          <Dropdown.Item href="#/action-4">Over ₹2000</Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item href="#/action-1" active disabled>
            Rating
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-2">5 star</Dropdown.Item>
          <Dropdown.Item href="#/action-3">4 star</Dropdown.Item>
          <Dropdown.Item href="#/action-4">3 star</Dropdown.Item>
          <Dropdown.Item href="#/action-4">2 star</Dropdown.Item>
          <Dropdown.Item href="#/action-4">1 star</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-1" active disabled>
            Size
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-2">S</Dropdown.Item>
          <Dropdown.Item href="#/action-3">M</Dropdown.Item>
          <Dropdown.Item href="#/action-4">L</Dropdown.Item>
          <Dropdown.Item href="#/action-4">XL</Dropdown.Item>
          <Dropdown.Item href="#/action-4">XXL</Dropdown.Item>

        </DropdownButton>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
