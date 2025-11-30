const USERS_KEY = "tf_users";
const SESSION_KEY = "tf_session";
const SAN_MIGUEL = "San Miguel";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function getSessionEmail() {
  return localStorage.getItem(SESSION_KEY);
}

function findCurrentUser() {
  const email = getSessionEmail();
  if (!email) return null;
  return getUsers().find((u) => u.email === email) || null;
}

const BASE_USER_RANKING = [
  { nombre: "Carlos", apellido: "Huamán", puntos: 180 },
  { nombre: "Luis", apellido: "Quispe", puntos: 160 },
  { nombre: "Ana", apellido: "Delgado", puntos: 140 },
  { nombre: "Jorge", apellido: "Rojas", puntos: 120 },
  { nombre: "María", apellido: "Guzmán", puntos: 100 },
  { nombre: "José", apellido: "Paredes", puntos: 80 },
  { nombre: "Rosa", apellido: "Salazar", puntos: 60 },
  { nombre: "Daniel", apellido: "Chávez", puntos: 60 },
  { nombre: "Carmen", apellido: "Loyola", puntos: 40 },
  { nombre: "Pedro", apellido: "Salinas", puntos: 20 },
].map((u) => ({ ...u, distrito: SAN_MIGUEL }));

const BASE_DISTRICT_RANKING = [
  { nombre: "Miraflores", puntos: 1060 },
  { nombre: "San Isidro", puntos: 1040 },
  { nombre: "San Borja", puntos: 1020 },
  { nombre: "La Molina", puntos: 1000 },
  { nombre: "Magdalena del Mar", puntos: 980 },
  { nombre: SAN_MIGUEL, puntos: 0 },
  { nombre: "Barranco", puntos: 940 },
  { nombre: "Jesús María", puntos: 920 },
  { nombre: "Pueblo Libre", puntos: 900 },
  { nombre: "Santiago de Surco", puntos: 880 },
];

function buildUserRanking() {
  const ranking = [...BASE_USER_RANKING];
  const currentUser = findCurrentUser();

  if (currentUser) {
    const fullName = `${currentUser.nombres || ""} ${currentUser.apepat || ""}`
      .trim()
      .replace(/\s+/g, " ");
    const displayName = fullName || currentUser.username || currentUser.email;
    const puntos = Number(currentUser.puntos || 0);

    const existingIndex = ranking.findIndex(
      (u) => `${u.nombre} ${u.apellido}`.trim().toLowerCase() === fullName.toLowerCase()
    );
    if (existingIndex !== -1) {
      ranking.splice(existingIndex, 1);
    }

    ranking.push({
      nombre: displayName,
      apellido: "",
      puntos,
      distrito: SAN_MIGUEL,
      esActual: true,
    });
  }

  const sorted = ranking.sort((a, b) => b.puntos - a.puntos);
  return sorted.map((u, idx) => ({ ...u, puesto: idx + 1 }));
}

function sumSanMiguelPoints(userRanking) {
  return userRanking
    .filter((u) => (u.distrito || SAN_MIGUEL).toLowerCase() === SAN_MIGUEL.toLowerCase())
    .reduce((acc, curr) => acc + Number(curr.puntos || 0), 0);
}

function buildDistrictRanking(userRanking = buildUserRanking()) {
  const totalSanMiguel = sumSanMiguelPoints(userRanking);

  const districts = BASE_DISTRICT_RANKING.map((d) =>
    d.nombre === SAN_MIGUEL ? { ...d, puntos: totalSanMiguel, esUsuarioDistrito: true } : { ...d }
  );

  const sorted = districts.sort((a, b) => b.puntos - a.puntos);
  return sorted.map((d, idx) => ({ ...d, puesto: idx + 1 }));
}

function getCurrentUserRanking() {
  const users = buildUserRanking();
  const current = users.find((u) => u.esActual) || null;
  const districts = buildDistrictRanking(users);
  const sanMiguelRow = districts.find((d) => d.nombre === SAN_MIGUEL) || null;

  return {
    users,
    districts,
    currentUser: current,
    sanMiguelRow,
  };
}

window.RankingData = {
  SAN_MIGUEL,
  buildUserRanking,
  buildDistrictRanking,
  getCurrentUserRanking,
  findCurrentUser,
};
