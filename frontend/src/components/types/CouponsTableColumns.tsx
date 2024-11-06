"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash, Eye, Ban } from "lucide-react";
import { ArrowUpDown, MoreHorizontal, Check } from "lucide-react";
import axios from "axios";
import { Link } from "@/i18n/routing";

export interface Coupon {
  _id?: string;
  code:string;
  discountPercentage:number;
  validFrom:Date;
  validUntil:Date;
  maxUsage?:number;
  minOrderValue?:number;
}

export const columns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "code",
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
          coupon code
        </div>
      );
    },
  },
  {
    accessorKey: "discountPercentage",
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
          Discount percentage
        </div>
      );
    },
  },
  {
    accessorKey: "validFrom",
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
          Valid from date
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("validFrom"));
      const formattedDate = date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "validUntil",
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
          Valid until date
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("validUntil"));
      const formattedDate = date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "maxUsage",
    header: "Max usage",
  },
  {
    accessorKey: "minOrderValue",
    header: "Minimum order value",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const coupon = row.original;
      const handleDelete = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this coupon?"
        );

        if (confirmDelete) {
          try {
            const response = await axios.delete(
              `${process.env.NEXT_PUBLIC_DEVELOPMENT_SITE}/api/v1/coupons/${coupon._id}`,
              { withCredentials: true }
            );
            if (response.data.status === "success") {
              window.location.reload();
            }
          } catch (error) {
            window.alert('error deleting this coupon')
          }
        }
      };

      return (
        <div className="flex flex-row items-center space-x-4">
          <Link href={`/admin/dashboard/coupons/edit/${coupon._id}`}>
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
