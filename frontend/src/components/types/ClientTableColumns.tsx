"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash, Eye, Ban } from "lucide-react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { Link } from "@/i18n/routing";

export interface Client {
  _id?: string;
  name_AR: string;
  name_EN: string;
  clientImage: string;
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name_AR",
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
          Arabic member name
        </div>
      );
    },
  },
  {
    accessorKey: "name_EN",
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
          English member name
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const client = row.original;
      const handleDelete = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this client?"
        );

        if (confirmDelete) {
          try {
            const response = await axios.delete(
              `https://acc-united.onrender.com/api/v1/clients/${client._id}`,
              { withCredentials: true }
            );
            if (response.data.data.status === "success") {
              window.location.reload();
            }
          } catch (error) {
            console.log("Error deleting this client", error);
          }
        }
      };

      return (
        <div className="flex flex-row items-center space-x-4">
          <Link
            href={`/admin/dashboard/settings/client-list/edit/${client._id}`}
          >
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
