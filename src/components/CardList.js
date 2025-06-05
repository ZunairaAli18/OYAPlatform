import React from 'react';
import './CardList.css';
import cards from '../data/cards.json';
import { useNavigate, useLocation } from 'react-router-dom';

const CardList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};
  const language = location.state?.language || 'en';

  const handleSearch = (card) => {
    navigate('/payment', { state: { language, formData, selectedCard: card } });
  };

 const filteredCards = cards.filter((card) => {
  console.log('formData:', formData);
console.log('formData.destination:', formData.destination);

  return formData.destination
    ? card.destination?.toLowerCase() === formData.destination.toLowerCase()
    : true;
});


  return (
  <div className="cards" dir={language === 'ar' ? 'rtl' : 'ltr'}>
    {filteredCards.length === 0 ? (
      <div className="no-results">
        {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
      </div>
    ) : (
      filteredCards.map((card, index) => (
        <div className={`result-card ${card.isAI ? 'ai-recommendation' : ''}`} key={index}>
          <div className="result-content">
            <div className="result-details">
        
              <div className="top-row">
  {language === 'ar' ? (
    <>
      <img src={card.imageUrl} alt={card.name} className="place-image" />
      <div className="place-info">
        <strong>{card.destination_ar}</strong>
        <strong>{card.name_ar}</strong>
      </div>
    </>
  ) : (
    <>
      <div className="place-info">
        <strong>{card.destination}</strong>
        <strong>{card.name}</strong>
      </div>
      <img src={card.imageUrl} alt={card.name} className="place-image" />
    </>
  )}
</div>

              <div className="stars">
                {'★'.repeat(card.rating)}{'☆'.repeat(5 - card.rating)}
              </div>
              <p>{language === 'ar' ? card.description1_ar : card.description1}</p>
              <p>{language === 'ar' ? card.description2_ar : card.description2}</p>
            </div>
            <div className="image-placeholder" />
          </div>
          <button className="select-button" onClick={() => handleSearch(card)}>
            {language === 'ar' ? 'اختيار' : 'Select'}
          </button>
        </div>
      ))
    )}
  </div>
);
};

export default CardList;
