// vite.config.ts
import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite-plus'
import ssrPlugin from 'vite-ssr-components/plugin'
import { inertiaPages } from '@hono/inertia/vite'

export default defineConfig({
  staged: {
    "*": "vp check --fix"
  },
  fmt: {},
  lint: {"options":{"typeAware":true,"typeCheck":true}},
  plugins: [inertiaPages(), cloudflare(), ssrPlugin()]
});
