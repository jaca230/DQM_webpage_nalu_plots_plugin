// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'index.js',  // Entry file of your plugin
  output: {
    file: 'dist/nalu-plugin.bundle.js', // Output bundle file
    format: 'iife',        // Immediately Invoked Function Expression (for eval)
    name: 'PluginRegister',  // Global variable name
  },
  plugins: [
    resolve(),  // so Rollup can find node_modules imports
    commonjs(), // so Rollup can convert CommonJS to ES6 modules if needed
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'], // transpile modern JS + JSX
      exclude: 'node_modules/**', // don't transpile dependencies
    }),
  ],
};
