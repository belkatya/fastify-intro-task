import { faker } from "@faker-js/faker";

export const generateToken = () => faker.string.uuid();

export const buildIdGenerator = () => {
  let counter = 0;
  return () => {
    counter += 1;
    return counter.toString();
  };
};
