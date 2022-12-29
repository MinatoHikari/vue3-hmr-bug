export interface NavDataOrigin {
    key?: number | string | symbol;
    children?: NavDataOrigin[];
    label?: string | JSX.Element;
    path?: string;
    parent?: { label?: string | JSX.Element; children?: NavDataOrigin[] } | NavDataOrigin;
    name?: string;
    hidden?: boolean;
    redirect?: string;
    query?: string;
    alwaysShow?: boolean;
    component?: string;
    meta?: RouteMeta;
    rootKey?: string;
}

export interface RouteMeta {
    title: string;
    icon: string;
    noCache: boolean;
    link: string;
}

export const routerMap = new Map<string, NavDataOrigin>();

export const normalizePath = (path: string) => {
    if (path[0] !== '/') return `/${path}`;
    return path;
};

export const deNormalizePath = (path: string) => {
    const arr = path.split('/');
    if (path[0] === '/') arr.shift();
    return arr.join('/');
};

export const formatRoutes = <T = Record<string, unknown>>(
    source: T[],
    parentName?: string,
    rootKey?: string,
) => {
    for (let i = 0; i < source.length; i++) {
        const item = (source as NavDataOrigin[])[i];
        if (parentName) item.label = `${parentName}-${item.path}`;
        else item.label = `${item.path}`;
        if (rootKey) item.rootKey = rootKey;
        if (item.path) {
            item.path = normalizePath(item.path);
            routerMap.set(item.path, item);
        }
        item.key = item.name ?? (item.path as string);
        if (item.children) {
            formatRoutes(item.children, item.path, rootKey ?? item.key);
        }
    }
    return source as NavDataOrigin[];
};
