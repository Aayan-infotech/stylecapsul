import React from 'react';

const ThankuPage = () => {
    return (
        <div className="container text-center" style={{ paddingTop: "6rem" }}>
            <h1 className="display-4">Successfull</h1>
            <div className="my-4">
                <i
                    className="fa-solid fa-circle-check"
                    style={{ fontSize: '6rem', color: 'green' }}
                ></i>
            </div>
            <h2 className="fw-bold">Order Placed successfully!</h2>
            <p className="text-muted">You can track your order anytime.</p>
        </div>
    );
};

export default ThankuPage;
