"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Blog } from "@/components/types/BlogTableColumns";
import { Product } from "@/components/types/ProductTableColumns";
import { Consultation as Service } from "@/components/types/ConsultationTableColumns";
import { Button } from "@/components/ui/button";

interface MoreLikeThisProps {
  type: "product" | "blog" | "service";
  limit: number;
  title: string;
}

export default function MoreLikeThis({
  type,
  limit,
  title,
}: MoreLikeThisProps) {
  const [data, setData] = useState<Blog[] | Product[] | Service[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://acc-united.onrender.com/api/v1/${type}s`
        );
        setData(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [type]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex flex-row justify-around">
        {data &&
          data.length > 0 &&
          data.slice(0, limit).map((item) => (
            <div key={item._id}>
              {/* <p className="font-bold mb-1">{item.name}</p> */}
              <Button
                variant={"ghost"}
                className="font-bold hover:bg-sky-300"
                onClick={() => (window.location.href = `/${type}s/${item._id}`)}
              >
                {" "}
                View this {type}
              </Button>
            </div>
          ))}
        {!data || (data.length === 0 && <p>No {type}s found</p>)}
      </div>
    </div>
  );
}
