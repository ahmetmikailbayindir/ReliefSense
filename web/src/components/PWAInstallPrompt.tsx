import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';

interface PWAInstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  onInstall,
  onDismiss
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Show prompt after a delay (better UX)
      setTimeout(() => {
        if (!localStorage.getItem('opensense-pwa-dismissed')) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      console.log('OpenSense PWA: Installed successfully');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      const choiceResult = await deferredPrompt.prompt();

      if (choiceResult.outcome === 'accepted') {
        console.log('OpenSense PWA: User accepted installation');
        onInstall?.();
      } else {
        console.log('OpenSense PWA: User dismissed installation');
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('OpenSense PWA: Installation error:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('opensense-pwa-dismissed', 'true');
    onDismiss?.();
  };

  // Don't show if already installed or prompt not available
  if (isInstalled || (!showPrompt && !isIOS)) {
    return null;
  }

  // iOS install instructions
  if (isIOS && showPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl border-2 border-humanitarian-500 p-4 z-50 max-w-md mx-auto">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-6 h-6 text-humanitarian-600" />
            <h3 className="font-bold text-humanitarian-900">Install OpenSense</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-700 mb-4">
          Install this app on your iPhone for offline access and better performance.
        </p>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">1</span>
            <span>Tap the Share button in Safari</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">2</span>
            <span>Select "Add to Home Screen"</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">3</span>
            <span>Tap "Add" to install</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Maybe Later
          </button>
        </div>
      </div>
    );
  }

  // Standard install prompt
  if (showPrompt && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl border-2 border-humanitarian-500 p-4 z-50 max-w-md mx-auto">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Download className="w-6 h-6 text-humanitarian-600" />
            <h3 className="font-bold text-humanitarian-900">Install OpenSense</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-700 mb-4">
          Install this humanitarian agriculture app for offline access, faster loading, and desktop notifications.
        </p>

        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            <Monitor className="w-3 h-3" />
            <span>Works Offline</span>
          </div>
          <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Fast Loading
          </div>
          <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
            Notifications
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Maybe Later
          </button>
          <button
            onClick={handleInstall}
            className="px-6 py-2 text-sm bg-humanitarian-600 text-white rounded-md hover:bg-humanitarian-700 font-semibold"
          >
            Install App
          </button>
        </div>
      </div>
    );
  }

  return null;
};

// Service Worker Registration Hook
export const useServiceWorker = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('OpenSense SW: Registered successfully', registration);
          setSwRegistration(registration);

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('OpenSense SW: New version available');
                  // Could show update prompt here
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('OpenSense SW: Registration failed', error);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'SYNC_SUCCESS') {
          console.log('OpenSense SW: Data sync completed');
          // Could show success notification
        }
      });
    }

    // Handle online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      console.log('OpenSense: Back online');

      // Request background sync
      if (swRegistration && 'sync' in window.ServiceWorkerRegistration.prototype) {
        swRegistration.sync.register('opensense-data-sync').catch(console.error);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('OpenSense: Gone offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [swRegistration]);

  return { isOnline, swRegistration };
};