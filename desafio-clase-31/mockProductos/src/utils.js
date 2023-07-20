import { Faker, en } from "@faker-js/faker";

const faker = new Faker({ locale: [en] });

export const generateProduct = () => {


    return {
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      department: faker.commerce.department(),
      stock: faker.number.int(50),
      image: faker.image.urlLoremFlickr(),
      description: faker.commerce.productDescription(),
    };
};

