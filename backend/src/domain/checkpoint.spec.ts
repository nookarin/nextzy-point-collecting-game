import { getCheckpointStatus } from './checkpoint.js';

describe('getCheckpointStatus', () => {
  it('ไม่ถึงขั้น รับรางวัลไม่ได้', () => {
    expect(getCheckpointStatus(4999, 5000, false)).toBe('locked');
  });

  it('ถึงขั้นพอดี รับรางวัลได้', () => {
    expect(getCheckpointStatus(5000, 5000, false)).toBe('claimable');
  });

  it('เกินขั้น รับรางวัลได้', () => {
    expect(getCheckpointStatus(8500, 7500, false)).toBe('claimable');
  });

  it('รับรางวัลได้ ไม่สนแต้ม', () => {
    expect(getCheckpointStatus(0, 5000, true)).toBe('claimed');
  });
});