import { useState } from "react";
import axios from "../api/axiosClient";

const ResourceForm = ({ onResourceSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    link: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const resourceData = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };
      
      await axios.post("/resources", resourceData);
      setSuccess(true);
      setFormData({
        title: "",
        category: "",
        description: "",
        link: "",
        tags: "",
      });
      
      if (onResourceSubmit) {
        onResourceSubmit();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create resource");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="resource-form">
      {success && (
        <div className="alert alert-success">
          Resource created successfully!
        </div>
      )}
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Stress, Sleep, Anxiety"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the resource"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="link">Link (optional)</label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="stress, exams, relaxation"
        />
      </div>
      
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Create Resource"}
      </button>
    </form>
  );
};

export default ResourceForm;