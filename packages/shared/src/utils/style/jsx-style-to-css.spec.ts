import {jsxStyleToCss} from './jsx-style-to-css';

describe('jsxStyleToCss', () => {
  it('should convert style object to css string', () => {
    const style = {
      display: 'flex',
      justifyContent: 'center',
    };
    const css = jsxStyleToCss(style);
    expect(css).toBe('display: flex; justify-content: center;');
  });

  it('should convert style object to css string with px postfix when value is number', () => {
    const style = {
      color: 'red',
      fontSize: 12,
    };
    const css = jsxStyleToCss(style);
    expect(css).toBe('color: red; font-size: 12px;');
  });
});
