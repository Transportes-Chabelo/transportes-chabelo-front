import { createBrowserRouter, Outlet } from 'react-router-dom';
import { NotFoundPage } from "../presentation/pages/not-found.page";
import { routesReports } from '../presentation/reports/routes/router';
import { routesAuth } from '../presentation/auth/routes/router';

export const router = createBrowserRouter([
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
                path: 'reports',
                element: <Outlet />,
                children: routesReports
            }
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