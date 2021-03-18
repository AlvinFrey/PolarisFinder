
export class ServiceWorkerInitializer {

    public static registerServiceWorker(): void {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(() =>
                    console.log("Service Worker registration succesful")
                )
                .catch((error) =>
                    console.log(`Service Worker registration failed with error: '${error}'`));
        }
    }

}
