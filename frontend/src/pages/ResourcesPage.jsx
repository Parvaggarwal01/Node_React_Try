import { useState, useEffect } from "react";
import axios from "../api/axiosClient";
import ResourceCard from "../components/ResourceCard";

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get("/resources");
        setResources(response.data);
        setFilteredResources(response.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(response.data.map(r => r.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch resources", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    let result = resources;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(resource => resource.category === selectedCategory);
    }
    
    setFilteredResources(result);
  }, [searchTerm, selectedCategory, resources]);

  return (
    <div className="resources-page">
      <h1>Resource Library</h1>
      
      <div className="resources-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <p>Loading resources...</p>
      ) : filteredResources.length > 0 ? (
        <div className="resources-grid">
          {filteredResources.map(resource => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      ) : (
        <p>No resources found matching your criteria.</p>
      )}
    </div>
  );
};

export default ResourcesPage;