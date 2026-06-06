const qrDataElement = document.getElementById('qr-data');

if (qrDataElement) {
    const qrData = {
        id: qrDataElement.dataset.id,
        title: qrDataElement.dataset.title,
        description: qrDataElement.dataset.description,
        location: qrDataElement.dataset.location,
        status: qrDataElement.dataset.status,
    };

    console.log('QR item loaded:', qrData);
}

if(search){
    search.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const query = search.value.trim();
            window.location.href = `/${encodeURIComponent(query)}`;
        }
    });
}