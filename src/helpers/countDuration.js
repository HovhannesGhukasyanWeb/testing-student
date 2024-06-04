export default (startTime, endTIme) => {
    const start = new Date(startTime);
    const end = new Date(endTIme);
    const duration = end - start;
    const hours = Math.floor(duration / 1000 / 60 / 60);
    const minutes = Math.floor((duration / 1000 / 60) % 60);
    return `${hours} hours ${minutes} minutes`;
}

export const countDurationInSeconds = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = end - start;
    return Math.floor(duration / 1000);
}