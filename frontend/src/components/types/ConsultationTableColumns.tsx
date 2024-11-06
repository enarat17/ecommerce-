"use client";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export interface Consultation {
  _id: string;
  title_AR: string;
  title_EN: string;
  slug: string;
  description_AR: string;
  description_EN: string;
  body_AR: string;
  body_EN: string;
  category: string;
  views: number;
  coverImage: string;
  createdAt: Date;
}

const formatCategory = (category: string): string => {
  const formattedCategories: { [key: string]: string } = {
    "Business Services": "business-services",
    "Financial Services": "financial-services",
    "Accounting Services": "accounting-services",
    "HR Services": "hr-services",
    "Auditing Services": "auditing-services"
  };
  return formattedCategories[category] || category.toLowerCase().replace(/\s+/g, '-');
};

export const columns: ColumnDef<Consultation>[] = [
  {
    accessorKey: "title_EN",
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
            className="hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
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
    cell: ({ row }) => {
      const consultation = row.original;

      const handleDelete = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this consultation?"
        );

        if (confirmDelete) {
          try {
            const response = await axios.delete(
              `https://acc-united.onrender.com/api/v1/consults/${consultation._id}`,
              { withCredentials: true }
            );
            if (response.data.status === "success") {
              window.location.reload();
            }
          } catch (error) {
            console.log("Error deleting this consultation", error);
          }
        }
      };

      return (
        <div className="flex flex-row items-center space-x-4">
          <Link href={`/services/${formatCategory(consultation.category)}/${consultation._id}`} target="_blank">
            <Eye
              className="cursor-pointer hover:text-cyan-600"
              size={16}
            />
          </Link>
          <Link
            href={`/admin/dashboard/consultations/edit/${consultation._id}`}
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