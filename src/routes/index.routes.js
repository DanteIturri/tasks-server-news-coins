import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Api TradingNow newsCoins V1',
  });
});

export default router;
