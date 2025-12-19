import { faker } from "@faker-js/faker";
import CryptoJS from "crypto-js";

export const crypto = (password) => CryptoJS.SHA256(password);

const createRandomUser = () => ({
  id: faker.string.uuid(),
  username: faker.internet.userName().trim(),
  email: faker.internet.email().toLowerCase().trim(),
  password: crypto(faker.internet.password()),
});

export const generateId = () => faker.string.uuid();

export default () => {
  faker.seed(123);
  return faker.helpers.multiple(createRandomUser, {
    count: 100,
  });
};
