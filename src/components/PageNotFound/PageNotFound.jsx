import React from 'react'
import './PageNotFound.scss'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <div className="container pagenotfound mt-5">
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="p-3">PageNotFound...!</div>
            <Link to="/">Go To Home Page</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageNotFound;
