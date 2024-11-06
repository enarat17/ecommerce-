import Image from "next/image"
import { Blog } from "@/components/types/BlogTableColumns"
import { Button  } from "@/components/ui/button"
import Link from "next/link";
interface RecentBlogsProps {
    blogs:Blog[]
}


export default function RecentBlogs ({blogs}:RecentBlogsProps){
    if (!blogs || blogs.length === 0) {
        return null;
    }
    const mainBlog = blogs[0];
    const otherBlogs = blogs.slice(1);
    return (
    <div className=" p-4 shadow-lg bg-transparent  ">
        <h2 className="text-3xl font-semibold mb-4 text-black w-full text-start ml-3 ">Recent Blogs</h2>
        <div className="flex  gap-2">
        <div className="p-2 ml-1">
            <div className="flex flex-col items-start bg-blue-400/85 shadow-md w-[750px] pb-4">
                <Image src={`/imgs/${mainBlog.coverImage}`} alt="cover image" width={750} height={400} className="object-cover w-[750px] h-[400px]  bg-black" />
                <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-100">{mainBlog.title_EN}</h3>
                <p className="text-gray-100 line-clamp-3 break-words">{mainBlog.description_EN}</p>
                </div>
                <Link href={`/blogs/${mainBlog._id}`}>
                    <Button className="bg-sky-800 hover:bg-sky-600 text-white px-4 py-2 rounded-lg ml-4">
                        Read More
                    </Button>
                </Link>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            {otherBlogs.map((blog, index) => (
                <div key={index} className=" bg-gradient-to-r from-blue-200/70 to-blue-400/85 shadow-md p-4 rounded-lg ">
                    <div className="flex flex-row items-center justify-between  ">
                        <Image
                            src={`/imgs/${blog.coverImage}`}
                            alt="cover image"
                            width={250}
                            height={160}
                            className="object-cover w-[250px] h-[160px] rounded-lg bg-black"
                        />
                        <div className="flex flex-col justify-between ml-2">
                            <h3 className="text-lg font-semibold mb-2 text-gray-100">{blog.title_EN}</h3>
                            <p className="text-gray-100">{blog.description_EN}</p>
                            <Link href={`/blogs/${blog._id}`}>
                                <Button className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-lg mt-4">
                                    Read More
                                </Button>
                            </Link>
                        </div>
                    </div>   
                </div>
            ))}
        </div>
        </div>
    </div>
    )
}