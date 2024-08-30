
import { RouteObject } from 'react-router-dom';

export const routesAuth: Array<RouteObject> = [
    {
        path: 'login',
        async lazy() {
            const { LogInPage } = await import('../pages/LogInPage');
            return { Component: LogInPage };
        }
    },
]