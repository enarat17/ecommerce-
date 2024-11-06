"use client";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash, Ban, ArrowUpDown } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export interface Blog {
  _id: string;
  title_AR: string;
  title_EN: string;
  description_AR: string;
  description_EN: string;
  views: number;
  file: File;
  slug: string;
  category: string;
  coverImage: string;
  createdAt: Date;
}

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title_EN",
    header: ({ column }) => {
      return (
        <div className="w-[150px]">
          <Button
            variant="ghost"
            className="hover:bg-transparent "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className=" h-4 w-4" />
          </Button>
          English Title
        </div>
      );
    },
  },
  {
    accessorKey: "title_AR",
    header: ({ column }) => {
      return (
        <div className="w-[150px]">
          <Button
            variant="ghost"
            className="hover:bg-transparent "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className=" h-4 w-4" />
          </Button>
          Arabic Title
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const blog = row.original;

      const handleView = () => {
        window.open(
          `https://acc-united.onrender.com/en/articles/${blog._id}`,
          "_blank"
        );
      };

      const handleDelete = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this blog?"
        );

        if (confirmDelete) {
          try {
            const response = await axios.delete(
              `https://acc-united.onrender.com/api/v1/blogs/${blog._id}`,
              { withCredentials: true }
            );
            if (response.data.status === "success") {
              window.location.reload();
            }
          } catch (error) {
            console.log("Error deleting this blog", error);
          }
        }
      };

      return (
        <div className="flex flex-row items-center space-x-4">
          <Eye
            className="cursor-pointer hover:text-cyan-600"
            size={16}
            onClick={handleView}
          />
          <Link href={`/admin/dashboard/blogs/edit/${blog._id}`}>
            <Pencil
              className="cursor-pointer hover:text-emerald-500"
              size={16}
            />
          </Link>
          <Trash
            className="cursor-pointer hover:text-red-600"
            size={16}
            onClick={handleDelete}
          />
        </div>
      );
    },
  },
];
