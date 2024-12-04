import React, { useState, useEffect } from "react";
import { BellSlashIcon, BellAlertIcon } from "@heroicons/react/24/solid";
import { savePushSubscription } from "../services/notificationService/notificationService";

// VAPID public key
const PUBLIC_VAPID_KEY =
  "BPShgogOZX98_MBY1WD1nEGLXvAJ99UQ2qceegM7ZOWc6fAFeibT27xwV6SCg-XzEs6KgWmqH1KRufYKuix8V7M";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

const NotificationComponent = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!("serviceWorker" in navigator)) {
        console.error("Service workers are not supported.");
        return;
      }

      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          setIsSubscribed(true);
        }
      } catch (error) {
        console.error("Error checking subscription status:", error);
      }
    };

    checkSubscription();
  }, []);

  const handleSubscribe = async () => {
    try {
      if (!("serviceWorker" in navigator)) {
        console.error("Service workers are not supported.");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
      });

      const p256dh = subscription.getKey("p256dh");
      const auth = subscription.getKey("auth");

      if (!p256dh || !auth) {
        console.error("p256dh or auth keys not available.");
        return;
      }

      const subscriptionData = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: btoa(String.fromCharCode(...new Uint8Array(p256dh))),
          auth: btoa(String.fromCharCode(...new Uint8Array(auth))),
        },
      };

      // Save the subscription using the service
      const response = await savePushSubscription(subscriptionData);
      console.log("Push subscription saved successfully:", response);

      setIsSubscribed(true);
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
    }
  };

  const handleIconClick = () => {
    if (!isSubscribed) {
      handleSubscribe();
    } else {
      console.log("Already subscribed to notifications.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      {isSubscribed ? (
        <BellAlertIcon
          onClick={handleIconClick}
          className="h-10 w-10 text-green-500 cursor-pointer"
          title="Notifications Enabled"
        />
      ) : (
        <BellSlashIcon
          onClick={handleIconClick}
          className="h-10 w-10 text-red-500 cursor-pointer"
          title="Enable Notifications"
        />
      )}
    </div>
  );
};

export default NotificationComponent;
