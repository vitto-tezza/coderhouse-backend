import { generateProduct } from "../utils.js";

export const getUsersData = () => {
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push(generateProduct());
  }
  return users;
};
