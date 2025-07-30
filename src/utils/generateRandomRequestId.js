const generateRandomRequestId = () => {
    const requestId = Math.floor(10000 + Math.random() * 90000).toString();
    return requestId;
};

export default generateRandomRequestId;
