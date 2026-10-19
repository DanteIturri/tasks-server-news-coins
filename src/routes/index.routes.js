import { Router } from 'express';
import { createRequire } from 'module';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

router.get('/', (req, res) => {
  res.json({
    message: 'Api TradingNow newsCoins V1',
  });
});

export default router;
