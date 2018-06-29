const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  root: true,
  parserOptions: { sourceType: 'module' },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  plugins: ['vue'],
  rules: {
    'arrow-parens': 'off',
    'comma-dangle': ['warn', 'never'],
    'generator-star-spacing': 'off',
    'no-debugger': isDev ? 'warn' : 'error',
    'semi': ['warn', 'always'],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }],
    'vue/html-self-closing': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: 5 }],
    'vue/name-property-casing': ['error', 'kebab-case'],
    // TODO: Add order for custom directives once supported
    'vue/attributes-order': ['error', {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'UNIQUE',
        'BINDING',
        'EVENTS',
        'CONTENT',
        'GLOBAL',
        'OTHER_ATTR'
      ]
    }],
    'vue/order-in-components': ['error', {
      order: [
        'el',
        'name',
        ['template', 'render', 'renderError'],
        ['parent','functional', 'delimiters', 'comments'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'data',
        'computed',
        'methods',
        'LIFECYCLE_HOOKS',
        'watch',
        ['directives', 'filters'],
        'components'
      ]
    }]
  }
}
