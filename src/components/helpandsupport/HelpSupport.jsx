import React, { useEffect, useState } from "react";
import "../../styles/HelpSupport.scss";
import axios from "axios";
import { Box, Button, CircularProgress, IconButton, List, ListItem, ListItemText, TextField, Tooltip, Typography } from "@mui/material";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";

const HelpSupport = () => {
  const [concern, setConcern] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [userConcerns, setUserConcerns] = useState([]);
  const [concernLoading, setConcernLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const token = getCookie('authToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!concern.trim()) return;
    try {
      const res = await axios.post(
        apiUrl('api/help-concerns'),
        { concernMessage: concern },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        setResponseMsg(res.data.message || 'Submitted successfully!');
        setConcern('');
      } else {
        setResponseMsg('Something went wrong.');
      }
      fetchConcerns();
    } catch (err) {
      setResponseMsg(err.response?.data?.message || 'Backend not reachable.');
    }
  };

  const fetchConcerns = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setConcernLoading(true);

    try {
      const res = await axios.get(apiUrl('api/help-concerns/get'), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data.data, 'Concerns Fetched');
      setUserConcerns(res.data.data);
      if (isRefresh) {
        setTimeout(() => {
          setRefreshing(false);
        }, 3000);
      }
    } catch (err) {
      if (isRefresh) {
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }
    } finally {
      if (!isRefresh) setConcernLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchConcerns();
    }
  }, [token]);

  const handleShowAllToggle = () => {
    setShowAll(!showAll);
  };

  const concernsToDisplay = showAll ? userConcerns : userConcerns.slice(0, 3);

  return (
    <div className="help-support-container">
      <div className="container w-75">
        <Typography variant="h4" fontWeight="bold" mt={4} gutterBottom>
          Help & Support
        </Typography>

        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
          <div className="mb-3">
            <TextField label="Describe your concern" multiline fullWidth rows={2} value={concern} onChange={(e) => setConcern(e.target.value)} variant="outlined" required />
          </div>
          <div className="d-flex justify-content-between align-items-end">
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "black", borderRadius: "50px", ":hover": { bgcolor: "black" } }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit Request'}
            </Button>
            {responseMsg && <small className="text-muted">{responseMsg}</small>}
          </div>
        </form>

        <div style={{ marginTop: '30px' }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold">
              Your Previous Concerns
            </Typography>
            <Tooltip title="Refresh">
              <IconButton onClick={() => fetchConcerns(true)}>
                {refreshing ? (
                  <i className="fa-solid fa-spinner fa-spin me-2"></i>
                ) : (
                  <i className="fa-solid fa-rotate-right me-2"></i>
                )}
              </IconButton>
            </Tooltip>
          </Box>

          {concernLoading ? (
            <CircularProgress />
          ) : userConcerns.length === 0 ? (
            <Typography>No concerns submitted yet.</Typography>
          ) : (
            <div>
              {concernsToDisplay?.map((concernItem) => (
                <div key={concernItem._id} style={{ marginBottom: '30px' }}>
                  {concernItem.concern && concernItem.concern.length > 0 && concernItem.concern.map((userMessage, index) => (
                    <div key={`concern-${index}`}>
                      {/* User message */}
                      <div className="d-flex justify-content-end">
                        <div className="p-3 bg-light rounded shadow-sm">
                          <p className="mb-1"><strong>You:</strong> {userMessage.message}</p>
                          <small className="text-muted">
                            {new Date(concernItem.createdAt).toLocaleString()}
                          </small>
                        </div>
                      </div>

                      {/* Admin replies (if any) */}
                      {userMessage.replies && userMessage.replies.length > 0 ? (
                        userMessage.replies.map((reply, i) => (
                          <div className="d-flex mt-2" key={`reply-${i}`}>
                            <div className="p-3 bg-secondary text-white rounded shadow-sm" style={{ maxWidth: '80%', marginLeft: '10px' }}>
                              <p className="mb-1"><strong>{reply.replyBy}:</strong> {reply.reply}</p>
                              <small className="text-light">
                                {new Date(reply.repliedAt).toLocaleString()}
                              </small>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="d-flex justify-content-start mt-2">
                          <div className="p-2 bg-warning text-dark rounded shadow-sm">
                            <small><strong>Waiting for admin reply...</strong></small>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <Box sx={{ textAlign: "center" }}>
                <Button onClick={handleShowAllToggle} className="w-25" sx={{ mt: 2, bgcolor: "black", color: "white", borderRadius: "50px", textTransform: "none", ":hover": { bgcolor: "black" } }}>
                  {showAll ? 'Show Less' : 'Show All'}
                </Button>
              </Box>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default HelpSupport;
