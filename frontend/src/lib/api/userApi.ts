// 'use server';
import axios from "axios";
import Cookies from "js-cookie";
const siteName = process.env.NEXT_PUBLIC_DEVELOPMENT_SITE;

const userUrl = `${siteName}/api/v1/users`;

//cookie clearing function

const clearAllCookies = () => {
  Cookies.remove("united_user_c", { path: "/" });
};

//queries
export const fetchUser = async () => {
  try {
    const response = await axios.get(`${userUrl}/me`, {
      withCredentials: true,
    });
    return response.data.data.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const userLogout = async () => {
  try {
    const response = await axios.get(`${userUrl}/logout`, {
      withCredentials: true,
    });

    if (response.data.status === "success") {
      window.location.reload(); // Reload the page after successful logout
    }
    return { status: response.data.status };
  } catch (error) {
    throw error;
  }
};

//mutations

export const userLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${userUrl}/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

interface signupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}
export const userSignup = async (data: signupData) => {
  try {
    const response = await axios.post(`${userUrl}/signup`, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//cart requests
export const fetchUserCart = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/cart`, {
      withCredentials: true,
    });
    return response.data.data.cart;
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = async ({ data }: { data: string }) => {
  try {
    const response = await fetch(`${siteName}/api/v1/cart`, {
      method: "DELETE",
      body: data,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addCartItem = async (data: FormData) => {
  try {
    const response = await axios.post(`${siteName}/api/v1/cart`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//orders requests

export const fetchUserOrders = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/users/purchases`, {
      withCredentials: true,
    });
    return response.data.data.purchases;
  } catch (error) {
    throw error;
  }
};

export const calculateCartPrice = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/cart/calculate`, {
      withCredentials: true,
    });
    return response.data.data.cart;
  } catch (error) {
    throw error;
  }
};

export const submitOrder = async (data: { items: any[]; coupon: string }) => {
  try {
    const response = await axios.post(`${siteName}/api/v1/orders`, data, {
      withCredentials: true,
    });
    return response.data.data.order;
  } catch (error) {
    throw error;
  }
};

export const applyCoupon = async (couponCode: string) => {
  try {
    const response = await axios.post(
      `${siteName}/api/v1/coupons/apply`,
      { couponCode },
      { withCredentials: true }
    );
    return response.data.data.coupon;
  } catch (error) {
    throw error;
  }
};
