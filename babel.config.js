module.exports = {
  plugins: [['@babel/syntax-dynamic-import'], ['@babel/plugin-transform-runtime']],
  presets: [['@babel/preset-env', { targets: { node: 'current' }, modules: 'auto' }]],
};
