import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

const secretKey = "tu_clave_secreta"; // Usa una clave segura y mantenla privada

// Función para encriptar una contraseña con bcrypt
export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10); // Genera una "sal" para mayor seguridad
    return bcrypt.hash(password, salt);
};

// Comparar la contraseña ingresada con la almacenada en la base de datos
export const isMatchPassword = async (passwordIngresada: string, passwordAlmacenada: string) => {
    const isMatch = await bcrypt.compare(passwordIngresada, passwordAlmacenada);
    return isMatch;
};

// Función para encriptar datos con AES
export const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

// Función para desencriptar datos con AES
export const decryptData = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
