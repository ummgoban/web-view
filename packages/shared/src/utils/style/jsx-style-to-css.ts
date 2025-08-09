import {CSSProperties} from 'react';

/**
 * @description jsx 스타일 스타일 객체를 css 문자열로 변환
 * @param style
 * @example
 * ```tsx
 * const style = {
 *     color: 'red',
 *     fontSize: 12,
 * }
 * const css = jsxStyleToCss(style);
 * console.log(css);
 * // color: red; font-size: 12px;
 * ```
 */
export function jsxStyleToCss(style: CSSProperties) {
  return Object.entries(style)
    .map(([key, value]) => {
      const kebabCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();

      if (typeof value === 'number') {
        return `${kebabCaseKey}: ${value}px;`;
      }

      return `${kebabCaseKey}: ${value};`;
    })
    .join(' ');
}
