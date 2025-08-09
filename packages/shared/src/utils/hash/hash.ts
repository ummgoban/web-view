const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let crc = i;
  for (let j = 0; j < 8; j++) {
    crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
  }
  crcTable[i] = crc;
}

const crc32 = (str: string): number => {
  let crc = 0xffffffff;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    crc = (crc >>> 8) ^ crcTable[(crc ^ char) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
};

/**
 * @description 6자리 해시 생성 함수
 * @warning !충돌가능성이 있는 함수!
 */
export const to6DigitHash = (str: string): string => {
  const crc = crc32(str).toString(16);
  return crc.slice(0, 6).toUpperCase();
};
