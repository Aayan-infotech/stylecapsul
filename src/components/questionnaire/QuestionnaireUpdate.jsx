import React from "react";
import '../../styles/QuestionnaireUpdate.css'

const QuestionnaireUpdate = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container w-50">
        <div className="row g-1">
          <h1 className="fw-bold fs-1">Closet Management</h1>
          <div className="col-4">
            <div>
              <img
                src="https://images.unsplash.com/photo-1720048171527-208cb3e93192?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Closet"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="mt-1">
              <img
                src="https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt="Closet"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className="col-4">
            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1722945721803-d7a1cdb06fdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx"
                alt="Closet"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="mt-1">
              <img
                src="https://images.unsplash.com/photo-1722959124885-b73921a69946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D"
                alt="Closet"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className="col-4">
            <div>
              <img
                src="https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt="Closet"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="mt-1">
              <img
                src="https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt="Closet"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="mt-1">
              <img
                src="https://images.unsplash.com/photo-1722799037558-69a4dc8e08d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D"
                alt="Closet"
                style={{ width: "100%", height: "197px" }}
              />
            </div>
          </div>
        </div>

        <div class="row g-2 mt-2">
          <div class="col-4 d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-outline-secondary fw-bold rounded-pill custom-button">
              Yes
            </button>
          </div>
          <div class="col-4 d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-outline-secondary fw-bold rounded-pill custom-button">
              No
            </button>
          </div>
          <div class="col-4 d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-outline-secondary fw-bold rounded-pill custom-button">
              Sometimes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireUpdate;
8;
