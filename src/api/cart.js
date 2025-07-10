

import axiosInstance from "./axionInstance";

export const addToCart = (item, token) =>
    axiosInstance.post("/orders/cart/add/", item, {
        headers: { Authorization: `Token ${token}` },
    }).then(res => res.data);

export const getCartProducts = (token) =>
    axiosInstance.get("/orders/cart/", {
        headers: { Authorization: `Token ${token}` },
    }).then(res => res.data.items);

export const removeFromCart = (itemId, token) =>
    axiosInstance.delete(`/orders/cart/items/${itemId}/`, {
        headers: { Authorization: `Token ${token}` },
    }).then(res => res.data);

export const updateCartItemQuantity = (itemId, quantity, token) =>
    axiosInstance.patch(
        `/orders/cart/items/${itemId}/`,
        { quantity },
        {
            headers: { Authorization: `Token ${token}` },
        }
    ).then(res => res.data);