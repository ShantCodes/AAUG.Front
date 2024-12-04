self.addEventListener('push', (event) => {
    const data = event.data.json();

    // Show notification
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || '/icons/icon-192x192.png',
    });
});