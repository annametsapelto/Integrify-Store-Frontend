import { rest, } from "msw";
import { setupServer } from "msw/node";
import jwt from 'jsonwebtoken';

const users = [
    {id: 1,
    email: "email@email.com",
    password: "word",
    role: "customer",
    name: "Name",
    avatar: ""
    },
    {
        id: 2,
        email: "email2@email.com",
        password: "word",
        role: "customer",
        name: "Name2",
        avatar: ""  
    },
    {
        id: 3,
        email: "email3@email.com",
        password: "word",
        role: "customer",
        name: "Name3",
        avatar: ""  
    }
    

]
const handler = [
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, context) => {
        return res(
            context.json(
                [
                    {
                        id: 1,
                        title: "Apple",
                        price: 33,
                        description: "A description",
                        images: [],
                        category: {
                            id: 3,
                            name: "Furniture",
                            image: ""
                        }
                    },
                    {
                        id: 2,
                        title: "Carving",
                        price: 55,
                        description: "A description",
                        images: [],
                        category: {
                            id: 3,
                            name: "Furniture",
                            image: ""
                        }
                    },
                    {
                        id: 3,
                        title: "Ball",
                        price: 13,
                        description: "A description",
                        images: [],
                        category: {
                            id: 3,
                            name: "Furniture",
                            image: ""
                        }
                    },
                ]
            )
        )
    }),
    rest.get("https://api.escuelajs.co/api/v1/users", (req, res, context) => {
        return res(
            context.json(users)
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/auth/login", async (req, res, context) => {
        const {email, password} = await req.json();
        const foundUser = users.find(user => user.email === email && user.password === password);
        if(foundUser) {
            const access_token = jwt.sign(foundUser, 'key');
            return res(
                context.json({
                    access_token
                })
            )
        } else {
            return res(context.status(401, "Unauthorized"))
        }
    }),
    rest.get("https://api.escuelajs.co/api/v1/auth/profile", async (req, res, context) => {
        const access_token = req.headers.get("Authorization");
        if (access_token) {
            const foundUser = jwt.verify(access_token, "key")
            return res(
                context.json(foundUser)
            )
        } else {
            return res(context.status(401, "Unauthorized"))
        }
    }),
    rest.post("https://api.escuelajs.co/api/v1/files/upload", async (req, res, context) => {
        const file = await req.json();
        res(
            context.json({
                originalname: "joigubo",
                filename: "jbigyyu.png",
                location: "https://api.escuelajs.co/api/v1/files/jbigyyu.png"
            })
        )
    }),
    rest.get("https://api.escuelajs.co/api/v1/categories", async (req, res, context) => {
        return res(
            context.json(
                [  {
                    "id": 1,
                    "name": "Clothes",
                    "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=4278"
                  },
                  {
                    "id": 2,
                    "name": "Food",
                    "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=4278"
                  },
                  {
                    "id": 3,
                    "name": "Furniture",
                    "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=4278"
                  }
                ]
            )
        )})]

const server = setupServer(...handler);
export default server;