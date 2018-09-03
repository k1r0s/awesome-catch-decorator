import babel from 'rollup-plugin-babel';

export default {
  input: 'index.js',
  output: [
    { file: 'dist/awesome-catch-decorator.umd.js', format: 'umd', name: 'awesomeCatchDecorator' }
  ],
  plugins: babel()
}
