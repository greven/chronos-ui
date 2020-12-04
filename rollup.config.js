import commonJS from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import terser from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'

import pkg from './package.json'

const env = process.env.BUILD !== '' ? JSON.stringify(process.env.BUILD) : 'development'

const globals = {
  'react': 'React',
  'react-doc': 'ReactDOM',
}

const external = [...Object.keys(globals), ...Object.keys(pkg.peerDependencies || {})]

const plugins = [
  resolve({
    customResolveOptions: {
      moduleDirectory: ['node_modules', 'lib'],
    },
  }),
  commonJS({
    ignoreGlobal: true,
    include: 'node_modules/**',
  }),
  json(),
  typescript({ jsx: 'react' }),
  analyze({ summaryOnly: true, limit: 10 }),
  env == 'production' && terser(),
]

export default [
  {
    external,
    plugins,
    input: 'lib/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        globals,
      },
      {
        file: pkg.module,
        format: 'esm',
        globals,
      },
    ],
  },
]
