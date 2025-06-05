import React from "react";
import './DestinationCard.css';
const DestinationCard = ({ destination, language }) => {
  // destination = { imageUrl, name, description, dates, price }

  return (
    <div className="destination-card" dir={language === "ar" ? "rtl" : "ltr"}>
      <img
        src={destination.imageUrl}
        alt={destination.name}
        className="destination-image"
      />
      <div className="destination-info">
        <h4 className="destination-name">{destination.name}</h4>
        <p className="destination-description">{destination.description}</p>
        <p className="destination-dates">
          {language === "ar" ? "التواريخ" : "Dates"}: {destination.dates}
        </p>
        <p className="destination-price">
          {language === "ar" ? "السعر" : "Price"}: {destination.price}
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
