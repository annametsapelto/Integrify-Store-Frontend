import { rest, } from "msw";
import { setupServer } from "msw/node";

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
    })
]

const server = setupServer(...handler);
export default server;