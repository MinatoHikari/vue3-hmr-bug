import type { ProxyOptions } from 'vite';
import { loadEnv } from 'vite';

export default function (mode: string, serverList: string[]) {
    const env = loadEnv(mode, `${process.cwd()}/viteEnv`, '');
    const isLocal = env.LOCAL === '1';
    const base = '/api';
    const setting: Record<string, string | ProxyOptions> = {};
    serverList.forEach((i) => {
        const name = i.split('/').at(-1);
        const localUrl = name ? env[`${name.toUpperCase()}_SERVER_URL`] : env.BACKEND_URL;
        setting[`${base}${i}`] = {
            target: isLocal ? localUrl : env.DEVELOP_SERVER,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/webapi'),
        };
    });

    return setting;
}
