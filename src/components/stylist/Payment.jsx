import React from 'react';
import "../../styles/Payment.scss";
import creditcard from '../../assets/payment/credit.png';
import paypal from '../../assets/payment/paypal.png';

const Payment = () => {
    return (
        <div className="payment-container container">
            <div class="row gx-5">
                <h1 className="fw-bold text-center fs-1">Payment</h1>
                <div class="col-12 d-flex justify-content-center align-items-center mt-3">
                    <div class="p-3 border method rounded-pill w-50 me-3">
                        <h5 className='fw-bold m-0'>Credit Card</h5>
                    </div>
                    <img src={creditcard} height={30} alt="Credit Card" />
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center mt-3">
                    <div class="p-3 border method rounded-pill w-50 fw-bold me-4">
                        <h5 className='fw-bold m-0'>Pay Pal</h5>
                    </div>
                    <img src={paypal} height={30} alt="Credit Card" />
                </div>
            </div>
            <button className="pay-button">Pay</button>
        </div>
    );
};

export default Payment;
