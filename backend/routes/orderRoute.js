import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, getSalesData} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/Auth.js';

const orderRouter = express.Router()


// admin
orderRouter.post('/list',allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)


// user feature
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.get('/sales', getSalesData);



export default orderRouter