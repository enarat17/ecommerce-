import Image from 'next/image';
import { Member } from '@/components/types/MembersTableColumns';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface MemberCardProps {
    isRtl: boolean;
    member: Member;
}

export default function MemberCard({ isRtl, member }: MemberCardProps) {
    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 150, damping: 30 }}
            initial={isRtl ? { x: '100%' } : { x: '-100%' }}
            animate={{ x: '0%' }}
            className={clsx(
                "flex flex-col md:flex-row items-center w-full md:w-[70vw] max-w-5xl mx-auto ",
                { 'md:text-right': isRtl, 'md:text-start': !isRtl }
            )}
        >
            <div className={clsx(
                "w-full md:w-auto order-1",
                { 'md:order-last': isRtl, 'md:order-first': !isRtl }
            )}>
                <Image
                    src={`/imgs/images/${member.memberImage}`}
                    alt={isRtl ? member.name_AR : member.name_EN}
                    className="rounded-lg shadow-md w-full h-64 md:w-[275px] md:h-[300px] object-cover"
                    width={275}
                    height={350}
                    objectFit='cover'
                />
            </div>
            <div className='border-2 border-unitedSecondary bg-slate-100/75 rounded-lg shadow-sm p-4 md:p-6 m-1 w-full md:h-[300px] flex flex-col justify-between order-2'>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold mt-2 md:mt-4">
                        {isRtl ? member.name_AR : member.name_EN}
                    </h2>
                    <p className="text-gray-500 mt-1">
                        {isRtl ? member.position_AR : member.position_EN}
                    </p>
                </div>
                <p className={clsx(
                    " text-gray-700 overflow-hidden text-ellipsis",
                    { 'rtl-text': isRtl }
                )}>
                    {isRtl ? member.brief_AR : member.brief_EN}
                </p>
            </div>
        </motion.div>
    );
}