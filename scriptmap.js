// Funktion zur Initialisierung der Karte
function initMap(lat, lon) {
    // Initialisiere die Karte mit den übergebenen Koordinaten
    var map = L.map('map').setView([lat, lon], 13); // Standardzoom-Level 13

    // Füge die OpenStreetMap Tile Layer hinzu
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Optional: Marker an der aktuellen Position hinzufügen
    L.marker([lat, lon]).addTo(map)
        .bindPopup('Aktuelle Position')
        .openPopup();
}

// HTML5 Geolocation verwenden, um die Position des Benutzers zu holen
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        // Bei erfolgreicher Geolokalisierung, initialisiere die Karte an den Benutzerkoordinaten
        initMap(position.coords.latitude, position.coords.longitude);
    }, function(error) {
        // Falls die Geolokalisierung fehlschlägt, initialisiere die Karte an einem Fallback-Ort (z.B. Berlin)
        alert('Standort konnte nicht ermittelt werden, zeige Standardposition.');
        initMap(52.5200, 13.4050); // Standardposition: Berlin
    });
} else {
    // Wenn der Browser die Geolokalisierung nicht unterstützt, zeige die Karte an einem Standardort
    alert('Geolocation wird von diesem Browser nicht unterstützt.');
    initMap(52.5200, 13.4050); // Standardposition: Berlin
}
