self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        //notifications aren't supported or permission not granted!
        return;
    }

    if (event.data) {
        var msg = event.data.json();
        event.waitUntil(self.registration.showNotification(msg.title, {
            body: msg.body,
            icon: msg.icon,
            actions: msg.actions,
            data: msg.data,
        }));
    }
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    let action = (event.action !== null && event.action !== undefined && event.action !== "") ? event.action : event.notification.data.data.url;
    markAsRead(event.notification);

    if (event.action !== 'dismiss') {
        event.waitUntil(
            clients
                .matchAll({
                    type: "window",
                })
                .then((clientList) => {
                    for (const client of clientList) {
                        if (client.url === action && "focus" in client) return client.focus();
                    }
                    if (clients.openWindow) return clients.openWindow(action);
                }),
        );
    }
});

function markAsRead(notification) {
    var d = new Date();
    var read_at = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    fetch(`/api/notifications/${notification.data.id}/read`, {
        method: 'PUT',
        body: JSON.stringify({ _method: 'PUT', read_at: read_at }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}