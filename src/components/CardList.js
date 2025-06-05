import React from 'react';
import './CardList.css';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'AI Recommendation',
    title_ar: 'موصى به من الذكاء الاصطناعي',
    name: 'Name',
    name_ar: 'الاسم',
    rating: 5,
    price: '$199',
    description1: 'Short Description',
    description1_ar: 'وصف قصير',
    description2: 'Short Description',
    description2_ar: 'وصف قصير',
    isAI: true,
  },
  {
    title: 'Option 2',
    title_ar: 'الخيار 2',
    name: 'Option 2',
    name_ar: 'الخيار 2',
    rating: 2,
    price: '$99',
    description1: 'Short Description',
    description1_ar: 'وصف قصير',
    description2: 'Short Description',
    description2_ar: 'وصف قصير',
    isAI: false,
  },
  {
    title: 'Option 3',
    title_ar: 'الخيار 3',
    name: 'Option 3',
    name_ar: 'الخيار 3',
    rating: 4,
    price: '$149',
    description1: 'Another short description',
    description1_ar: 'وصف قصير آخر',
    description2: 'More details here',
    description2_ar: 'مزيد من التفاصيل هنا',
    isAI: false,
  },
  {
    title: 'Option 4',
    title_ar: 'الخيار 4',
    name: 'Option 4',
    name_ar: 'الخيار 4',
    rating: 3,
    price: '$129',
    description1: 'Brief info about option 4',
    description1_ar: 'معلومات موجزة عن الخيار 4',
    description2: 'Additional info for option 4',
    description2_ar: 'معلومات إضافية للخيار 4',
    isAI: false,
  },
];

const CardList = ({ language }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/payment",{ state: { language } });
  };

  return (
    <div className='cards' dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {cards.map((card, index) => (
        <div
          className={`result-card ${card.isAI ? 'ai-recommendation' : ''}`}
          key={index}
        >
          {card.isAI && <h3>{language === 'ar' ? card.title_ar : card.title}</h3>}
          <div className="result-content">
            <div className="result-details">
              <div className="top-row">
                <strong>{language === 'ar' ? card.name_ar : card.name}</strong>
                <span>{card.price}</span>
              </div>
              <div className="stars">
                {'★'.repeat(card.rating)}{'☆'.repeat(5 - card.rating)}
              </div>
              <p>{language === 'ar' ? card.description1_ar : card.description1}</p>
              <p>{language === 'ar' ? card.description2_ar : card.description2}</p>
            </div>
            <div className="image-placeholder" />
          </div>
          <button className="select-button" onClick={handleSearch}>
            {language === 'ar' ? 'اختيار' : 'Select'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardList;
