export type GeneratedQuestion = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  steps: string[];
  difficulty: 1 | 2 | 3;
  topic: string;
};

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function generateEquation(difficulty: 1 | 2 | 3): GeneratedQuestion {
  if (difficulty === 1) {
    const a = randInt(2, 9);
    const b = randInt(-10, 10) || 1;
    const c = randInt(-20, 20);
    const ans = (c - b) / a;
    const isInt = Number.isInteger(ans);
    
    return {
      id: `eq-${Date.now()}`,
      topic: 'equation',
      difficulty: 1,
      question: `Giải phương trình: ${a}x ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${c}`,
      correctOptionId: 'a',
      options: shuffle([
        { id: 'a', text: isInt ? ans.toString() : `${c - b}/${a}` },
        { id: 'b', text: isInt ? (ans + 1).toString() : `${c - b + 1}/${a}` },
        { id: 'c', text: isInt ? (ans - 1).toString() : `${c - b - 1}/${a}` },
        { id: 'd', text: isInt ? (-ans).toString() : `${-(c - b)}/${a}` },
      ]),
      explanation: `Chuyển vế: ${a}x = ${c} - (${b}) = ${c - b}. Chia 2 vế cho ${a}: x = ${(c - b) / a}`,
      steps: [`Chuyển vế: ${a}x = ${c} - (${b}) = ${c - b}`, `Chia 2 vế cho ${a}: x = ${(c - b) / a}`]
    };
  } else if (difficulty === 2) {
    let a = randInt(2, 9);
    let c = randInt(-9, 9) || 1;
    if (a === c) a++;
    const b = randInt(-10, 10);
    const d = randInt(-10, 10);
    const ans = (d - b) / (a - c);
    const isInt = Number.isInteger(ans);
    
    return {
      id: `eq-${Date.now()}`,
      topic: 'equation',
      difficulty: 2,
      question: `Giải phương trình: ${a}x ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${c}x ${d > 0 ? '+' : '-'} ${Math.abs(d)}`,
      correctOptionId: 'a',
      options: shuffle([
        { id: 'a', text: isInt ? ans.toString() : `${d - b}/${a - c}` },
        { id: 'b', text: isInt ? (ans + 1).toString() : `${d - b + 1}/${a - c}` },
        { id: 'c', text: isInt ? (ans - 1).toString() : `${d - b - 1}/${a - c}` },
        { id: 'd', text: isInt ? (-ans).toString() : `${-(d - b)}/${a - c}` },
      ]),
      explanation: `Chuyển vế: ${a}x - (${c}x) = ${d} - (${b}). Thu gọn: ${a - c}x = ${d - b}. x = ${(d - b) / (a - c)}`,
      steps: [`Chuyển vế chứa x sang trái: ${a}x - (${c}x) = ${d} - (${b})`, `Thu gọn: ${a - c}x = ${d - b}`, `x = ${(d - b) / (a - c)}`]
    };
  } else {
    const a = randInt(2, 9);
    const b = randInt(-10, 10);
    const c = randInt(2, 9);
    const d = randInt(2, 9);
    const ans = (c * d - b) / a;
    const isInt = Number.isInteger(ans);
    
    return {
      id: `eq-${Date.now()}`,
      topic: 'equation',
      difficulty: 3,
      question: `Giải phương trình: (${a}x ${b > 0 ? '+' : '-'} ${Math.abs(b)}) / ${c} = ${d}`,
      correctOptionId: 'a',
      options: shuffle([
        { id: 'a', text: isInt ? ans.toString() : `${c * d - b}/${a}` },
        { id: 'b', text: isInt ? (ans + 1).toString() : `${c * d - b + 1}/${a}` },
        { id: 'c', text: isInt ? (ans - 1).toString() : `${c * d - b - 1}/${a}` },
        { id: 'd', text: isInt ? (-ans).toString() : `${-(c * d - b)}/${a}` },
      ]),
      explanation: `Nhân 2 vế với ${c}: ${a}x + (${b}) = ${c * d}. Chuyển vế: ${a}x = ${c * d - b}. x = ${(c * d - b) / a}`,
      steps: [`Nhân 2 vế với ${c}: ${a}x + (${b}) = ${c * d}`, `Chuyển vế: ${a}x = ${c * d - b}`, `x = ${(c * d - b) / a}`]
    };
  }
}

export function generatePolynomial(difficulty: 1 | 2 | 3): GeneratedQuestion {
  const a = randInt(2, 9);
  return {
    id: `poly-${Date.now()}`,
    topic: 'polynomial',
    difficulty: 1,
    question: `Đơn thức ${a}x²y có bậc bằng?`,
    correctOptionId: 'a',
    options: shuffle([{id:'a',text:'3'}, {id:'b',text:'2'}, {id:'c',text:'4'}, {id:'d',text:a.toString()}]),
    explanation: `Bậc của đơn thức là tổng số mũ của các biến. x có số mũ 2, y có số mũ 1. Tổng = 3.`,
    steps: []
  };
}

export function generateIdentity(difficulty: 1 | 2 | 3): GeneratedQuestion {
  const a = randInt(2, 9);
  return {
    id: `id-${Date.now()}`,
    topic: 'identity',
    difficulty: 1,
    question: `Áp dụng hằng đẳng thức, tính (x + ${a})²`,
    correctOptionId: 'a',
    options: shuffle([
      {id:'a',text:`x² + ${2*a}x + ${a*a}`}, 
      {id:'b',text:`x² + ${a}x + ${a*a}`}, 
      {id:'c',text:`x² + ${a*a}`}, 
      {id:'d',text:`x² - ${2*a}x + ${a*a}`}
    ]),
    explanation: `Áp dụng (A+B)² = A² + 2AB + B² với A=x, B=${a}.`,
    steps: []
  };
}

export function generateGeometry(difficulty: 1 | 2 | 3): GeneratedQuestion {
  return {
    id: `geo-${Date.now()}`,
    topic: 'geometry',
    difficulty: 1,
    question: `Tổng các góc trong của một tứ giác bằng?`,
    correctOptionId: 'a',
    options: shuffle([{id:'a',text:'360°'}, {id:'b',text:'180°'}, {id:'c',text:'540°'}, {id:'d',text:'270°'}]),
    explanation: `Một tứ giác có tổng các góc trong luôn bằng 360 độ.`,
    steps: []
  };
}

export function generateProbability(difficulty: 1 | 2 | 3): GeneratedQuestion {
  const r = randInt(3, 8);
  const x = randInt(2, 6);
  return {
    id: `prob-${Date.now()}`,
    topic: 'probability',
    difficulty: 3,
    question: `Một túi có ${r} bi đỏ và ${x} bi xanh. Lấy ngẫu nhiên 1 bi. Xác suất lấy được bi đỏ là?`,
    correctOptionId: 'a',
    options: shuffle([{id:'a',text:`${r}/${r+x}`}, {id:'b',text:`${x}/${r+x}`}, {id:'c',text:`${r}/${x}`}, {id:'d',text:`1/${r+x}`}]),
    explanation: `Số kết quả thuận lợi (bi đỏ) = ${r}. Tổng số kết quả có thể = ${r+x}. Xác suất = ${r}/${r+x}.`,
    steps: []
  };
}

export function generateFraction(difficulty: 1 | 2 | 3): GeneratedQuestion {
  return {
    id: `frac-${Date.now()}`,
    topic: 'fraction',
    difficulty: 1,
    question: `Rút gọn phân thức: (x²-1)/(x+1) với x ≠ -1`,
    correctOptionId: 'a',
    options: shuffle([{id:'a',text:'x-1'}, {id:'b',text:'x+1'}, {id:'c',text:'x²'}, {id:'d',text:'1'}]),
    explanation: `Tử thức x²-1 = (x-1)(x+1). Chia cả tử và mẫu cho (x+1) ta được x-1.`,
    steps: []
  };
}

export const topicGenerators: Record<string, (d: 1|2|3) => GeneratedQuestion> = {
  'chuong-1': generatePolynomial,
  'chuong-2': generateIdentity,
  'chuong-3': generateGeometry,
  'chuong-4': generateGeometry,
  'chuong-6': generateFraction,
  'chuong-7': generateEquation,
  'chuong-8': generateProbability,
};

export function getSeenQuestions(): Set<string> {
  try { return new Set(JSON.parse(sessionStorage.getItem('seen-q') || '[]')); }
  catch { return new Set(); }
}
export function markSeen(q: string) {
  const seen = getSeenQuestions();
  seen.add(q);
  sessionStorage.setItem('seen-q', JSON.stringify([...seen]));
}

export function generateUnique(gen: (d:1|2|3)=>GeneratedQuestion, difficulty: 1|2|3, maxRetries=10): GeneratedQuestion {
  const seen = getSeenQuestions();
  for (let i=0; i<maxRetries; i++) {
    const q = gen(difficulty);
    if (!seen.has(q.question)) { markSeen(q.question); return q; }
  }
  return gen(difficulty);
}
