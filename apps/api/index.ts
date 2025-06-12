import express from "express";
import { authMiddleware } from "./middleware";
import { prisma } from "db/client";
import { idText } from "typescript";


const app = express();
app.use(express.json());

app.post("/api/v1/website", authMiddleware , async (req, res) => {
const userId = req.userId!;
const {url} = req.body;
const data = await prisma.website.create({
    data : {
        userId,
        url
    }
});
res.json({
    id : data.id
})
})


app.get("/api/v1/status", authMiddleware , async (req, res) => {
    const websiteId = req.query.websiteId as unknown as string;
    const userId = req.userId!;
    const data =  await prisma.website.findFirst({
        where: {
            id: websiteId,
            userId: userId
        },
        include: {
            ticks: true
        }
    });
    res.json(data);
})


app.get("/api/v1/websites", authMiddleware , async (req, res) => {
    const userId = req.userId!;

    const websites = await prisma.website.findMany({
        where: {    
            userId: userId
            disabled: false
        },

    })
    res.json({
        websites
    })

    }
)




app.delete("/api/v1/website", authMiddleware , (req, res) => {

})


app.listen(3000);
