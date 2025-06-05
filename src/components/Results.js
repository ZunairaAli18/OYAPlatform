import react from 'react';
import './Results.css';
import CardList from "./CardList";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {}; 
  const language = location.state?.language || 'en'; // fallback to 'en' if not passed
 
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="results" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="back-button-wrapper">
  <button className="back-button" onClick={handleBack}>
    {language === 'ar' ? '← العودة إلى البحث' : '← Back to Search'}
  </button>
</div>

       <div className="card-list-wrapper">
   <CardList language={language} formData={formData} />
  </div>
    </div>
  );
};

export default Results;
