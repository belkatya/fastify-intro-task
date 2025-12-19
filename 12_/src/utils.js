import { faker } from "@faker-js/faker";

const createRandomPost = () => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraphs(),
});

export const generateId = () => faker.string.uuid();

export default () => {
  faker.seed(123);
  return faker.helpers.multiple(createRandomPost, {
    count: 100,
  });
};
