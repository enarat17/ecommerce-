// components/ClientCard.tsx
import Image from 'next/image';
import { Client } from './types/ClientTableColumns';
import {motion} from 'framer-motion';
interface ClientCardProps {
    isRtl: boolean;
    client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ isRtl,client}: ClientCardProps) => {
    return (
        <motion.div 
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
            transition={{duration:0.2}}
            className="flex flex-col items-center text-center  p-6 rounded-lg bg-white w-[250px] h-[200px] shadow-md">
            <Image src={`/imgs/images/${client.clientImage}`} alt={client.name_EN} width={120} height={120} className="w-[150px] h-[100px] object-cover" />
            <h2 className="text-lg text-unitedPrimary text-wrap font-bold p-1 mt-2 over">{isRtl ? client.name_AR : client.name_EN}</h2>
        </motion.div>
    );
};

export default ClientCard;
