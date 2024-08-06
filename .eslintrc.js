
/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true, // 이 ESLint 설정이 프로젝트의 루트 설정임을 나타냅니다
  ignorePatterns: ["node_modules/*", "build/*", "dist/*", ".next/*"], // 이 패턴에 해당하는 파일/폴더는 린팅에서 제외

  parser: "@typescript-eslint/parser", // TypeScript 코드를 파싱하기 위한 파서를 지정
  parserOptions: {
    ecmaVersion: "latest", // 최신 ECMAScript 버전을 사용합
    sourceType: "module", // ES 모듈을 사용함을 나타냅니다
    ecmaFeatures: { jsx: true }, // JSX 문법을 사용함을 나타냅니다
  },
  settings: {
    "import/resolver": { typescript: {} }, // import 문을 해석할 때 TypeScript 설정을 사용
  },

  extends: [
    "eslint:recommended", // ESLint 기본 추천 규칙
    "plugin:@typescript-eslint/recommended", // TypeScript 추천 규칙
    "plugin:import/recommended", // import 관련 추천 규칙
    "plugin:prettier/recommended", // Prettier 통합을 위한 설정
    "next/core-web-vitals", // Next.js Core Web Vitals 관련 규칙
  ],
  plugins: ["@typescript-eslint", "import", "prettier"], // 사용할 플러그인들

  rules: {
    "no-implicit-coercion": "error", // 암시적 타입 변환을 금지합니다.

    curly: ["error", "all"], // 모든 제어문에 중괄호를 사용해야 합니다.
    eqeqeq: ["error", "always", { null: "ignore" }], // 항상 === 와 !== 를 사용해야 합니다. (null 비교 제외)

    "import/order": [
      "error",
      {
        "newlines-between": "always", // import 그룹 사이에 항상 새 줄을 추가
        alphabetize: {
          order: "asc", // import를 알파벳 오름차순으로 정렬
          caseInsensitive: true, // 정렬 시 대소문자를 구분하지 않습니다
        },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"], // import 그룹의 순서를 정의
        pathGroups: [
          {
            pattern: "{next,next/**,react,react-dom}", // Next.js와 React 관련 import를 특별 처리
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "next"], // 위의 pathGroups에서 제외할 타입을 지정
      },
    ],

    "@typescript-eslint/naming-convention": [ // 네이밍 컨벤션 규칙을 정의
      "error",
      {
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        selector: "variable",
        leadingUnderscore: "allow",
      },
      { format: ["camelCase", "PascalCase"], selector: "function" },
      { format: ["PascalCase"], selector: "interface" },
      { format: ["PascalCase"], selector: "typeAlias" },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }], // 사용하지 않는 변수에 대해 경고합니다. (rest 매개변수 제외)

    "react/display-name": "off", // React 컴포넌트의 displayName 검사를 비활성화합니다 (forwardRef에서 미사용)
    "react/no-unknown-property": ["error"], // 알 수 없는 React 속성 사용 시 에러를 발생시킵니다.

    "prettier/prettier": ["warn"], // Prettier 규칙 위반 시 경고를 발생시킵니다.
  },
}