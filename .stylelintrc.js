module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended',
    'stylelint-config-property-sort-order-smacss'
  ],
  rules: {
    'no-empty-source': null,
    'selector-max-compound-selectors': 7,
    'max-nesting-depth': [
      3,
      {
        ignore: ['pseudo-classes']
      }
    ],
    'color-named': ['never', { severity: 'warning' }],
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    "order/properties-alphabetical-order": null,
    "selector-pseudo-element-no-unknown": null
  }
};
