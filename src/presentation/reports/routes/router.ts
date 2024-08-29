
import { RouteObject } from 'react-router-dom';

export const routesReports: Array<RouteObject> = [
    {
        path: 'install-system',
        async lazy() {
            const { InstallSystemPage } = await import('../pages/InstallSystemPage');
            return { Component: InstallSystemPage };
        }
    },
    {
        path: 'system-request',
        async lazy() {
            const { SystemRequestPage } = await import('../pages/SystemRequestPage');
            return { Component: SystemRequestPage };
        }
    },
    {
        path: 'technical-on-site',
        async lazy() {
            const { TechnicalOnSitePage } = await import('../pages/TechnicalOnSitePage');
            return { Component: TechnicalOnSitePage };
        }
    },
    {
        path: 'attention',
        async lazy() {
            const { AttentionPage } = await import('../pages/AttentionPage');
            return { Component: AttentionPage };
        }
    },
]