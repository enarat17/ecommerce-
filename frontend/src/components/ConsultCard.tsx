import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import Image from "next/image";
import {Button} from "./ui/button";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { Consultation } from "./types/ConsultationTableColumns"

interface consultCardProps {
    consult: Consultation;
}

export default function ConsultCard( {consult}: consultCardProps) {

    return (
        <div className="flex flex-row items-center justify-between shadow-sm rounded-xl  bg-gradient-to-br from-slate-100 to-sky-50/75 p-3 h-[400px]">
            <div className="flex flex-col items-start justify-around w-[315px]" >
                    <h2 className=" text-black text-xl font-semibold break-words w-full h-[50px]">{consult.title_EN}</h2>
                <div className="w-full flex flex-col items-center h-[210px]">
                    <Image src={`/imgs/${consult.coverImage}`} alt={consult.title_EN} width={300} height={200} className="w-[300px] h-[200px] object-cover"/>
                </div>
                    <Button className="bg-sky-700 hover:bg-sky-600" >message about this consult</Button>
            </div>
            <div className="w-[375px]  flex flex-colitems-center   ">  
                    <p className="w-full text-center text-black break-words ">{consult.description_EN}</p>
            </div>
        </div>
    );
}   