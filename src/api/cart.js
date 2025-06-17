

// import axiosInstance from "./axionInstance";

// export const addToCart = async (item, token) => {

//     console.log(item)

//     return await axiosInstance.post("/orders/cart/add/", item, {
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Token ${token}`
//         },
//     }).then((res) => res.data);
// };


// export const getCartProducts = async (token) => {
//     const res = await axiosInstance.get("/orders/cart/", {
//         headers: {
//             Authorization: `Token ${token}`,
//         },
//     });

//     return res.data;
// };


// export const removeFromCart = async (item_id, token) => {
//     const res = await axiosInstance.delete(`/orders/cart/items/${item_id}/`, {
//         headers: {
//             Authorization: `Token ${token}`,
//             "Content-Type": "application/json",
//             Accept: "application/json",
//         },
//     });
//     return res.data;
// };




// api/cart.js
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
    axiosInstance.delete(`/orders/cart/remove/${itemId}/`, {
        headers: { Authorization: `Token ${token}` },
    }).then(res => res.data);
