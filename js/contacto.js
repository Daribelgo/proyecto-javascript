document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.querySelector("#map");
  const routeButton = document.querySelector("#route-button");
  const routeStatus = document.querySelector("#route-status");

  if (!mapElement || !routeButton || !routeStatus || typeof L === "undefined") {
    if (routeStatus) {
      routeStatus.textContent = "El mapa no está disponible en este momento.";
    }
    return;
  }
  
  const businessLocation = [38.507, -0.229];

  const map = L.map(mapElement).setView(businessLocation, 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  L.marker(businessLocation)
    .addTo(map)
    .bindPopup("<strong>Verdeluz Studio</strong><br>Av. de la Marina, 24")
    .openPopup();

  let routeLayer = null;

  routeButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
      routeStatus.textContent = "Tu navegador no permite obtener la ubicación.";
      return;
    }

    routeStatus.textContent = "Solicitando tu ubicación…";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [
          position.coords.latitude,
          position.coords.longitude
        ];

        L.marker(userLocation)
          .addTo(map)
          .bindPopup("Tu ubicación aproximada")
          .openPopup();

        const url = [
          "https://router.project-osrm.org/route/v1/driving/",
          `${userLocation[1]},${userLocation[0]};`,
          `${businessLocation[1]},${businessLocation[0]}`,
          "?overview=full&geometries=geojson"
        ].join("");

        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error de ruta: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (!data.routes || !data.routes.length) {
              throw new Error("No se encontró una ruta.");
            }

            const route = data.routes[0];

            if (routeLayer) {
              map.removeLayer(routeLayer);
            }

            routeLayer = L.geoJSON(route.geometry, {
              style: {
                color: "#2f6f5e",
                weight: 5
              }
            }).addTo(map);

            map.fitBounds(routeLayer.getBounds(), { padding: [30, 30] });

            const distanceKm = (route.distance / 1000).toFixed(1);
            const durationMin = Math.round(route.duration / 60);

            routeStatus.textContent =
              `Ruta calculada: ${distanceKm} km aproximadamente, ${durationMin} minutos en coche.`;
          })
          .catch((error) => {
            console.error(error);
            routeStatus.textContent =
              "No se pudo calcular la ruta. Comprueba tu conexión e inténtalo de nuevo.";
          });
      },
      (error) => {
        const messages = {
          1: "Has denegado el permiso de ubicación.",
          2: "No se ha podido determinar tu ubicación.",
          3: "La solicitud de ubicación ha tardado demasiado."
        };

        routeStatus.textContent =
          messages[error.code] || "No se pudo obtener tu ubicación.";
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  });
});
