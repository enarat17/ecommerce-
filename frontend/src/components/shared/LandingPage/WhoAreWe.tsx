import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button'
export default function WhoAreWe () {
  return (
    <section className=" text-sky-800 py-12 px-4 bg-transparent flex flex-row items-center justify-center gap-10 h-[100vh]">
      <Image src={`/imgs/landingPage/calcMan.jpg` } alt="Introduction" height={450} width={600} 
      className='object-cover w-[600px] h-[450px] shadow-md rounded-lg opacity-90' />
      <div className='flex flex-col text-start items-start justify-around h-[450px]'>
        <h1 className="text-4xl font-bold mb-6 text-center text-white py-2 ">Who are we ?</h1>
        <div>
          <p className="text-lg text-white break-words">Established in 1992, United group is a full-service firm, </p>
          <p className="text-lg text-white break-words"> offering affordable accounting solutions to Individual, </p>
          <p className="text-lg text-white break-words">local and international businesses.</p>
        </div>
        <div className="mt-4 ml-[300px]">
          <Link href="/auth/signup"><Button 
          className='text-gray-700 p-4 font-bold bg-cyan-200 w-[200px] h-[40px] hover:bg-transparent hover:border border-cyan-200 hover:text-white'>
            Join Us
          </Button></Link>
        </div>
      </div>
    </section>
  );
}
