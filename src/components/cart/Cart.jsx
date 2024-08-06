import React, { useState } from "react";
import shirt from "../../assets/cart/shirt.png";
import shirt2 from "../../assets/cart/shirt2.png";
import "../../styles/Cart.css";

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
    <div>
      <div className="container">
        <div style={{ marginRight: "20px" }}>
          <div className="cart-heading">Cart</div>
          {products.map((product) => (
            <div key={product.id} className="card-card">
              <div style={{ marginRight: "10px" }}>
                <img
                  src={product.image}
                  className="customImage"
                  alt={product.name}
                />
              </div>
              <div style={{ color: "white", lineHeight: "20px" }}>
                <div>{product.name}</div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "initial",
                    marginTop: "5px",
                  }}
                >
                  {product.description}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "initial",
                    marginTop: "5px",
                  }}
                >
                  ${product.price}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <div
                    className="cart-content"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2px",
                      backgroundColor: "white",
                      borderRadius: "15px",
                      width: "70px",
                      height: "16px",
                    }}
                  >
                    <div
                      onClick={() => handleQuantityChange(product.id, -1)}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "20px",
                        color: "black",
                        borderRight: "1px solid gray",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "20px",
                        color: "black",
                        borderRight: "1px solid gray",
                      }}
                    >
                      {product.quantity}
                    </div>
                    <div
                      onClick={() => handleQuantityChange(product.id, 1)}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "20px",
                        color: "black",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div
                    onClick={() => handleRemoveProduct(product.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="far fa-trash-alt" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="coupon-heading">Apply Coupon Code</div>
          <div className="coupon-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                lineHeight: "25px",
              }}
            >
              <div>Sub Total:</div>
              <div>
                <div>${subTotal}</div>
                {couponApplied && (
                  <div style={{ color: "#dbd6d6" }}>-${discount}</div>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>Total:</div>
              <div>${total}</div>
            </div>
            <button onClick={() => setCouponApplied(!couponApplied)}>
              {couponApplied ? "Remove Coupon" : "Apply Coupon"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
