import CommandSidebar from "@/components/shared/Dashboard/CommandSidebar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import {NextIntlClientProvider} from 'next-intl';
import { getMessages } from 'next-intl/server';
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const messages = await getMessages();
    return (
        <NextIntlClientProvider messages={messages}>
        <ProtectedRoute allowedRoles={['admin']} isAdminRoute={true}>
        <div className="flex bg-white">
            <CommandSidebar />
            <div className="lg:w-full md:w-[500px] w-[250px]" >
                {children}
            </div>
        </div>
        </ProtectedRoute>
        </NextIntlClientProvider>
    );
}