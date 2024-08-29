
import { RouteObject } from 'react-router-dom';

export const routesAuth: Array<RouteObject> = [
    {
        path: 'login',
        async lazy() {
            const { LogInPage } = await import('../pages/LogInPage');
            return { Component: LogInPage };
        }
    },
    {
        path: 'register',
        async lazy() {
            const { RegisterPage } = await import('../pages/RegisterPage');
            return { Component: RegisterPage };
        }
    }
]