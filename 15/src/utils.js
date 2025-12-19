import { faker } from "@faker-js/faker";
import CryptoJS from "crypto-js";
import users from "../__fixtures__/user.js";

const key = "secret phrase";

export const encrypt = (password) =>
  CryptoJS.AES.encrypt(password, key).toString();

export const decrypt = (hash) =>
  CryptoJS.AES.decrypt(hash, key).toString(CryptoJS.enc.Utf8);

export default () => {
  faker.seed(123);
  return users.map((user) => ({
    ...user,
    password: encrypt(user.password),
  }));
};
