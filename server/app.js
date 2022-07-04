import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import mainRouter from './router/main.js';
import chiampionRouter from './router/champion.js';

const app = express();


app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

// ===========================라우터 등록================================

app.use('/main', mainRouter); //main
app.use('/champion', chiampionRouter);



// 위의 라우터 모두 충족하지 않을경우(최.종.방.어.선)
app.use((req, res, next) => {
    res.sendStatus(404);
});


// 에러 발생시
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

app.listen(5000, () => {
    console.log('우리 서버 영업중입니다.');
});





