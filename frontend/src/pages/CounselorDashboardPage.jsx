import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "../api/axiosClient";
import ResourceForm from "../components/ResourceForm";

const CounselorDashboardPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [resources, setResources] = useState([]);
  const [filterStatus, setFilterStatus] = useState("open");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("requests");

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`/support?status=${filterStatus}`);
      setRequests(response.data);
    } catch (err) {
      console.error("Failed to fetch support requests", err);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get("/resources");
      setResources(response.data);
    } catch (err) {
      console.error("Failed to fetch resources", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRequests();
      fetchResources();
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [filterStatus, user]);

  const handleStatusChange = async (requestId, newStatus, counselorNote) => {
    try {
      const response = await axios.put(`/support/${requestId}`, {
        status: newStatus,
        counselorNote,
      });

      
      setRequests(
        requests.map((req) => (req._id === requestId ? response.data : req))
      );
    } catch (err) {
      console.error("Failed to update request status", err);
    }
  };

  const handleResourceSubmit = () => {
    fetchResources(); 
  };

  const handleResourceDelete = async (resourceId) => {
    try {
      await axios.delete(`/resources/${resourceId}`);
      setResources(resources.filter((resource) => resource._id !== resourceId));
    } catch (err) {
      console.error("Failed to delete resource", err);
    }
  };

  if (!user) {
    return <div>Please log in as a counselor.</div>;
  }

  if (user.role !== "counselor") {
    return <div>Access denied. This page is for counselors only.</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Counselor Dashboard</h1>

      <div className="admin-tabs">
        <button
          className={activeTab === "requests" ? "tab active" : "tab"}
          onClick={() => setActiveTab("requests")}
        >
          Support Requests
        </button>
        <button
          className={activeTab === "resources" ? "tab active" : "tab"}
          onClick={() => setActiveTab("resources")}
        >
          Manage Resources
        </button>
      </div>

      {activeTab === "requests" ? (
        <div className="admin-content">
          <div className="filters">
            <label>
              Filter by status:
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </label>
          </div>

          <div className="card">
            <h2>Support Requests</h2>
            {loading ? (
              <p>Loading requests...</p>
            ) : requests.length > 0 ? (
              <div className="requests-list">
                {requests.map((request) => (
                  <div key={request._id} className="request-item admin-request">
                    <div className="request-header">
                      <h3>{request.topic}</h3>
                      <span className={`status-badge status-${request.status}`}>
                        {request.status.replace("_", " ")}
                      </span>
                    </div>
                    <p>
                      <strong>Student:</strong> {request.student.name} (
                      {request.student.email})
                    </p>
                    <p>
                      <strong>Description:</strong> {request.description}
                    </p>

                    <div className="request-response">
                      <textarea
                        placeholder="Counselor notes..."
                        defaultValue={request.counselorNote || ""}
                        id={`note-${request._id}`}
                      />
                      <div className="status-buttons">
                        <button
                          className="btn btn-small btn-secondary"
                          onClick={() =>
                            handleStatusChange(
                              request._id,
                              "in_progress",
                              document.getElementById(`note-${request._id}`)
                                .value
                            )
                          }
                        >
                          In Progress
                        </button>
                        <button
                          className="btn btn-small btn-success"
                          onClick={() =>
                            handleStatusChange(
                              request._id,
                              "closed",
                              document.getElementById(`note-${request._id}`)
                                .value
                            )
                          }
                        >
                          Close
                        </button>
                      </div>
                    </div>

                    <div className="request-meta">
                      <span>
                        Preferred Mode:{" "}
                        {request.preferredMode.replace("_", " ")}
                      </span>
                      <span>
                        Submitted:{" "}
                        {new Date(request.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No support requests found.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="admin-content">
          <div className="card">
            <h2>Add New Resource</h2>
            <ResourceForm onResourceSubmit={handleResourceSubmit} />
          </div>

          <div className="card">
            <h2>Existing Resources</h2>
            {loading ? (
              <p>Loading resources...</p>
            ) : resources.length > 0 ? (
              <div className="resources-list">
                {resources.map((resource) => (
                  <div key={resource._id} className="resource-item">
                    <h3>{resource.title}</h3>
                    <p>
                      <strong>Category:</strong> {resource.category}
                    </p>
                    <p>{resource.description}</p>
                    {resource.link && (
                      <p>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resource
                        </a>
                      </p>
                    )}
                    <div className="resource-actions">
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => handleResourceDelete(resource._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No resources found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselorDashboardPage;
