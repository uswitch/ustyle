# JAVASCRIPT STANDARDS

### INTRODUCTION

We are using [JSCS](http://jscs.info/) to lint our javascript code within uStyle.

### RULES

Our preset is set to use Airbnb as the base set of options.

```javascript
{
  "esnext": true,
  "verbose": true,
  "requireSpaceAfterKeywords": [
      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "case",
      "return",
      "try",
      "catch",
      "typeof"
  ],
  "disallowSpacesInNamedFunctionExpression": {
      "beforeOpeningRoundBrace": true
  },
  "disallowSpacesInFunctionExpression": {
      "beforeOpeningRoundBrace": true
  },
  "disallowSpacesInAnonymousFunctionExpression": {
      "beforeOpeningRoundBrace": true
  },
  "disallowSpacesInFunctionDeclaration": {
      "beforeOpeningRoundBrace": true
  },
  "disallowEmptyBlocks": true,
  "disallowSpacesInsideArrayBrackets": true,
  "disallowSpacesInsideParentheses": true,
  "disallowSpaceAfterObjectKeys": true,
  "disallowSpaceAfterPrefixUnaryOperators": true,
  "disallowSpaceBeforePostfixUnaryOperators": true,
  "disallowSpaceBeforeBinaryOperators": [
      ","
  ],
  "disallowMixedSpacesAndTabs": true,
  "disallowTrailingWhitespace": true,
  "requireTrailingComma": { "ignoreSingleLine": true },
  "disallowYodaConditions": true,
  "disallowKeywords": [ "with" ],
  "disallowKeywordsOnNewLine": ["else"],
  "disallowMultipleLineBreaks": true,
  "disallowMultipleLineStrings": true,
  "disallowMultipleVarDecl": true,
  "disallowSpaceBeforeComma": true,
  "disallowSpaceBeforeSemicolon": true,
  "requireSpaceBeforeBlockStatements": true,
  "requireParenthesesAroundIIFE": true,
  "requireSpacesInConditionalExpression": true,
  "requireBlocksOnNewline": 1,
  "requireCommaBeforeLineBreak": true,
  "requireSpaceBeforeBinaryOperators": true,
  "requireSpaceAfterBinaryOperators": true,
  "requireCamelCaseOrUpperCaseIdentifiers": true,
  "requireLineFeedAtFileEnd": true,
  "requireCapitalizedConstructors": true,
  "requireDotNotation": true,
  "requireSpacesInForStatement": true,
  "requireSpaceBetweenArguments": true,
  "requireCurlyBraces": [
      "do"
  ],
  "requirePaddingNewLinesBeforeLineComments": {
      "allExcept": "firstAfterCurly"
  },
  "requirePaddingNewLinesAfterBlocks": true,
  "requireSemicolons": true,
  "safeContextKeyword": "_this",
  "validateLineBreaks": "LF",
  "validateIndentation": 2,

  "validateQuoteMarks": "\"",
  "requireTrailingComma": null
}
```
