import React, { useState } from "react";
import axios from "axios";
import "../styles/city.css";

const AddCity: React.FC = () => {
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cityName.trim() === "") {
      setError("City name is required");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7242/api/City", { name: cityName });
      console.log("City added:", response.data);
      setSuccess("City added successfully!");
      setCityName("");
      setError("");
    } catch (err) {
      console.log("Error adding city:", err);
      setError("Failed to add city. Please try again.");
    }
  };

  return (
    <div className="add-city-container">
      <form onSubmit={handleSubmit} className="add-city-form">
        <h2>Add a New City</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="input-group">
          <input
            type="text"
            name="cityName"
            placeholder="City Name"
            value={cityName}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="add-city-button">
          Add City
        </button>
      </form>
    </div>
  );
};

export default AddCity;
