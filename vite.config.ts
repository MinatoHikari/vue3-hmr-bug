/// <reference types="vitest" />

import path from 'path';
import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import type { PageOptions } from 'vite-plugin-pages';
import Pages from 'vite-plugin-pages';
import Markdown from 'vite-plugin-vue-markdown';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Layouts from 'vite-plugin-vue-layouts';
import Unocss from 'unocss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import svgLoader from 'vite-svg-loader';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { loadEnv } from 'vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import legacy from '@vitejs/plugin-legacy';
import generateProxySettings from './scripts/generateProxySettings';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, `${process.cwd()}/viteEnv`, '');
    const isLocal = env.LOCAL === '1';
    process.env.BROWSER = env.BROWSER ?? '';
    const pageDirs: (string | PageOptions)[] = ['src/pages'];
    const layoutsDirs: string[] = ['src/layouts', 'src/layouts/**'];
    if (mode === 'development') {
        pageDirs.push({ dir: 'docs', baseRoute: '/docs' });
        layoutsDirs.push('docs/layouts');
    }
    return {
        resolve: {
            alias: {
                '~/': `${path.resolve(__dirname, 'src')}/`,
                '~doc/': `${path.resolve(__dirname, 'doc')}/`,
                '~github-markdown/': `${path.resolve(
                    __dirname,
                    'node_modules',
                    'github-markdown-css',
                )}/`,
            },
        },
        build: { sourcemap: true },
        server: {
            hmr: true,
            proxy: generateProxySettings(mode, ['/']),
        },
        plugins: [
            Vue({
                include: [/\.vue$/, /\.md$/],
                reactivityTransform: true,
            }),

            vueJsx({
                // options are passed on to @vue/babel-plugin-jsx
            }),

            vueSetupExtend(),

            Markdown({
                markdownItSetup(md) {},
            }),

            // https://github.com/hannoeru/vite-plugin-pages
            Pages({
                importMode: 'async',
                exclude: ['**/modules/**', '**/scripts/**', '**/components/**', '**/layouts/**'],
                extensions: ['vue', 'md'],
                routeNameSeparator: '/',
                dirs: pageDirs,
            }),

            Layouts({
                layoutsDirs,
            }),

            // https://github.com/antfu/unplugin-auto-import
            AutoImport({
                imports: [
                    'vue',
                    'vue/macros',
                    'vue-router',
                    '@vueuse/core',
                    'vue-i18n',
                    'pinia',
                    {
                        'xe-utils': ['toArrayTree'],
                    },
                    {
                        navuelidate: ['useFormCreator', 'formItemMap', 'maybeNull', 'syncData'],
                    },
                ],
                dts: true,
                dirs: ['./src/composables', './src/composables/**'],
            }),

            VueI18n({
                runtimeOnly: true,
                compositionOnly: true,
                include: [path.resolve(__dirname, 'locales/**')],
            }),

            // https://github.com/antfu/vite-plugin-components
            Components({
                dts: true,
                resolvers: [
                    NaiveUiResolver(),
                    IconsResolver(),
                    (componentName) => {
                        if (componentName === 'FormCreator') {
                            return { name: componentName, from: 'navuelidate' };
                        }
                    },
                ],
            }),

            // https://github.com/antfu/unocss
            // see unocss.config.ts for config
            Unocss(),
            svgLoader(),
            Icons({
                compiler: 'vue3',
                customCollections: {
                    'assets-icons': FileSystemIconLoader('src/assets/icons', (svg) =>
                        svg.replace(/^<svg /, '<svg fill="currentColor" '),
                    ),
                },
            }),

            legacy({
                targets: ['defaults', 'not IE 11'],
            }),
        ],

        // https://github.com/vitest-dev/vitest
        test: {
            include: ['test/**/*.test.ts'],
            exclude: ['dist/**', 'test/component.test.ts'],
            environment: 'jsdom',
            deps: {
                inline: ['@vue', '@vueuse', 'vue-demi'],
            },
        },
    };
});
