import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response): void => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 4200;
app.listen(PORT);
