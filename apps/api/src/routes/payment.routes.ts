import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authMiddleware as authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/create-payment-intent', authenticate, PaymentController.createPaymentIntent);
router.post('/confirm', authenticate, PaymentController.confirmPayment);
router.get('/purchases', authenticate, PaymentController.getPurchaseHistory);
router.get('/sales', authenticate, PaymentController.getSalesHistory);
router.post('/payouts', authenticate, PaymentController.requestPayout);
router.get('/payouts', authenticate, PaymentController.getPayoutHistory);

export default router;
