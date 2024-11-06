'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserContext } from '@/lib/Providers/UserProvider';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
    isAdminRoute: boolean;
    children: React.ReactNode;
    allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles = [], isAdminRoute }: ProtectedRouteProps) {
    const { user, isLoading } = useUserContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log('ProtectedRoute useEffect triggered:', { user, isLoading });
    
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                let redirectPath;
                const locale = pathname.split('/')[1]; // Assuming the locale is always the first part of the path
    
                if (!user) {
                    console.log('User not found, redirecting to login');
                    redirectPath = isAdminRoute ? '/admin/login' : '/auth/login';
                } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
                    console.log('User role not authorized, redirecting to login');
                    redirectPath = isAdminRoute ? '/admin/login' : '/auth/login';
                } else {
                    console.log('User authenticated and authorized');
                    return; // User is authenticated and authorized
                }
    
                // Prepend the current locale to the redirect path
                const localizedRedirectPath = `/${locale}${redirectPath}`;
                console.log('Redirecting to:', localizedRedirectPath);
                router.push(localizedRedirectPath);
            }, 500); // Add a 500ms delay before executing redirect logic
    
            return () => clearTimeout(timeoutId); // Clean up timeout if component unmounts or rerenders
        }
    }, [user, isLoading, router, allowedRoles, isAdminRoute, pathname]);
    

    if (isLoading) {
        console.log('Loading user data...');
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner  />
            </div>);
    }

    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
        return null; // Don't render anything while redirecting
    }

    return <>{children}</>;
}
