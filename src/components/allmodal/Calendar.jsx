import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/CalendarStyles.css";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import { apiUrl } from "../../../apiUtils";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@react-three/drei";
import { Button, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import blank_img from "../../assets/stylist/blank_img.jpg";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import DeleteIcon from "@mui/icons-material/Delete";

const ClothesCalendar = ({ onSave }) => {
  const [openCalendarDialog, setOpenCalendarDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [clothesOnDates, setClothesOnDates] = useState([]);
  const [selectedImages, setSelectedImages] = useState({
    outfitTop: null,
    outfitBottom: null,
    outfitFootwear: null,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [allAddedClothesByUser, setAllAddedClothesByUser] = useState([]);
  const [value, setValue] = useState("outfitTop");

  const token = getCookie("authToken");
  const userId = getCookie("userId");

  const fetchDayByCloths = async () => {
    try {
      const response = await axios.get(apiUrl("api/myStyleCapsule/getStyle"), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = response?.data?.data?.styleOfTheDay || [];
      const formattedData = data.map((item) => ({
        date: item?.date,
        thumbnail: item.picture.map((picture) => apiUrl(`uploads/${picture}`)),
        id: response?.data?.data?._id || null,
      }));
      setClothesOnDates(formattedData);
    } catch (error) {
      console.error("Error fetching clothes data:", error);
    }
  };

  const fetchAllAddedClothesByUser = async () => {
    try {
      const response = await axios.get(apiUrl("api/cloths/all-cloths"), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.success) {
        setAllAddedClothesByUser(response?.data?.groupedClothes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectImage = (part, item) => {
    setSelectedImages((prev) => ({
      ...prev,
      [part]: item._id,
    }));
  };

  const handleModalToggle = () => {
    setOpenCalendarDialog(!openCalendarDialog);
  };

  const handleImageDialogToggle = () => {
    setOpenImageDialog(!openImageDialog);
  };

  const handleImageSave = async () => {
    const formattedDate = formatDate(selectedDate);
    const clothes = Object.values(selectedImages).filter((id) => id);
    // if (clothes.length === 0) {
    //   showErrorToast("Please select at least one item.");
    //   return;
    // }
    if (
      !selectedImages.outfitTop ||
      !selectedImages.outfitBottom ||
      !selectedImages.outfitFootwear
    ) {
      showErrorToast("Please select an outfit for Top, Bottom, and Footwear.");
      return;
    }
    const requestBody = {
      userId,
      clothes,
      date: `${formattedDate}T00:00:00.000Z`,
    };
    setIsSaving(true);
    try {
      const response = await axios.post(
        apiUrl("api/myStyleCapsule/create"),
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response?.data?.data);
      setOpenImageDialog(false);
      fetchDayByCloths();
    } catch (error) {
      showErrorToast(
        error?.response?.data?.message ||
          "Failed to save images. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDeleteImage = async (dateEntryId) => {
    console.log(dateEntryId);
    try {
      const response = await axios.delete(
        apiUrl(`api/myStyleCapsule/delete/${dateEntryId?.id}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response?.data, "abinsh");
      showSuccessToast(
        response?.data?.message || "Image deleted successfully."
      );
      fetchDayByCloths();
    } catch (error) {
      console.error("Error deleting image:", error);
      showErrorToast("An error occurred while deleting the image.");
    }
  };

  const tileContent = ({ date, view }) => {
    const formattedDate = formatDate(date);
    if (view === "month") {
      const dateEntry = clothesOnDates.find(
        (item) => item.date === formattedDate
      );
      if (dateEntry) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              overflow: "hidden",
            }}
          >
            {dateEntry.thumbnail.map((image, index) => (
              <img
                key={index}
                src={image}
                style={{
                  width: "15px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            ))}
            <DeleteIcon
              style={{
                color: "red",
                fontSize: "16px",
                cursor: "pointer",
                marginTop: "4px",
              }}
              onClick={() => handleDeleteImage(dateEntry)}
            />
          </div>
        );
      } else {
        return (
          <div
            style={{
              color: "blue",
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={() => {
              setSelectedDate(date);
              handleImageDialogToggle();
            }}
          >
            +
          </div>
        );
      }
    }
    return null;
  };

  const handleSave = () => {
    const formattedDate = formatDate(selectedDate);
    const dateEntry = clothesOnDates.find(
      (item) => item.date === formattedDate
    );
    if (dateEntry) {
      onSave(dateEntry.thumbnail, formattedDate, dateEntry.id);
    }
    const modalElement = document.getElementById("openCalendarDialogCurrent");
    if (modalElement) {
      const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
      modalInstance && modalInstance.hide();
    }
    setOpenCalendarDialog(false);
  };

  useEffect(() => {
    fetchDayByCloths();
    fetchAllAddedClothesByUser();
  }, []);

  return (
    <div>
      <div
        className={`modal fade ${openCalendarDialog ? "show" : ""}`}
        id="openCalendarDialogCurrent"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: openCalendarDialog ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Select a Date
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleModalToggle}
              ></button>
            </div>
            <div className="modal-body">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
                minDate={new Date()}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-pill"
                data-bs-dismiss="modal"
                onClick={handleModalToggle}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-dark rounded-pill"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {openImageDialog && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">{formatDate(selectedDate)}</h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleImageDialogToggle}
                ></button>
              </div>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="Clothing categories tabs"
                    >
                      <Tab label="Outfit Top" value="outfitTop" />
                      <Tab label="Outfit Bottom" value="outfitBottom" />
                      <Tab label="Outfit Footwear" value="outfitFootwear" />
                    </TabList>
                  </Box>
                  <TabPanel value="outfitTop">
                    <div className="row gx-3 ma-0">
                      {allAddedClothesByUser?.length > 0 ? (
                        allAddedClothesByUser?.outfitTop?.map((item) => (
                          <div className="col-3" key={item?._id}>
                            <div
                              className="p-2 text-center"
                              onClick={() =>
                                handleSelectImage("outfitTop", item)
                              }
                              style={{
                                border:
                                  selectedImages.outfitTop === item._id
                                    ? "2px solid green"
                                    : "1px solid #d9d6d6",
                                borderRadius: "8px",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                src={item?.picture[0] || blank_img}
                                alt={item?.description}
                                className="w-100 mb-2 rounded"
                                height="100"
                                onError={(e) => (e.target.src = blank_img)}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No Outfit Top found</p>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel value="outfitBottom">
                    <div className="row gy-4 gx-3 ma-0">
                      {allAddedClothesByUser?.length > 0 ? (
                        allAddedClothesByUser?.outfitBottom?.map((item) => (
                          <div className="col-3" key={item?._id}>
                            <div
                              className="p-2 text-center"
                              onClick={() =>
                                handleSelectImage("outfitBottom", item)
                              }
                              style={{
                                border:
                                  selectedImages.outfitBottom === item._id
                                    ? "2px solid green"
                                    : "1px solid #d9d6d6",
                                borderRadius: "8px",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                src={item?.picture[0] || blank_img}
                                alt={item?.description}
                                className="w-100 mb-2 rounded"
                                height="100"
                                onError={(e) => (e.target.src = blank_img)}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No Outfit Bottom found</p>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel value="outfitFootwear">
                    <div className="row gy-4 gx-3 ma-0">
                      {allAddedClothesByUser?.length > 0 ? (
                        allAddedClothesByUser?.outfitFootwear?.map((item) => (
                          <div className="col-3" key={item?._id}>
                            <div
                              className="p-2 text-center"
                              onClick={() =>
                                handleSelectImage("outfitFootwear", item)
                              }
                              style={{
                                border:
                                  selectedImages.outfitFootwear === item._id
                                    ? "2px solid green"
                                    : "1px solid #d9d6d6",
                                borderRadius: "8px",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                src={item?.picture[0] || blank_img}
                                alt={item?.description}
                                className="w-100 mb-2 rounded"
                                height="100"
                                onError={(e) => (e.target.src = blank_img)}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No Outfit Footwear found</p>
                      )}
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill"
                  onClick={handleImageDialogToggle}
                >
                  Close
                </button>
                <LoadingButton
                  loading={isSaving}
                  loadingPosition="start"
                  startIcon={<AddIcon />}
                  variant="contained"
                  onClick={handleImageSave}
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                  }}
                  className="rounded-pill"
                >
                  Save Images
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothesCalendar;
