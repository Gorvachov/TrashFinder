const tbodyDistritos = document.getElementById("tbody-distritos");
const tbodyUsuarios = document.getElementById("tbody-usuarios");
const resumenUsuario = document.getElementById("resumen-usuario");
const resumenDistrito = document.getElementById("resumen-distrito");
const badgeDistrito = document.getElementById("badge-distrito");
const badgeUsuario = document.getElementById("badge-usuario");

function renderDistrictRanking(districts) {
  tbodyDistritos.innerHTML = districts
    .map(
      (d) => `
        <tr class="${d.nombre === RankingData.SAN_MIGUEL ? "highlight" : ""}">
          <td>${d.puesto}</td>
          <td>${d.nombre}</td>
          <td>${d.puntos} puntos</td>
        </tr>
      `
    )
    .join("");

  const sanMiguel = districts.find((d) => d.nombre === RankingData.SAN_MIGUEL);
  if (sanMiguel) {
    resumenDistrito.textContent = `San Miguel está en el puesto #${sanMiguel.puesto} con ${sanMiguel.puntos} puntos.`;
    badgeDistrito.textContent = sanMiguel.puesto === 1 ? "🥇 Distrito líder" : "⚡ En carrera";
    badgeDistrito.className = `badge ${sanMiguel.puesto === 1 ? "success" : "info"}`;
  }
}

function renderUserRanking(users) {
  tbodyUsuarios.innerHTML = users
    .map((u) => {
      const nombreCompleto = `${u.nombre} ${u.apellido || ""}`.trim();
      const resaltar = u.esActual ? "highlight" : "";
      return `
        <tr class="${resaltar}">
          <td>${u.puesto}</td>
          <td>${nombreCompleto}</td>
          <td>${u.distrito || RankingData.SAN_MIGUEL}</td>
          <td>${u.puntos} puntos</td>
        </tr>
      `;
    })
    .join("");

  const usuario = users.find((u) => u.esActual);
  if (usuario) {
    resumenUsuario.textContent = `Tu puesto es #${usuario.puesto} con ${usuario.puntos} puntos.`;
    badgeUsuario.textContent = usuario.puesto <= 3 ? "🥉 Elegible top 3" : "📈 Sigue sumando";
    badgeUsuario.className = `badge ${usuario.puesto <= 3 ? "success" : "info"}`;
  } else {
    resumenUsuario.textContent = "Inicia sesión para ver tu posición en el ranking.";
    badgeUsuario.textContent = "👤 Invitado";
    badgeUsuario.className = "badge info";
  }
}

(function initRanking() {
  const data = RankingData.getCurrentUserRanking();
  renderDistrictRanking(data.districts);
  renderUserRanking(data.users);
})();
