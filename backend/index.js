const express = require('express');
const { connection } = require('./configs/db');
const { userRouter } = require('./routers/user.router');
const { taskRouter } = require('./routers/task.router');
require("dotenv").config();
const app = express();

app.use(express.json());
app.use('/users',userRouter);
app.use('/tasks',taskRouter);
app.listen(process.env.PORT, async () => {
    await connection;
  console.log('connected');
    console.log(`Server is running on port ${process.env.PORT}`);
});
