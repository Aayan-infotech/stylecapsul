import React, { useState } from "react";
import shirt from "../../assets/cart/shirt.png";
import shirt2 from "../../assets/cart/shirt2.png";
import "../../styles/Cart.scss";

const initialProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    price: 50,
    image: shirt2,
    quantity: 1,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    price: 70,
    image: shirt,
    quantity: 1,
  },
];

const Cart = () => {
  const [products, setProducts] = useState(initialProducts);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleQuantityChange = (id, delta) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      )
    );
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const subTotal = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const discount = couponApplied ? 50 : 0;
  const total = subTotal - discount;

  return (
    <div className="d-flex justify-content-center align-items-center cart-container">
      <div className="container">
        <h1 className="text-center fw-bold fs-1">Cart</h1>
        <div className="row mt-4">
          <div className="col-12 col-md-6">
            <div className="row g-2">
              {products.map((product) => (
                <div key={product.id} className="col-12">
                  <div className="card w-100">
                    <div className="card-body text-white">
                      <div className="d-flex">
                        <div className="me-3">
                          <img src={product.image} height={120} width={100} alt={product.name} />
                        </div>
                        <div>
                          <h5 className="card-title">{product.name}</h5>
                          <h6 style={{ fontWeight: "initial" }}>{product.description}</h6>
                          <h6 className="card-text">${product.price}</h6>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center p-2 add-card-product">
                              <div
                                className="decrement-count px-1"
                                onClick={() => handleQuantityChange(product.id, -1)}
                              >
                                -
                              </div>
                              <div className="decrement-count px-1">{product.quantity}</div>
                              <div
                                className="increment-count px-1"
                                onClick={() => handleQuantityChange(product.id, 1)}
                              >
                                +
                              </div>
                            </div>
                            <i
                              className="far fa-trash-alt"
                              aria-hidden="true"
                              onClick={() => handleRemoveProduct(product.id)}
                              style={{ cursor: 'pointer' }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-between align-items-center">
            <div className="">
              <h5 className="text-center fw-bold fs-5">Apply Coupon Code</h5>
              <div
                className="card text-white position-relative"
                style={{ width: "350px" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>Sub Total:</div>
                    <div>
                      <h6 className="fs-6">${subTotal}</h6>
                      <h6 className="fs-6 text-white-50">-${discount}</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>Total</div>
                    <h6 className="fs-6">${total}</h6>
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark rounded-pill checkout-button"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
