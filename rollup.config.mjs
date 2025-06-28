import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const plugins = [
  resolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    presets: ['@babel/preset-env', '@babel/preset-react'],
    exclude: 'node_modules/**',
  }),
];

export default [
  // Eval or script-injectable bundle
  {
    input: 'index.js',
    output: {
      file: 'dist/nalu-plugin.iife.js',
      format: 'iife',
      name: 'PluginRegister', // Must set this global
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    external: ['react', 'react-dom'],
    plugins,
  },
  // ES module bundle
  {
    input: 'index.js',
    output: {
      file: 'dist/nalu-plugin.es.js',
      format: 'es',
    },
    external: ['react', 'react-dom'],
    plugins,
  },
];
