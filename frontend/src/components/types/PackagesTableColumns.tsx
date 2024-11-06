"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash, Eye, Ban } from "lucide-react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { Product } from "./ProductTableColumns";

export interface Package {
  _id: string;
  title_AR: string;
  title_EN: string;
  products: Product[];
  price: number;
  description_AR: string;
  description_EN: string;
  createdAt: Date;
}

export const columns: ColumnDef<Package>[] = [
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
    accessorKey: "description_EN",
    header: "English Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const packageData = row.original;
      const handleView = () => {
        window.open(`/packages/${packageData._id}`, "_blank");
      };

      const handleDelete = async () => {
        try {
          await axios.delete(
            `https://acc-united.onrender.com/api/v1/packages/${packageData._id}`,
            { withCredentials: true }
          );
          window.location.reload();
        } catch (error) {
          console.error("Error deleting package:", error);
        }
      };

      const handleDisable = async () => {
        try {
          await axios.patch(
            `/api/packages/${packageData._id}`,
            { status: "disabled" },
            { withCredentials: true }
          );
          window.location.reload();
        } catch (error) {
          console.error("Error disabling package:", error);
        }
      };

      return (
        <div className="flex flex-row items-center space-x-4">
          <Eye
            className="cursor-pointer hover:text-cyan-600"
            size={16}
            onClick={() => handleView()}
          />
          <Link href={`/admin/dashboard/packages/edit/${packageData._id}`}>
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
          <Ban
            className="cursor-pointer hover:text-gray-600"
            size={16}
            onClick={() => handleDisable()}
          />
        </div>
      );
    },
  },
];
