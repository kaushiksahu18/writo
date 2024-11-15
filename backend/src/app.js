import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser'

import userRouter from './routes/user.routes.js'
import serviceRouter from "./routes/service.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import quizRouter from "./routes/quiz.routes.js"
import {errorHandler} from "./middlewares/error.middleware.js"


const app = express()
const allowedOrigins = ["http://localhost:3001"]
app.use(cors({
    origin : allowedOrigins,
    credentials : true
}))
 
app.use(express.json({
    limit : "16kb"
}))

app.use(cookieParser())

app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))

app.use(bodyParser.json());

app.use('/api/v1/user',userRouter)
app.use('/api/v1/service', serviceRouter)
app.use("/api/v1/subscription", subscriptionRouter)
app.use("/api/v1/quiz", quizRouter)

app.use(errorHandler)
export {app}