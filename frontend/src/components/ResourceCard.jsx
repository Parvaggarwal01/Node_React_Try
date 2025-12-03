const ResourceCard = ({ resource }) => {
  return (
    <div className="resource-card">
      <div className="resource-header">
        <h3>{resource.title}</h3>
        <span className="resource-category">{resource.category}</span>
      </div>
      <p className="resource-description">{resource.description}</p>
      {resource.tags && resource.tags.length > 0 && (
        <div className="resource-tags">
          {resource.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      {resource.link && (
        <a 
          href={resource.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-small btn-secondary"
        >
          View Resource
        </a>
      )}
      <div className="resource-meta">
        {resource.createdBy && (
          <span>Added by: {resource.createdBy.name}</span>
        )}
        <span>Created: {new Date(resource.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ResourceCard;