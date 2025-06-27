import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'index.js',
  output: {
    file: 'dist/nalu-plugin.bundle.js',
    format: 'iife',
    name: 'PluginRegister', // exposed global for eval
    globals: {
      react: 'React',         // assume host app provides React via window.React
      'react-dom': 'ReactDOM',
    },
  },
  external: ['react', 'react-dom'], // prevent bundling these
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      exclude: 'node_modules/**',
    }),
  ],
};
