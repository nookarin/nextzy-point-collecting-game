import { addToScore, MAX_SCORE, pickPoints, POINT_OPTIONS } from './score.js';

describe('addToScore', () => {
  it('เพิ่มแต้ม ไม่ถึง cap', () => {
    expect(addToScore(1000, 500)).toBe(1500);
  });

  it('เพิ่มแต้ม ถึง cap พอดี', () => {
    expect(addToScore(7000, 3000)).toBe(MAX_SCORE);
  });

  it('เพิ่มแต้ม เกิน cap ทำให้ score = MAX_SCORE', () => {
    expect(addToScore(9800, 3000)).toBe(MAX_SCORE);
  });
});

describe('pickPoints', () => {
  it('จำนวนที่สุ่มได้ต่ำที่สุด', () => {
    expect(pickPoints(() => 0)).toBe(300);
  });

  it('จำนวนที่สุ่มได้มากที่สุด', () => {
    expect(pickPoints(() => 0.9999)).toBe(3000);
  });

  it('return ตัวเลือกที่เป็นไปได้เท่านั้น', () => {
    for (let i = 0; i < 1000; i++) {
      expect(POINT_OPTIONS).toContain(pickPoints());
    }
  });
});