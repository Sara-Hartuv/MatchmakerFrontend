// import { useEffect, useState } from "react";
// import { getMatchmakerById, updateMatchmaker } from "../../services/matchmaker.service";

// const ProfileForm = ({ matchmakerId }) => {
//   const [matchmaker, setMatchmaker] = useState({ firstName: "", lastName: "", email: "" });

//   useEffect(() => {
//     getMatchmakerById(matchmakerId).then(setMatchmaker);
//   }, [matchmakerId]);

//   const handleChange = (e) => {
//     setMatchmaker({ ...matchmaker, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await updateMatchmaker(matchmakerId, matchmaker);
//     alert("פרופיל עודכן בהצלחה!");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded">
//       <h2 className="text-xl font-bold mb-4">הפרופיל שלי</h2>
//       <label>שם פרטי</label>
//       <input type="text" name="firstName" value={matchmaker.firstName} onChange={handleChange} className="border p-2 w-full" />

//       <label>שם משפחה</label>
//       <input type="text" name="lastName" value={matchmaker.lastName} onChange={handleChange} className="border p-2 w-full" />

//       <label>אימייל</label>
//       <input type="email" name="email" value={matchmaker.email} onChange={handleChange} className="border p-2 w-full" disabled />

//       <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">עדכן פרופיל</button>
//     </form>
//   );
// };

// export default ProfileForm;
export{}