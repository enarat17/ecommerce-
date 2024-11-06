'use client';
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button 
            variant="ghost" 
            className="font-medium flex flex-row items-center justify-between m-1"
            onClick={() => router.back()}
        >
            <ArrowLeftCircle size={18} />
            Go Back
        </Button>
    );
}
