import CryptoJS from "crypto-js";

const signData = async (data) => {

    const dataToHash =
        typeof data === "string" ? data : JSON.stringify(data);
    const hmac = await CryptoJS.HmacSHA256(dataToHash, import.meta.env.VITE_ENCRYPTION_KEY);

    const passkey = CryptoJS.enc.Base64.stringify(hmac)

    return passkey;
};

export default signData;

