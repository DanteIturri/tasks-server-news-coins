import { Router } from 'express';
import { createRequire } from 'module';

router.get('/', (req, res) => {
  res.json({
    message: 'Api TradingNow newsCoins V1',
  });
});

export default router;
