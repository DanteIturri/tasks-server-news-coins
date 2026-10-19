import { Router } from 'express';

router.get('/', (req, res) => {
  res.json({
    message: 'Api TradingNow newsCoins V1',
  });
});

export default router;
