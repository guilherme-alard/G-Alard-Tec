self.addEventListener('push', function(event) {
  let data = { title: 'Agenda Alard-Tec', body: 'Você tem um compromisso pendente.' };
  try { data = event.data.json(); } catch (e) {}
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: undefined,
      tag: 'agenda-alard',
      renotify: true
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url.includes('agenda.html') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/agenda.html');
    })
  );
});
