"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash, Eye, Ban } from "lucide-react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { Link } from "@/i18n/routing";

export interface Product {
  _id: string;
  title_AR: string;
  title_EN: string;
  description_AR: string;
  description_EN: string;
  body_AR: string;
  body_EN: string;
  views: number;
  slug: string;
  Sucessful_Purchases: number;
  category: string;
  discount: number;
  video: string;
  coverImage: string;
  basic_version: {
    document: string;
    price: number;
  };
  open_version: {
    document: string;
    price: number;
  };
  ratingsAverage: number;
  // editable_version:{
  //     document: string;
  //     price: number;
  // };
  createdAt: Date;
}
const formatCategory = (category: string): string => {
  const formattedCategories: { [key: string]: string } = {
    "Hr": "hr-store",
    "Financial": "financial-store"
  };
  return formattedCategories[category] || category.toLowerCase().replace(/\s+/g, '-');
};
export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title_EN",
    header: ({ column }) => {
      return (
        <div>
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
        <div>
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
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div className="w-[150px]">
          <Button
            variant="ghost"
            className="hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          Category
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "Sucessful_Purchases",
    header: "Purchases",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const product = row.original;

      const handleDelete = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this product?"
        );

        if (confirmDelete) {
          try {
            const response = await axios.delete(
              `https://acc-united.onrender.com/api/v1/consults/${product._id}`,
              { withCredentials: true }
            );
            if (response.data.status === "success") {
              window.location.reload();
            }
          } catch (error) {
            console.log("Error deleting this product", error);
          }
        }
      };

      return (
        <div className="flex flex-row items-center space-x-4">
          <Link href={`/store/${formatCategory(product.category)}/${product._id}`} target="_blank">
            <Eye
              className="cursor-pointer hover:text-cyan-600"
              size={16}
            />
          </Link>
          <Link href={`/admin/dashboard/products/edit/${product._id}`}>
            <Pencil
              className="cursor-pointer hover:text-emerald-500"
              size={16}
            />
          </Link>
          <Trash
            className="cursor-pointer hover:text-red-600"
            size={16}
            onClick={() => handleDelete()}
          />
        </div>
      );
    },
  },
];
