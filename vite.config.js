import { fileURLToPath, URL } from 'node:url'
import { cwd } from 'process';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import qiankun from 'vite-plugin-qiankun'

import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'

// 处理svg图标
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({mode}) => {
  return defineConfig({
    // todo 处理路径
    base: mode === 'development'? '/' : '/bedsideScreen',
    plugins: [
      vue(), 
      vueJsx(),
      qiankun('bedside-screen', { // 微应用名字，与主应用注册的微应用名字保持一致
        useDevMode: true
      }),
      Components({
        resolvers: [
          AntDesignVueResolver(),
        ],
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/global.scss";'
        }
      }
    },
    server: {
      port: '3000',
    },
  })
}
