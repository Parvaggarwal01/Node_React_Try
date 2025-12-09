import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "../api/axiosClient";
import SupportRequestForm from "../components/SupportRequestForm";

const SupportPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("/support/my");
      setRequests(response.data);
    } catch (err) {
      console.error("Failed to fetch support requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const handleRequestSubmit = () => {
    fetchRequests(); 
  };

  if (!user) {
    return <div>Please log in to access support.</div>;
  }

  return (
    <div className="support-page">
      <h1>Get Support</h1>
      
      <div className="support-content">
        <div className="card">
          <h2>Submit a Support Request</h2>
          <SupportRequestForm onRequestSubmit={handleRequestSubmit} />
        </div>
        
        <div className="card">
          <h2>Your Support Requests</h2>
          {loading ? (
            <p>Loading your requests...</p>
          ) : requests.length > 0 ? (
            <div className="requests-list">
              {requests.map(request => (
                <div key={request._id} className="request-item">
                  <div className="request-header">
                    <h3>{request.topic}</h3>
                    <span className={`status-badge status-${request.status}`}>
                      {request.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="request-description">{request.description}</p>
                  {request.counselorNote && (
                    <div className="counselor-note">
                      <strong>Counselor Response:</strong>
                      <p>{request.counselorNote}</p>
                    </div>
                  )}
                  <div className="request-meta">
                    <span>Preferred Mode: {request.preferredMode.replace("_", " ")}</span>
                    <span>Submitted: {new Date(request.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't submitted any support requests yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;