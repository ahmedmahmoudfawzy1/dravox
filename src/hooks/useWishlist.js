import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axionInstance";

const toggleWishlistAPI = async ({ productId, colorVariantId = 1, token }) => {
  console.log(token)
  const response = await axiosInstance.post("/account/wishlist/toggle/", {
    product_id: productId,
    color_variant_id: colorVariantId,
  },

    {
      headers: {
        Authorization: `Token ${token}`
      }
    }

  );
  return response.data;
};


export const useToggleWishlist = () => {
  return useMutation({
    mutationFn: toggleWishlistAPI,
  });
};
