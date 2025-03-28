export const ENDPOINTS = {
  login: "/Login/login",
  signup: "/Login/signup",
  addCity: "/City",
  getAllCandidates: "/Candidate",
  getCandidateById: (id: number) => `/Candidate/${id}`,
  getUnConfirmationCandidates: "/Candidate/GetUnConfirmationCandidates",
  confirmCandidate: (id: string) => `/Candidate/Confirmation${id}`,
  confirmMatchmaker: (id: string) => `/Matchmaker/Confirmation${id}`,
  updateCandidate: (id: number) => `/Candidate/${id}`,
  deleteCandidate: (id: number) => `/Candidate/${id}`,
  getConfirmationCandidates: "/Candidate/GetConfirmationCandidates",

  getMatchmakerById: (id: number) => `/Matchmaker/${id}`,
  getAllMatchmakers: "/Matchmaker",
  getConfirmedMatchmakers: "/Matchmaker/GetConfirmationMatchmakers",
  updateConfirmationCandidate: "/Candidate/AddForConfirmation", //  אישור מועמד ליצור פונקציה בשרת
  getConfirmedCandidates: "/Candidate/GetConfirmedCandidates", // קבלת מועמדים מאושרים
  updateCandidateStatus: (id: number) => `/Candidate/Status/${id}`, // עדכון סטטוס מועמד ליעל
  getUnConfirmationMatchmakers: "/Matchmaker/GetUnConfirmationMatchmakers",
  // getUnconfirmedMatchmakers: "/Matchmaker/GetUnConfirmationMatchmakers", // נתיב לשדכנים לא מאושרים
  // confirmMatchmaker: (id: number) => `/Matchmaker/Confirmation${id}`, // ליצור בשרת
  getMatchSuggestions: "/Match", // get 
  proposeMatch: "/propose-match",
  GetAllMatchEngaged: "/Match/GetAllMatchEngaged",
  removeCandidate: (id: number) => `/candidates/remove/${id}`,

  getCities: "/City",
  getProfessions: "/Profession",
  GetMatchesByIdMatchmaker: (matchmakerId: number) => `/Match/GetMatchesByIdMatchmaker${matchmakerId}`,

  // יעל
  // הוספת נקודת קצה לקבלת כל ההצעות למשתמש
  getProposalsForUser: (userId: number) => `/Match/GetAllMatchById${userId}`,
  getMatchByIdMatchmaker: (userId: number) => `/Match/GetMatchesByIdMatchmaker${userId}`,
  getMatchByIdCandidate: (userId: number) => `/Match/GetAllMatchById${userId}`,
  // כל ההצועת גם לשדכן וגם למועמד
  getMatchById: (userId: number) => `/Match/GetAllMatchById${userId}`,

};
