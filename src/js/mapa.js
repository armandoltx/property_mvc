(function() {
    const lat = -33.8716419;
    const lng = 151.2059691;
    const mapa = L.map('mapa').setView([lat, lng ], 16);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);


})()
