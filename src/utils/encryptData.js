
import CryptoJS from "crypto-js";

const encryptData = async (data) => {
  const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_ENCRYPTION_KEY);
  const iv = CryptoJS.lib.WordArray.random(16);
  const dataToEncrypt =
    typeof data === "string" ? data : JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  const encryptedData = iv
    .concat(encrypted.ciphertext)
    .toString(CryptoJS.enc.Base64);
  return encryptedData;
};


export default encryptData;