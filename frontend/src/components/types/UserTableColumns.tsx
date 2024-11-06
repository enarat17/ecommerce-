'use client';
import { ColumnDef } from "@tanstack/react-table";
import {Eye} from "lucide-react";
import { Product } from "./ProductTableColumns";
export interface User {
    _id: string;
    name:string;
    email:string;
    phone:string;
    active:boolean;
    createdAt:Date;
    purchases: Product[];
}
export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'active',
        header: 'Active',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
    },{
        id: 'actions',
        header: 'Actions',
        cell:({row})=>{
            const user = row.original 

            const handleView = ()=>{
                window.open(`/admin/dashboard/users/${user._id}`, '_blank');
            }
            
            return (
                <div className="flex flex-row items-center space-x-4">
                    <Eye className="cursor-pointer hover:text-cyan-600" size={16} onClick={() => handleView()} />
                </div>
            )
        }
    }
]
