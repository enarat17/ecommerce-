import Image from 'next/image';
import { useRef } from 'react';
import { Member } from '../types/MembersTableColumns';
import {motion,useInView} from 'framer-motion';

interface MemberCardProps {
    isRtl:boolean;
    member:Member;
}
export default function MemberCard ({isRtl,member}:MemberCardProps) {
     const ref = useRef(null);
     const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
    return(
        <motion.div 
            ref={ref}
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
            transition={{duration:0.2,type:'spring',stiffness:300,damping:30}}
            initial={{y:'100%'}}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            className='w-[280px] h-[400px] rounded-lg p-6 ' >
            <div className='flex flex-col items-center text-center my-1'>
                <div>
                    <Image src={`/imgs/images/${member.memberImage}`} alt={member.name_EN} width={260} height={250} className='rounded-md shadow-md w-[260px] h-[250px] object-cover' />
                </div>
                <h2 className='text-xl font-bold mt-2 text-wrap'>{isRtl ? member.name_AR : member.name_EN}</h2>
                <p className="text-base font-semibold text-gray-500 my-1">{isRtl ? member.position_AR : member.position_EN}</p>
            </div>
        </motion.div>
    );
}