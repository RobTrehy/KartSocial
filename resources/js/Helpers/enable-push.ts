'use strict';

export function initSW() {
    if (!("serviceWorker" in navigator)) {
        //service worker isn't supported
        return;
    }

    if (!("PushManager" in window)) {
        //push isn't supported
        return;
    }

    //register the service worker
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => {
            initPush();
        })
        .catch((err) => {
            console.log(err)
        });
}

function initPush() {
    if (!navigator.serviceWorker.ready) {
        return;
    }

    new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
        .then((permissionResult) => {
            if (permissionResult !== 'granted') {
                console.error('We weren\'t granted permission.');
            }
            subscribeUser();
        });
}

function subscribeUser() {
    navigator.serviceWorker.ready
        .then((registration) => {
            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    import.meta.env.VITE_VAPID_PUBLIC_KEY
                )
            };

            return registration.pushManager.subscribe(subscribeOptions);
        })
        .then((pushSubscription) => {
            storePushSubscription(pushSubscription);
        });
}

function storePushSubscription(pushSubscription) {
    fetch('/push', {
        method: 'POST',
        body: JSON.stringify(pushSubscription),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            // console.log(res)
        })
        .catch((err) => {
            console.log(err)
        });
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}