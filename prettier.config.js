/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
module.exports = {
  semi: true, // 세미콜론
  singleQuote: false, // ''대신 "" 사용
  useTabs: false, // tab대신 space 사용
  tabWidth: 2, // tab 간격 2칸
  trailingComma: "all", // ,를 모든 곳에 사용
  printWidth: 100, // 라인별 최대 문자수를 100자로
  bracketSpacing: true, // 객체 리터럴 사이에 공백 { foo: bar }
  bracketSameLine: false, // HTML, JSX의 >를 다음 줄에 단독으로 두지 않고 마지막 줄 끝에 배치
};
