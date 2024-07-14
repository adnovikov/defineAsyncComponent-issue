export function withRetry(importFunction, maxRetries = 3) {
  return new Promise((resolve, reject) => {
    let attempt = 0;

    const load = () => {
      importFunction()
        .then(resolve)
        .catch((error) => {
          if (attempt < maxRetries) {
            attempt++;
            const delay = Math.pow(2, attempt) * 100; // Exponential backoff
            setTimeout(load, delay);
          } else {
            reject(error);
          }
        });
    };

    load();
  });
}