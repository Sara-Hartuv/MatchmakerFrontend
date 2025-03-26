export const ENDPOINTS = {
  login: "/Login/login",
  signup: "/Login/signup",
  addCity: "/City",
  getCities: "/City",
  getAllCandidates: "/Candidate",
  getCandidateById: (id: number) => `/Candidate/${id}`,
  getUnConfirmationCandidates: "/Candidate/GetUnConfirmationCandidates",
  confirmCandidate: (id: number) => `/Candidate/Confirmation${id}`,
  updateCandidate: (id: number) =>`/Candidate/${id}`,
  deleteCandidate: (id: number) => `/Candidate/${id}`,
  getConfirmationCandidates: "/Candidate/GetConfirmationCandidates",
  // הוספת נקודת קצה לקבלת כל ההצעות למשתמש
  getProposalsForUser: (userId: number) => `/Match/GetAllMatchById${userId}`,
  getInquiries:`/Inquiries` ,
  getBrothers: `/Brother`,
  addBrother: "/Brother",
  addInquiry: "/Inquiries",
};