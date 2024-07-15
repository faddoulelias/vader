const SERVER_URL = "http://localhost:3000";

export function getCSAData() {
    return fetch(`${SERVER_URL}/csa/sentiments`);
}