import { faker } from "@faker-js/faker";

const createRandomCompany = () => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  telephone: faker.phone.number(),
});

const getCompanies = () => {
  faker.seed(123);
  return faker.helpers.multiple(createRandomCompany, {
    count: 100,
  });
};

export default getCompanies;
