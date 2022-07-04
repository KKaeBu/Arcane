import express from 'express';
import 'express-async-errors';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send({ hi: "hello i'm main router" });
})

export default router;