import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import { apiUrl } from "../../../apiUtils";
import { useDispatch } from "react-redux";
import { getAllCarts } from "../../reduxToolkit/addcartSlice";

const ThankuPage = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const token = getCookie("authToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        if (!session_id) return;
        const response = await axios.get(
          apiUrl(`api/payment-method/complete-payment?session_id=${session_id}`),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(getAllCarts());
        navigate("/orderhistory", { replace: true });
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [session_id, token]);

  return (
    <div className="thanku-container-page mb-5">
      <div className="container text-center" style={{ paddingTop: "6rem", display: "block" }}>
        <h1 className="display-4 fw-bold mt-2">Successful</h1>
        <div className="my-5">
          <i className="fa-solid fa-circle-check" style={{ fontSize: "6rem", color: "green" }}></i>
        </div>
        <h2 className="fw-bold">Order Placed successfully!</h2>
        <p className="text-muted">You can track your order anytime.</p>
        <Link to="/orderhistory">
          <button type="button" class="btn btn-dark rounded-pill p-2 btn-sm"> View Order History Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ThankuPage;
