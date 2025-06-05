import react from 'react';
import './GuestsList.css';

const GuestList = ({ language, guests, setGuests }) => {
  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...guests];
    updatedGuests[index][field] = value;
    setGuests(updatedGuests);
  };

  const addGuest = () => {
    setGuests([...guests, { name: "", email: "" }]);
  };

  const removeGuest = (index) => {
    const updatedGuests = guests.filter((_, i) => i !== index);
    setGuests(updatedGuests);
  };

  return (
    <div className="guest-list">
      <h3>{language === "ar" ? "تفاصيل الضيوف" : "Guest Details"}</h3>
      {guests.map((guest, index) => (
        <div key={index} className="guest-entry">
          <label className="text">
            {language === "ar" ? `اسم الضيف ${index + 1}` : `Guest Name ${index + 1}`}
          </label>
          <input
            className="box"
            type="text"
            placeholder={language === "ar" ? "أدخل الاسم" : "Enter name"}
            value={guest.name}
            onChange={(e) => handleGuestChange(index, "name", e.target.value)}
            dir={language === "ar" ? "rtl" : "ltr"}
            style={{ textAlign: language === "ar" ? "right" : "left" }}
          />

          <label className="text">
            {language === "ar" ? "البريد الإلكتروني" : "Email"}
          </label>
          <input
            className="box"
            type="email"
            placeholder={language === "ar" ? "أدخل البريد الإلكتروني" : "Enter email"}
            value={guest.email}
            onChange={(e) => handleGuestChange(index, "email", e.target.value)}
            dir={language === "ar" ? "rtl" : "ltr"}
            style={{ textAlign: language === "ar" ? "right" : "left" }}
          />

          <button type="button" onClick={() => removeGuest(index)}>
            {language === "ar" ? "إزالة" : "Remove"}
          </button>
        </div>
      ))}

      <button type="button" onClick={addGuest}>
        {language === "ar" ? "إضافة ضيف" : "Add Guest"}
      </button>
    </div>
  );
};

export default GuestList;
