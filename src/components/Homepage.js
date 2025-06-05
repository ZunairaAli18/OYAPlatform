import './Homepage.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [formData, setFormData] = useState({
    travelType: '',
    destination: '',
    checkin: '',
    checkout: '',
    guests: '',
    budgetMax: 1000, // single max budget value
    interests: {
      culture: false,
      beach: false,
      adventure: false,
    },
  });

  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     // Helper function for alerts
  const alertMsg = (enMsg, arMsg) => alert(language === 'ar' ? arMsg : enMsg);

  if (!formData.travelType) {
    alertMsg('Please select travel type', 'يرجى اختيار نوع الرحلة');
    return;
  }
  if (!formData.destination.trim()) {
    alertMsg('Please enter destination', 'يرجى إدخال الوجهة');
    return;
  }
  if (!formData.checkin) {
    alertMsg('Please select check-in date', 'يرجى اختيار تاريخ الوصول');
    return;
  }
  if (!formData.checkout) {
    alertMsg('Please select check-out date', 'يرجى اختيار تاريخ المغادرة');
    return;
  }
  if (new Date(formData.checkout) < new Date(formData.checkin)) {
    alertMsg('Check-out date cannot be before check-in date', 'لا يمكن أن يكون تاريخ المغادرة قبل تاريخ الوصول');
    return;
  }
  if (!formData.guests) {
    alertMsg('Please select number of guests', 'يرجى اختيار عدد الضيوف');
    return;
  }
  console.log(formData.destination);
    navigate("/results",{ state: { language, formData } });
  };

  const handleChange = (e) => {
    const { id, name,value,type,checked } = e.target;

    if (name && name.startsWith("interests.")) {
      const interestKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        interests: {
          ...prev.interests,
          [interestKey]: checked,
        },
      }));
      return;
    }

    if (name === "budgetMax") {
      const numericValue = parseInt(value, 10);
      setFormData((prev) => ({
        ...prev,
        budgetMax: numericValue,
      }));
      return;
    }

    const key = id || name ;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
   
  };

  return (
    <div className="widget" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="header">
        <h2 id="title">OYA Booking Platform</h2>
        <select
          className="box"
          id="languageToggle"
          value={language}
          onChange={handleLanguageChange}
          aria-label={language === 'ar' ? 'اختر اللغة' : 'Select Language'}
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      <form id="bookingForm" onSubmit={handleSubmit}>
        <label className="text">{language === 'ar' ? 'نوع الرحلة' : 'Travel Type'}</label>
        <select
          className="box"
          id="travelType"
          value={formData.travelType}
          onChange={handleChange}
          aria-label={language === 'ar' ? 'نوع الرحلة' : 'Travel Type'}
        >
          <option value="" disabled>
            {language === 'ar' ? 'اختر نوع الرحلة' : 'Select travel type'}
          </option>
          <option value="Hotel Day Use">
            {language === 'ar' ? 'استخدام الفندق خلال اليوم' : 'Hotel Day Use'}
          </option>
          <option value="Cultural Package">
            {language === 'ar' ? 'باقة ثقافية' : 'Cultural Package'}
          </option>
          <option value="Smart Trip">
            {language === 'ar' ? 'رحلة ذكية' : 'Smart Trip'}
          </option>
        </select>

        <label className="text">{language === 'ar' ? 'الوجهة' : 'Destination'}</label>
        <input
          className="box"
          type="text"
          id="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder={language === 'ar' ? 'أدخل الوجهة' : 'Enter destination'}
          aria-label={language === 'ar' ? 'الوجهة' : 'Destination'}
        />

        <label className="text">{language === 'ar' ? 'تاريخ الوصول' : 'Check-in Date'}</label>
        <input
          className="box"
          type="date"
          id="checkin"
          value={formData.checkin}
          onChange={handleChange}
          aria-label={language === 'ar' ? 'تاريخ الوصول' : 'Check-in Date'}
        />

        <label className="text">{language === 'ar' ? 'تاريخ المغادرة / المدة' : 'Check-out Date / Duration'}</label>
        <input
          className="box"
          type="date"
          id="checkout"
          value={formData.checkout}
          onChange={handleChange}
          aria-label={language === 'ar' ? 'تاريخ المغادرة' : 'Check-out Date / Duration'}
        />

        <label className="text">{language === 'ar' ? 'عدد الضيوف' : 'Number of Guests'}</label>
        <select
          className="box"
          id="guests"
          value={formData.guests}
          onChange={handleChange}
          aria-label={language === 'ar' ? 'عدد الضيوف' : 'Number of Guests'}
        >
           <option value="" disabled>
           {language === 'ar' ? 'اختر عدد الضيوف' : 'Select number of guests'}
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="3+">3+</option>
        </select>

        <div style={{marginBottom: "10px" , direction: language === 'ar' ? 'rtl' : 'ltr', }}>
          <label>{language === 'ar' ? 'ميزانية' : 'Budget'}</label>
          <br />
          <input
           style={{width:"100%"}}
            type="range"
            min="0"
            max="5000"
            step="50"
            name="budgetMax"
            value={formData.budgetMax}
            onChange={handleChange}
            className={language === 'ar' ? 'rtl-slider' : ''}
  aria-label={language === 'ar' ? 'الحد الأقصى للميزانية' : 'Maximum Budget'}
          />
          <div className='budget'>
            <span>0</span>
            <span>${formData.budgetMax}</span>
          </div>
        </div>
        <div>
  <label className="text">
    {language === 'ar' ? 'الاهتمامات' : 'Interests'}
  </label>

  <div className="checkbox-group">
    <label>
      <input
        type="checkbox"
        name="interests.culture"
        checked={formData.interests.culture}
        onChange={handleChange}
      />
      {language === 'ar' ? 'ثقافة' : 'Culture'}
    </label>

    <label>
      <input
        type="checkbox"
        name="interests.beach"
        checked={formData.interests.beach}
        onChange={handleChange}
      />
      {language === 'ar' ? 'شاطئ' : 'Beach'}
    </label>

    <label>
      <input
        type="checkbox"
        name="interests.adventure"
        checked={formData.interests.adventure}
        onChange={handleChange}
      />
      {language === 'ar' ? 'مغامرة' : 'Adventure'}
    </label>
  </div>
</div>

        <button className="search" type="submit" id="submitBtn">
          {language === 'ar' ? 'نتائج البحث' : 'Search Results'}
        </button>
      </form>
    </div>
  );
};

export default Homepage;
