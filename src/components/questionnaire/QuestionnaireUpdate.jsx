import React, { useEffect, useState } from "react";
import "../../styles/QuestionnaireUpdate.css";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const QuestionnaireUpdate = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [btnLoader, setBtnLoader] = useState(false);
  const navigate = useNavigate();

  const token = getCookie('authToken');
  const userId = getCookie('userId');

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl('api/user/all_quest'), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const questions = response.data.data || [];
      setAllQuestions(questions);
      const preselectedOptions = {};
      questions.forEach((question) => {
        if (question.responses && question.responses.length > 0) {
          const userResponse = question.responses.find((resp) => resp.userId === userId);
          console.log(question.responses.find((resp) => resp), '----')
          if (userResponse) {
            preselectedOptions[question._id] = userResponse.selectedOption;
          }
        }
      });
      console.log(preselectedOptions, 'preselectedOptions')
      setSelectedOptions(preselectedOptions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, userId]);

  const handleChooseQuestionnaire = (questionId, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: option,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoader(true);
    const answers = Object.entries(selectedOptions).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));
    try {
      const response = await axios.put(apiUrl("api/user/select-answers"), { answers }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response?.data?.success) {
        showSuccessToast(response?.data?.message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
      fetchData();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      showErrorToast(errorMessage);
    } finally {
      setBtnLoader(false);
    }
  };



  return (
    <div className="questionnaire-update d-flex justify-content-center align-items-center">
      <div className="container w-75">
        {allQuestions.map((questionItem) => (
          <div key={questionItem._id} className="mt-4">
            <h1 className="fw-bold fs-3">{questionItem.question}</h1>
            <div className="row g-2 mt-2">
              {questionItem?.images && questionItem?.images.length > 0 && (
                <div className="row g-2 mt-2">
                  {questionItem.images.map((src, imgIndex) => (
                    <div key={imgIndex} className="col-12 col-md-4 mb-2 mb-md-0">
                      <img
                        src={src}
                        alt={`Question ${imgIndex}`}
                        className="img-fluid rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="row g-2 mt-2">
              {questionItem?.options?.map((option, index) => (
                <div key={index} className="col-12 col-md-4 d-flex justify-content-center">
                  <button
                    type="button"
                    onClick={() => handleChooseQuestionnaire(questionItem._id, option)}
                    style={{
                      backgroundColor: selectedOptions[questionItem._id] === option ? 'black' : 'transparent',
                      color: selectedOptions[questionItem._id] === option ? 'white' : '#6c757d',
                      border: '2px solid #6c757d',
                      borderRadius: '50px',
                      padding: '10px 20px',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      width: '75%',
                    }}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* -------------------------Update profile------------------------ */}
        <div className="row gy-2 mt-4">
          <div className="col-12 col-sm-6 col-md-6 d-flex justify-content-center align-items-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-outline-secondary rounded-pill w-50 custom-button p-2 fw-bold fs-5"
            >
              {btnLoader ? (
                <span>
                  <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                  Updating...
                </span>
              ) : (
                "Update"
              )}
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <Link
              to="/profile"
              className=" justify-content-center align-items-center d-flex mx-200 w-100 text-decoration-none"
            >
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill w-50 custom-button p-2 fw-bold fs-5"
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireUpdate;