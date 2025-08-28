export const ROUTES = {
    forgotPassword: '/auth/forgot-password',
    login: '/auth/login',
    signup: '/auth/signup',
    reportIssue: '/home/report-issues'
} as const;

export type RouteValues = typeof ROUTES[keyof typeof ROUTES];
// This creates: '/auth/forgot-password' | '/auth/login' | '/auth/signup'