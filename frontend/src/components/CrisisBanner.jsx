const CrisisBanner = () => {
  return (
    <div className="crisis-banner">
      <div className="container">
        <div className="crisis-content">
          <strong>Need urgent help?</strong> This site is not for emergencies. 
          Contact your local emergency number or your campus helpline immediately.
          <div className="crisis-contact">
            <span>Emergency: 911</span>
            <span>Campus Helpline: (555) 123-4567</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisBanner;