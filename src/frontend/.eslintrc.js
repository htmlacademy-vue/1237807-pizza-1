module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "template-curly-spacing": "off",
    indent: [
      "error",
      2,
      {
        ignoredNodes: ["TemplateLiteral"]
      }
    ],
    semi: ["error", "always"],
    curly: ["error", "all"],
    "comma-dangle": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "space-in-parens": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    // https://eslint.vuejs.org/rules/
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always"
        }
      }
    ],
    "vue/match-component-file-name": "error",
    "vue/component-name-in-template-casing": "error",
    "vue/eqeqeq": "error",
    "vue/max-attributes-per-line": [
      "error",
      {
        multiline: {
          max: 1
        }
      }
    ]
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 8,
    sourceType: "module"
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};
