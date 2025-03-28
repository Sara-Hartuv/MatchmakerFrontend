import { ChangeEvent, FormEvent, useState } from "react";
import { addCity } from "../services/city.service";
import "../styles/city.css";

export default function AddCity() {
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCityName(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (cityName.trim() === "") {
      setError("City name is required");
      return;
    }

    try {
      const response = await addCity(cityName);
      console.log("City added:", response);
      setSuccess("City added successfully!");
      setCityName("");
    } catch (error) {
      console.log("Error adding city:", error);
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
}
