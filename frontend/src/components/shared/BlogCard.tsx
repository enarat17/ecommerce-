import {
  Card,CardContent,CardFooter,CardHeader,CardTitle,CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Blog }from "@/components/types/BlogTableColumns";
import Image from "next/image";
import {Link} from '@/i18n/routing';

interface BlogCardProps {
  blog: Blog;
  isRtl: boolean;
}

export default function BlogCard ({blog, isRtl}: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat(isRtl ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(blog.createdAt));

  return (
    <div className="w-full navbar:w-[90%] h-auto navbar:h-[300px] flex flex-col navbar:flex-row my-1 bg-white rounded-lg shadow-md">
      {!isRtl && (
        <Image 
          src={`/imgs/images/${blog.coverImage}`} 
          alt={isRtl ? blog.title_AR : blog.title_EN} 
          width={300} 
          height={300} 
          className="object-cover w-full navbar:w-[300px] navbar: h-[200px] navbar:h-[300px] rounded-t-lg navbar:rounded-t-none navbar:rounded-l-lg"
        />
      )}
      <div className={`flex flex-col ${isRtl ? 'items-end' : 'items-start'} justify-between w-full`}>
        <div className={`px-2 text-white bg-unitedPrimary ${isRtl ? 'rounded-bl-lg' : 'rounded-br-lg'}`}>
          {formattedDate}
        </div>
        <h2 className="text-slate-900 px-4 navbar:px-8 text-lg navbar:text-2xl font-bold mt-2 navbar:mt-0">
          {isRtl ? blog.title_AR : blog.title_EN}
        </h2>
        <p className={`text-black text-base my-2 overflow-hidden h-[100px] px-4 navbar:px-8 ${isRtl && 'text-right'} hidden navbar:block`}>
          {isRtl ? blog.description_AR : blog.description_EN}
        </p>
        <div className={`flex flex-row ${!isRtl && 'items-end justify-end'} w-full`}>
          <Link href={`/articles/${blog.slug}`}>
            <Button className="bg-unitedPrimary hover:bg-unitedPrimary/85 m-4 navbar:m-8">
              {isRtl ? 'قراءة المزيد' : 'Read more'}
            </Button>
          </Link>
        </div>
      </div>
      {isRtl && (
        <Image 
          src={`/imgs/images/${blog.coverImage}`} 
          alt={isRtl ? blog.title_AR : blog.title_EN} 
          width={300} 
          height={300} 
          className="object-cover w-full navbar:w-[300px] h-[200px] navbar:h-[300px] rounded-b-lg navbar:rounded-b-none navbar:rounded-r-lg"
        />
      )}
    </div>
  );
}