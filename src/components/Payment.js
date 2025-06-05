import React, { useState } from "react";
import GuestList from "./GuestsList";
import DestinationCard from "./DestinationCard";
import './Payment.css';
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    payment: ''
  });
 
  const [totalPrice, setTotalPrice] = useState(0);
  const [guests, setGuests] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCard } = location.state || {};
  const language = location.state?.language || 'en';

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const key = id || name;
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleBack = () => {
    navigate("/results");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      alert(language === 'ar' ? 'يرجى إدخال الاسم الكامل' : 'Please enter your full name');
      return;
    }

    if (!formData.email.trim()) {
      alert(language === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert(language === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح' : 'Please enter a valid email');
      return;
    }

    alert(language === 'ar' ? 'تم الدفع...' : 'Payment done...');
    navigate("/");
  };

  return (
    <div className="payment" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="back-button-wrapper">
        <button className="back-button" onClick={handleBack}>
          {language === 'ar' ? '← العودة إلى النتائج' : '← Back to Results'}
        </button>
      </div>
      <div className="payment-widget">
        <form id="bookingForm" onSubmit={handleSubmit}>
          <h2 id="title">{language === 'ar' ? 'تأكيد والدفع' : 'Confirm and Pay'}</h2>

          {selectedCard && (
            <DestinationCard 
              destination={{
                imageUrl: selectedCard.imageUrl,
                name: language === "ar" ? selectedCard.destination_ar : selectedCard.destination,
                description: language === "ar" ? selectedCard.description1_ar : selectedCard.description1,
                dates: selectedCard.dates || "10 - 17 July 2025",
                price: selectedCard.price
              }} 
              language={language} 
            />
          )}

          <GuestList language={language} guests={guests} setGuests={setGuests} />

          <label className="text">
            {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
          </label>
          <input
            className="box"
            type="text"
            id="name"
            placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
            value={formData.name}
            onChange={handleChange}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
          />

          <label className="text">
            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            className="box"
            type="email"
            id="email"
            placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
            value={formData.email}
            onChange={handleChange}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
          />

          <label className="text">{language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</label>
          <div className="payment-options">
            <label className="payment-option">
              <input type="radio" name="payment" value="fawry" checked={formData.payment === 'fawry'} onChange={handleChange} /> Fawry
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" value="stc" checked={formData.payment === 'stc'} onChange={handleChange} /> STC Pay
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" value="card" checked={formData.payment === 'card'} onChange={handleChange} /> Credit Card
            </label>
          </div>

          <div className="total-price">
            <label className="text">
              {language === 'ar' ? 'السعر الإجمالي' : 'Total Price'}
            </label>
            <p className="price-value">
              {selectedCard.price} {language === 'ar' ? 'ر.س' : 'SAR'}
            </p>
          </div>

          <button className="confirmandpay" type="submit" id="submitBtn">
            {language === 'ar' ? 'تأكيد والدفع' : 'Confirm and Pay'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
