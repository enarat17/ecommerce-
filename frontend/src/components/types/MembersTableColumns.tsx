"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash, Eye, Ban } from "lucide-react";
import { ArrowUpDown, MoreHorizontal, Check } from "lucide-react";
import axios from "axios";
import { Link } from "@/i18n/routing";

export interface Member {
  _id?: string;
  name_AR: string;
  name_EN: string;
  position_AR: string;
  position_EN: string;
  brief_AR: string;
  brief_EN: string;
  memberImage: string;
  isFounder: boolean;
  createdAt?: Date;
}

export const columns: ColumnDef<Member>[] = [
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
          Member name english
        </div>
      );
    },
  },
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
          Member name arabic
        </div>
      );
    },
  },
  {
    accessorKey: "position_EN",
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
          Position engilsh
        </div>
      );
    },
  },
  {
    accessorKey: "position_AR",
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
          Position arabic
        </div>
      );
    },
  },
  {
    accessorKey: "isFounder",
    header: "Is founder",
    cell: ({ row }) => {
      const isFounder = row.original.isFounder;
      return (
        <div className="flex justify-center">
          {isFounder ? (
            <Check className="text-unitedSecondary" size={20} />
          ) : (
            ""
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const member = row.original;
      const handleDelete = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this member?"
        );

        if (confirmDelete) {
          try {
            const response = await axios.delete(
              `https://acc-united.onrender.com/api/v1/members/${member._id}`,
              { withCredentials: true }
            );
            if (response.data.status === "success") {
              window.location.reload();
            }
          } catch (error) {
            console.log("Error deleting this member", error);
          }
        }
      };

      return (
        <div className="flex flex-row items-center space-x-4">
          <Link href={`/admin/dashboard/settings/team/edit/${member._id}`}>
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
