import Users from "../models/Users";
import { findCollection } from "../utils/find-collection";
import bcrypt from "bcrypt";

export const userFixture = async () => {
    if (findCollection("users")) {
        try {
            const usersCount = await Users.find().count()
            if (usersCount === 0) {
                const password = process.env.PASSWORD
                const hashedPassword = await bcrypt.hash(password, 10);
                const super_user = {
                    username: 'super',
                    email: 'super@gmail.com',
                    first_name: "you sour",
                    last_name: "heng",
                    password: hashedPassword,
                    password_confirm: hashedPassword,
                }
                await Users.create(super_user)
            }
        } catch (error) {
            console.log(error)
        }
    }
}