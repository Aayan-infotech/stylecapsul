import React from "react";
import capsulimg from "../../assets/mystylecapsule/capsulimg1.png";
import shirttop from "../../assets/mystylecapsule/shirt1.png";
import paintimag from "../../assets/mystylecapsule/paintimag.png";
import shoose from "../../assets/mystylecapsule/shoose.png";
import blankimage from "../../assets/mystylecapsule/Group26992.png";
import "../../styles/Mystylecapsule.css";

const columnsData = [
  [],
  [
    { src: shirttop, top: "5%", right: "70%" },
    { src: paintimag, top: "32%", right: "70%" },
    { src: shoose, top: "60%", right: "70%" },
  ],
  [],
];

const MyStyleCapsul = () => {
  return (
    <div className="container" style={{ paddingTop: "7rem" }}>
      <h1 className="text-center fw-bold fs-1">My Style Capsule</h1>
      <div className="text-center mt-4">
        <h5 className="fw-bold">Sunday</h5>
        <h5 className="fw-bold">30 June 2024</h5>
      </div>
      <div className="container" style={{ paddingTop: "2rem" }}>
        <div className="row gx-5">
          {columnsData.map((column, columnIndex) => (
            <div key={columnIndex} className="col inner-img">
              <img
                src={capsulimg}
                style={{ position: "relative" }}
                alt={`Capsule ${columnIndex}`}
              />
              {column.length === 0 ? (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div>
                    <img
                      style={{ marginLeft: "4rem" }}
                      src={blankimage}
                      height={50}
                      width={50}
                      alt="No Image"
                    />
                    <br />
                    <br />
                    <h6 className="fs-6 text-center mt-2">
                      What is your outfit for today is going to be?
                    </h6>
                  </div>
                </div>
              ) : (
                column.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    style={{
                      position: "absolute",
                      top: image.top,
                      left: image.left,
                      right: image.right,
                    }}
                  >
                    <img
                      src={image.src}
                      height={200}
                      width={200}
                      alt={`Image ${imageIndex}`}
                    />
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyStyleCapsul;
