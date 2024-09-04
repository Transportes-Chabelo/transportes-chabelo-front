import { createHashRouter } from 'react-router-dom';
import { NotFoundPage } from "../presentation/pages/not-found.page";
import { routesAuth } from '../presentation/auth/routes/router';

export const router = createHashRouter([
    {
        path: '/',
        async lazy() {
            const { RootLayout } = await import('../presentation/layouts/RootLayout');
            return { Component: RootLayout };
        },
        errorElement:
            <article className="content">
                <NotFoundPage />
            </article>,
        children: [
            {
                path: 'home',
                async lazy() {
                    const { HomePage } = await import('../presentation/pages/HomePage');
                    return { Component: HomePage };
                }
            },
            {
                path: 'users',
                async lazy() {
                    const { UsersPage } = await import('../presentation/pages/UsersPage');
                    return { Component: UsersPage };
                }
            },
            {
                path: 'group-device',
                async lazy() {
                    const { GroupDevicePage } = await import('../presentation/pages/GroupDevice');
                    return { Component: GroupDevicePage };
                }
            },
            {
                path: 'home/branch/:id',
                async lazy() {
                    const { BranchDevicesPage } = await import('../presentation/pages/BranchDevicesPage');
                    return { Component: BranchDevicesPage };
                }
            },
        ]
    },
    {
        path: 'auth',
        async lazy() {
            const { AuthLayout } = await import('../presentation/layouts/AuthLayout');
            return { Component: AuthLayout };
        },
        children: routesAuth,
    }
]);