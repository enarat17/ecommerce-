"use client";
import {
  useState,
  useEffect,
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import axios from "axios";
import { User } from "@/components/types/UserTableColumns";
import { useQuery } from "@tanstack/react-query";
export default function AdminUserView(params: { params: { id: string } }) {
  const id = params;
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://acc-united.onrender.com/users/${id}`
      );
      return response.data.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: userData, isFetched } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });

  return (
    <div>
      <h2>Username : {userData?.name}</h2>
      <h2>email : {userData?.email}</h2>
      <h2>Phone : {userData?.phone}</h2>
      <h2>Is an Active user : {userData?.active}</h2>
      <p>
        Purchases :{" "}
        {userData?.purchases.map(
          (
            purchase: {
              EnTitle:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<AwaitedReactNode>
                | null
                | undefined;
            },
            index: Key | null | undefined
          ) => (
            <p key={index}>{purchase.EnTitle}</p>
          )
        )}
      </p>
    </div>
  );
}
