
export class ServiceWorkerInitializer {

    public static registerServiceWorker(): void {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then()
                .catch((error) =>
                    console.log(`Service Worker registration failed with error: '${error}'`));
        }
    }

}
