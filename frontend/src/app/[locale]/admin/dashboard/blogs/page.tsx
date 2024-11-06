"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "@/components/shared/Dashboard/DataTable";
import {
  Blog,
  columns as BlogCoulmns,
} from "@/components/types/BlogTableColumns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import BackButton from "@/components/shared/Dashboard/BackButton";

export default function AdminBlogsView() {
  const [Blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://acc-united.onrender.com/api/v1/blogs"
      );
      setBlogs(response.data.data.data);
    } catch (error) {
      console.log("error fetching blogs", error);
    }
  };
  const handleAddClick = () => {
    const newPath = `${pathname}/add`.replace(/\/+/g, "/");
    router.push(newPath);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <BackButton />
        <Button className="m-1 mr-[95px]" onClick={handleAddClick}>
          <Plus /> Add Blog
        </Button>
      </div>
      <DataTable columns={BlogCoulmns} data={Blogs} />
    </div>
  );
}
