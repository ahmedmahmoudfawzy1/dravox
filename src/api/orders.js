import axiosInstance from './axiosInstance';

export const getOrders = () => {
    return axiosInstance.get('/orders/orders/').then(res => res.data);
};

// export const getSingleOrder = (orderId) => {
//     return axiosInstance.get(`/orders/orders/${orderId}/`).then(res => res.data);
// };


