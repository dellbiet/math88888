export type Example = { question: string; solution: string[] };
export type QuizQuestion = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation?: string;
};
export type Lesson = {
  id: string;
  title: string;
  chapterId: string;
  type?: "lesson" | "practice" | "chapter-test";
  content: { theory: string[]; examples: Example[]; formulas: string[] };
  quiz: QuizQuestion[];
  hasGraph?: boolean;
};
export type Chapter = {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  lessons: Lesson[];
};

export const curriculum: Chapter[] = [
  {
    id: "chuong-1",
    title: "Chương I: Đa thức",
    shortTitle: "Đa thức",
    icon: "Hash",
    color: "text-blue-500",
    lessons: [
      {
        id: "bai-1",
        title: "Bài 1: Đơn thức",
        chapterId: "chuong-1",
        content: {
          theory: ["Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.", "Đơn thức thu gọn là đơn thức chỉ có một tích của một số với các biến, mỗi biến đã được nâng lên lũy thừa. Số đó gọi là hệ số.", "Bậc của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến trong đơn thức.", "Hai đơn thức đồng dạng là hai đơn thức có cùng phần biến. Cộng trừ đơn thức đồng dạng: cộng trừ hệ số, giữ nguyên phần biến."],
          examples: [{question: "Tìm bậc và hệ số của đơn thức -5x³y²z", solution: ["Hệ số: -5", "Bậc = 3 + 2 + 1 = 6", "Vậy đơn thức -5x³y²z có hệ số -5 và bậc 6."]}, {question: "Tính: 3x²y + (-7x²y)", solution: ["Hai đơn thức 3x²y và -7x²y là hai đơn thức đồng dạng (cùng phần biến x²y).", "Cộng hệ số: 3 + (-7) = -4", "Kết quả: 3x²y + (-7x²y) = -4x²y"]}],
          formulas: ["Đơn thức: hệ số × x^m × y^n × ...", "Bậc đơn thức = tổng các số mũ", "axⁿ ± bxⁿ = (a±b)xⁿ"]
        },
        quiz: [
          {id: "q1", question: "Biểu thức nào là đơn thức?", options: [{id: "a", text: "2x + y"}, {id: "b", text: "3xy²"}, {id: "c", text: "x/y"}, {id: "d", text: "x - 1"}], correctOptionId: "b", explanation: "Đơn thức chỉ gồm một số, một biến hoặc tích giữa số và các biến."},
          {id: "q2", question: "Bậc của đơn thức 4x²y³ là:", options: [{id: "a", text: "2"}, {id: "b", text: "3"}, {id: "c", text: "4"}, {id: "d", text: "5"}], correctOptionId: "d", explanation: "Bậc là tổng các số mũ: 2 + 3 = 5."},
          {id: "q3", question: "Hệ số của đơn thức -x²y là:", options: [{id: "a", text: "-1"}, {id: "b", text: "1"}, {id: "c", text: "0"}, {id: "d", text: "-2"}], correctOptionId: "a", explanation: "Hệ số là phần số đứng trước biến, ở đây là -1."},
          {id: "q4", question: "Hai đơn thức nào đồng dạng?", options: [{id: "a", text: "2x²y và 2xy²"}, {id: "b", text: "-3xy và 5xy"}, {id: "c", text: "x² và y²"}, {id: "d", text: "4x và 4"}], correctOptionId: "b", explanation: "Cùng phần biến xy."},
          {id: "q5", question: "Kết quả của 5xy² - 2xy² là:", options: [{id: "a", text: "3xy²"}, {id: "b", text: "7xy²"}, {id: "c", text: "3x²y"}, {id: "d", text: "10xy²"}], correctOptionId: "a", explanation: "(5-2)xy² = 3xy²."},
          {id: "q6", question: "Thu gọn đơn thức 2x(-3x²y):", options: [{id: "a", text: "-6x³y"}, {id: "b", text: "6x³y"}, {id: "c", text: "-6x²y"}, {id: "d", text: "-5x³y"}], correctOptionId: "a", explanation: "2 * (-3) * x * x² * y = -6x³y."}
        ]
      },
      {
        id: "bai-2", title: "Bài 2: Đa thức", chapterId: "chuong-1",
        content: {theory: ["Đa thức là tổng của những đơn thức."], formulas: ["A + B = C"], examples: [{question: "Thu gọn", solution: ["Thực hiện phép cộng đơn thức đồng dạng"]}]},
        quiz: [{id: "q1", question: "Đa thức là gì?", options: [{id: "a", text: "Tổng đơn thức"}, {id: "b", text: "Tích đơn thức"}, {id: "c", text: "Thương"}, {id: "d", text: "Hiệu"}], correctOptionId: "a", explanation: "Định nghĩa đa thức"}]
      },
      {
        id: "bai-3", title: "Bài 3: Phép cộng và phép trừ đa thức", chapterId: "chuong-1",
        content: {theory: ["Cộng trừ đa thức bằng cách nhóm các đơn thức đồng dạng."], formulas: ["(A) + (B)"], examples: [{question: "Cộng", solution: ["Bỏ ngoặc"]}]},
        quiz: [{id: "q1", question: "Cộng x+y và x-y", options: [{id: "a", text: "2x"}, {id: "b", text: "2y"}, {id: "c", text: "0"}, {id: "d", text: "x"}], correctOptionId: "a", explanation: "x+x=2x"}]
      },
      {
        id: "luyen-tap-c1-1", title: "Luyện tập chung (trang 17)", chapterId: "chuong-1", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-4", title: "Bài 4: Phép nhân đa thức", chapterId: "chuong-1",
        content: {theory: ["Nhân đa thức với đa thức bằng cách phân phối."], formulas: ["A(B+C) = AB + AC"], examples: [{question: "Nhân", solution: ["Phân phối"]}]},
        quiz: [{id: "q1", question: "x(x+1)", options: [{id: "a", text: "x²+x"}, {id: "b", text: "x+1"}, {id: "c", text: "x²"}, {id: "d", text: "2x"}], correctOptionId: "a", explanation: "Phân phối"}]
      },
      {
        id: "bai-5", title: "Bài 5: Phép chia đa thức cho đơn thức", chapterId: "chuong-1",
        content: {theory: ["Chia từng hạng tử của đa thức cho đơn thức."], formulas: ["(A+B)/C = A/C + B/C"], examples: [{question: "Chia", solution: ["Chia"]}]},
        quiz: [{id: "q1", question: "(x²+x)/x", options: [{id: "a", text: "x+1"}, {id: "b", text: "x"}, {id: "c", text: "1"}, {id: "d", text: "0"}], correctOptionId: "a", explanation: "Chia từng hạng tử"}]
      },
      {
        id: "luyen-tap-c1-2", title: "Luyện tập chung (trang 25)", chapterId: "chuong-1", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-tap-cuoi-c1", title: "Bài tập cuối chương I", chapterId: "chuong-1", type: "chapter-test",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      }
    ]
  },
  {
    id: "chuong-2",
    title: "Chương II: Hằng đẳng thức",
    shortTitle: "Hằng đẳng thức",
    icon: "Equal",
    color: "text-purple-500",
    lessons: [
      {
        id: "bai-6",
        title: "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
        chapterId: "chuong-2",
        content: {
          theory: ["Bình phương của một tổng: (a+b)² = a² + 2ab + b²", "Bình phương của một hiệu: (a-b)² = a² - 2ab + b²", "Hiệu hai bình phương: a² - b² = (a+b)(a-b)"],
          examples: [{question: "Khai triển (x+2)²", solution: ["(x+2)² = x² + 2*x*2 + 2² = x² + 4x + 4"]}],
          formulas: ["(a+b)² = a² + 2ab + b²", "(a-b)² = a² - 2ab + b²", "a² - b² = (a+b)(a-b)"]
        },
        quiz: [
          {id: "q1", question: "Khai triển (x-3)²", options: [{id: "a", text: "x²-6x+9"}, {id: "b", text: "x²-9"}, {id: "c", text: "x²+6x+9"}, {id: "d", text: "x²-3x+9"}], correctOptionId: "a", explanation: "Áp dụng bình phương một hiệu"},
          {id: "q2", question: "Viết x²-16 dưới dạng tích", options: [{id: "a", text: "(x-4)(x+4)"}, {id: "b", text: "(x-4)²"}, {id: "c", text: "(x+4)²"}, {id: "d", text: "(x-16)(x+1)"}], correctOptionId: "a", explanation: "a²-b² = (a-b)(a+b)"},
          {id: "q3", question: "Khai triển (2x+1)²", options: [{id: "a", text: "4x²+4x+1"}, {id: "b", text: "4x²+1"}, {id: "c", text: "2x²+4x+1"}, {id: "d", text: "4x²+2x+1"}], correctOptionId: "a", explanation: "Bình phương một tổng"},
          {id: "q4", question: "Giá trị của 101² - 1", options: [{id: "a", text: "10200"}, {id: "b", text: "10000"}, {id: "c", text: "10100"}, {id: "d", text: "10001"}], correctOptionId: "a", explanation: "(101-1)(101+1) = 100 * 102 = 10200"},
          {id: "q5", question: "(x-y)(x+y) bằng:", options: [{id: "a", text: "x²-y²"}, {id: "b", text: "x²+y²"}, {id: "c", text: "x²-2xy+y²"}, {id: "d", text: "x²+2xy+y²"}], correctOptionId: "a", explanation: "Hiệu hai bình phương"},
          {id: "q6", question: "Rút gọn (x+1)² - (x-1)²", options: [{id: "a", text: "4x"}, {id: "b", text: "2x²"}, {id: "c", text: "2"}, {id: "d", text: "0"}], correctOptionId: "a", explanation: "Khai triển và trừ"}
        ]
      },
      {
        id: "bai-7", title: "Bài 7: Lập phương của một tổng. Lập phương của một hiệu", chapterId: "chuong-2",
        content: {
          theory: ["Lập phương của một tổng: (a+b)³ = a³ + 3a²b + 3ab² + b³", "Lập phương của một hiệu: (a-b)³ = a³ - 3a²b + 3ab² - b³"],
          formulas: ["(a+b)³ = a³ + 3a²b + 3ab² + b³", "(a-b)³ = a³ - 3a²b + 3ab² - b³"],
          examples: [{question: "Khai triển (x+1)³", solution: ["x³+3x²+3x+1"]}]
        },
        quiz: [{id: "q1", question: "Khai triển (x-1)³", options: [{id: "a", text: "x³-3x²+3x-1"}, {id: "b", text: "x³-1"}, {id: "c", text: "x³+1"}, {id: "d", text: "x³-3x²-3x-1"}], correctOptionId: "a", explanation: "Lập phương một hiệu"}]
      },
      {
        id: "bai-8", title: "Bài 8: Tổng và hiệu hai lập phương", chapterId: "chuong-2",
        content: {
          theory: ["Tổng hai lập phương: a³+b³=(a+b)(a²-ab+b²)", "Hiệu hai lập phương: a³-b³=(a-b)(a²+ab+b²)"],
          formulas: ["a³+b³=(a+b)(a²-ab+b²)", "a³-b³=(a-b)(a²+ab+b²)"],
          examples: [{question: "Phân tích x³-8", solution: ["(x-2)(x²+2x+4)"]}]
        },
        quiz: [{id: "q1", question: "x³+1 bằng", options: [{id: "a", text: "(x+1)(x²-x+1)"}, {id: "b", text: "(x-1)(x²+x+1)"}, {id: "c", text: "x³+1"}, {id: "d", text: "(x+1)³"}], correctOptionId: "a", explanation: "Tổng hai lập phương"}]
      },
      {
        id: "luyen-tap-c2-1", title: "Luyện tập chung (trang 40)", chapterId: "chuong-2", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-9", title: "Bài 9: Phân tích đa thức thành nhân tử", chapterId: "chuong-2",
        content: {theory: ["Phân tích đa thức thành nhân tử là biến đổi đa thức thành tích của các đa thức."], formulas: [], examples: [{question: "Phân tích x²-x", solution: ["x(x-1)"]}]},
        quiz: [{id: "q1", question: "Phân tích 2x-4", options: [{id: "a", text: "2(x-2)"}, {id: "b", text: "2x"}, {id: "c", text: "2(x+2)"}, {id: "d", text: "x-2"}], correctOptionId: "a", explanation: "Đặt nhân tử chung"}]
      },
      {
        id: "luyen-tap-c2-2", title: "Luyện tập chung (trang 45)", chapterId: "chuong-2", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-tap-cuoi-c2", title: "Bài tập cuối chương II", chapterId: "chuong-2", type: "chapter-test",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      }
    ]
  },
  {
    id: "chuong-3",
    title: "Chương III: Tứ giác",
    shortTitle: "Tứ giác",
    icon: "Square",
    color: "text-green-500",
    lessons: [
      {
        id: "bai-10", title: "Bài 10: Tứ giác", chapterId: "chuong-3",
        content: {theory: ["Tứ giác là hình gồm 4 đoạn thẳng khép kín.", "Tổng các góc của một tứ giác bằng 360 độ."], formulas: ["A+B+C+D = 360°"], examples: [{question: "Tính góc thứ tư", solution: ["360 - tổng 3 góc kia"]}]},
        quiz: [{id: "q1", question: "Tổng các góc trong tứ giác là?", options: [{id: "a", text: "360°"}, {id: "b", text: "180°"}, {id: "c", text: "270°"}, {id: "d", text: "540°"}], correctOptionId: "a", explanation: "Lý thuyết cơ bản"}]
      },
      {
        id: "bai-11", title: "Bài 11: Hình thang cân", chapterId: "chuong-3",
        content: {theory: ["Hình thang cân là hình thang có hai góc kề một đáy bằng nhau."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Hình thang cân có:", options: [{id: "a", text: "2 đường chéo bằng nhau"}, {id: "b", text: "2 đường chéo vuông góc"}, {id: "c", text: "2 cạnh bên song song"}, {id: "d", text: "4 cạnh bằng nhau"}], correctOptionId: "a", explanation: "Tính chất"}]
      },
      {
        id: "luyen-tap-c3-1", title: "Luyện tập chung (trang 56)", chapterId: "chuong-3", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-12", title: "Bài 12: Hình bình hành", chapterId: "chuong-3",
        content: {theory: ["Hình bình hành là tứ giác có các cạnh đối song song."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Hình bình hành có:", options: [{id: "a", text: "Các cạnh đối bằng nhau"}, {id: "b", text: "Các góc kề bằng nhau"}, {id: "c", text: "Các đường chéo vuông góc"}, {id: "d", text: "4 trục đối xứng"}], correctOptionId: "a", explanation: "Tính chất"}]
      },
      {
        id: "luyen-tap-c3-2", title: "Luyện tập chung (trang 62)", chapterId: "chuong-3", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-13", title: "Bài 13: Hình chữ nhật", chapterId: "chuong-3",
        content: {theory: ["Hình chữ nhật là tứ giác có 4 góc vuông."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Hình chữ nhật có bao nhiêu góc vuông?", options: [{id: "a", text: "4"}, {id: "b", text: "2"}, {id: "c", text: "3"}, {id: "d", text: "1"}], correctOptionId: "a", explanation: "Định nghĩa"}]
      },
      {
        id: "bai-14", title: "Bài 14: Hình thoi và hình vuông", chapterId: "chuong-3",
        content: {theory: ["Hình thoi có 4 cạnh bằng nhau. Hình vuông là hình chữ nhật có 4 cạnh bằng nhau."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Hình vuông là?", options: [{id: "a", text: "Hình thoi có 1 góc vuông"}, {id: "b", text: "Hình chữ nhật"}, {id: "c", text: "Hình bình hành"}, {id: "d", text: "Hình thang"}], correctOptionId: "a", explanation: "Tính chất"}]
      },
      {
        id: "luyen-tap-c3-3", title: "Luyện tập chung (trang 73)", chapterId: "chuong-3", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-tap-cuoi-c3", title: "Bài tập cuối chương III", chapterId: "chuong-3", type: "chapter-test",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      }
    ]
  },
  {
    id: "chuong-4",
    title: "Chương IV: Tam giác",
    shortTitle: "Tam giác",
    icon: "Triangle",
    color: "text-orange-500",
    lessons: [
      {
        id: "bai-15", title: "Bài 15: Định lí Thalès trong tam giác", chapterId: "chuong-4",
        content: {
          theory: ["Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó chia hai cạnh đó thành những đoạn thẳng tương ứng tỉ lệ.", "Định lí đảo: Nếu một đường thẳng cắt hai cạnh của một tam giác và chia hai cạnh đó thành những đoạn thẳng tương ứng tỉ lệ thì đường thẳng đó song song với cạnh thứ ba."],
          formulas: ["DE // BC ⟹ AD/DB = AE/EC", "AD/DB = AE/EC ⟹ DE // BC"],
          examples: [{question: "Ví dụ", solution: ["giải"]}]
        },
        quiz: [{id: "q1", question: "Định lí Thalès liên quan đến?", options: [{id: "a", text: "Đoạn thẳng tỉ lệ"}, {id: "b", text: "Góc vuông"}, {id: "c", text: "Diện tích"}, {id: "d", text: "Chu vi"}], correctOptionId: "a", explanation: "Định lí về sự tỉ lệ"}]
      },
      {
        id: "bai-16", title: "Bài 16: Đường trung bình của tam giác", chapterId: "chuong-4",
        content: {theory: ["Đường trung bình song song cạnh thứ 3 và bằng nửa cạnh ấy."], formulas: ["MN // BC và MN = 1/2 BC"], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Độ dài đường trung bình?", options: [{id: "a", text: "Bằng nửa cạnh đáy"}, {id: "b", text: "Bằng cạnh đáy"}, {id: "c", text: "Gấp đôi cạnh đáy"}, {id: "d", text: "Bằng 1/3 cạnh đáy"}], correctOptionId: "a", explanation: "Tính chất"}]
      },
      {
        id: "bai-17", title: "Bài 17: Tính chất đường phân giác của tam giác", chapterId: "chuong-4",
        content: {theory: ["Chia cạnh đối diện thành các đoạn tỉ lệ với hai cạnh kề."], formulas: ["BD/CD = AB/AC"], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Đường phân giác chia cạnh đối diện thế nào?", options: [{id: "a", text: "Tỉ lệ với 2 cạnh kề"}, {id: "b", text: "Bằng nhau"}, {id: "c", text: "Vuông góc"}, {id: "d", text: "Tỉ lệ 1:2"}], correctOptionId: "a", explanation: "Tính chất"}]
      },
      {
        id: "luyen-tap-c4", title: "Luyện tập chung (trang 87)", chapterId: "chuong-4", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-tap-cuoi-c4", title: "Bài tập cuối chương IV", chapterId: "chuong-4", type: "chapter-test",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      }
    ]
  },
  {
    id: "chuong-5",
    title: "Chương V: Thống kê",
    shortTitle: "Thống kê",
    icon: "BarChart2",
    color: "text-cyan-500",
    lessons: [
      {
        id: "bai-18", title: "Bài 18: Thu thập và phân loại dữ liệu", chapterId: "chuong-5",
        content: {theory: ["Phân loại dữ liệu thành định tính và định lượng."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Có mấy loại dữ liệu chính?", options: [{id: "a", text: "2"}, {id: "b", text: "3"}, {id: "c", text: "4"}, {id: "d", text: "5"}], correctOptionId: "a", explanation: "Định tính và định lượng"}]
      },
      {
        id: "bai-19", title: "Bài 19: Biểu diễn dữ liệu bằng bảng, biểu đồ", chapterId: "chuong-5",
        content: {theory: ["Có biểu đồ cột, hình quạt tròn, đoạn thẳng."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Biểu đồ nào thể hiện tỉ lệ phần trăm tốt nhất?", options: [{id: "a", text: "Quạt tròn"}, {id: "b", text: "Cột"}, {id: "c", text: "Đoạn thẳng"}, {id: "d", text: "Phân tán"}], correctOptionId: "a", explanation: "Hình quạt tròn"}]
      },
      {
        id: "bai-20", title: "Bài 20: Phân tích số liệu thống kê dựa vào biểu đồ", chapterId: "chuong-5",
        content: {theory: ["Đọc dữ liệu từ biểu đồ để rút ra kết luận."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Đọc biểu đồ giúp ta làm gì?", options: [{id: "a", text: "Phân tích số liệu"}, {id: "b", text: "Vẽ đẹp hơn"}, {id: "c", text: "Tính nhẩm"}, {id: "d", text: "Giải phương trình"}], correctOptionId: "a", explanation: "Phân tích"}]
      },
      {
        id: "luyen-tap-c5", title: "Luyện tập chung (trang 106)", chapterId: "chuong-5", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-tap-cuoi-c5", title: "Bài tập cuối chương V", chapterId: "chuong-5", type: "chapter-test",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      }
    ]
  },
  {
    id: "chuong-6",
    title: "Chương VI: Phân thức đại số",
    shortTitle: "Phân thức",
    icon: "Divide",
    color: "text-red-500",
    lessons: [
      {
        id: "bai-21", title: "Bài 21: Phân thức đại số", chapterId: "chuong-6",
        content: {theory: ["Phân thức đại số có dạng A/B (B ≠ 0)."], formulas: ["A/B"], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Điều kiện xác định của phân thức A/B?", options: [{id: "a", text: "B ≠ 0"}, {id: "b", text: "A ≠ 0"}, {id: "c", text: "B = 0"}, {id: "d", text: "A = B"}], correctOptionId: "a", explanation: "Mẫu số phải khác 0"}]
      },
      {
        id: "bai-22", title: "Bài 22: Tính chất cơ bản của phân thức đại số", chapterId: "chuong-6",
        content: {theory: ["A/B = (AM)/(BM)"], formulas: ["A/B = (AM)/(BM)"], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Nếu nhân cả tử và mẫu với M khác 0 ta được:", options: [{id: "a", text: "Phân thức bằng nó"}, {id: "b", text: "Phân thức mới"}, {id: "c", text: "0"}, {id: "d", text: "1"}], correctOptionId: "a", explanation: "Tính chất cơ bản"}]
      },
      {
        id: "luyen-tap-c6-1", title: "Luyện tập chung (trang 13)", chapterId: "chuong-6", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-23", title: "Bài 23: Phép cộng và phép trừ phân thức đại số", chapterId: "chuong-6",
        content: {theory: ["Quy đồng mẫu thức rồi cộng trừ tử thức."], formulas: ["A/M + B/M = (A+B)/M"], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "A/M + B/M = ?", options: [{id: "a", text: "(A+B)/M"}, {id: "b", text: "(A+B)/2M"}, {id: "c", text: "AB/M"}, {id: "d", text: "A/B"}], correctOptionId: "a", explanation: "Cùng mẫu số"}]
      },
      {
        id: "bai-24", title: "Bài 24: Phép nhân và phép chia phân thức đại số", chapterId: "chuong-6",
        content: {theory: ["Nhân tử với tử, mẫu với mẫu."], formulas: ["A/B * C/D = AC/BD"], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "A/B * C/D = ?", options: [{id: "a", text: "AC/BD"}, {id: "b", text: "AD/BC"}, {id: "c", text: "(A+C)/(B+D)"}, {id: "d", text: "1"}], correctOptionId: "a", explanation: "Quy tắc nhân"}]
      },
      {
        id: "luyen-tap-c6-2", title: "Luyện tập chung (trang 23)", chapterId: "chuong-6", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-tap-cuoi-c6", title: "Bài tập cuối chương VI", chapterId: "chuong-6", type: "chapter-test",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      }
    ]
  },
  {
    id: "chuong-7",
    title: "Chương VII: Phương trình và hàm số",
    shortTitle: "PT & Hàm số",
    icon: "TrendingUp",
    color: "text-indigo-500",
    lessons: [
      {
        id: "bai-25",
        title: "Bài 25: Phương trình bậc nhất một ẩn",
        chapterId: "chuong-7",
        content: {
          theory: ["Phương trình bậc nhất một ẩn có dạng ax + b = 0, với a ≠ 0.", "Quy tắc chuyển vế: chuyển hạng tử từ vế này sang vế kia phải đổi dấu.", "Quy tắc nhân: nhân hoặc chia cả hai vế cho cùng một số khác 0."],
          formulas: ["ax + b = 0 (a ≠ 0) ⟺ x = -b/a"],
          examples: [
            {question: "Giải PT: 2x - 4 = 0", solution: ["2x = 4", "x = 2"]},
            {question: "Giải PT: 3x + 6 = 0", solution: ["3x = -6", "x = -2"]},
            {question: "Giải PT: -x + 5 = 0", solution: ["-x = -5", "x = 5"]}
          ]
        },
        quiz: [
          {id: "q1", question: "PT nào là PT bậc nhất 1 ẩn?", options: [{id: "a", text: "2x-1=0"}, {id: "b", text: "x²-1=0"}, {id: "c", text: "0x+2=0"}, {id: "d", text: "1/x=0"}], correctOptionId: "a", explanation: "Có dạng ax+b=0 với a≠0"},
          {id: "q2", question: "Nghiệm của 3x - 9 = 0 là:", options: [{id: "a", text: "3"}, {id: "b", text: "-3"}, {id: "c", text: "1/3"}, {id: "d", text: "9"}], correctOptionId: "a", explanation: "3x=9 => x=3"},
          {id: "q3", question: "Nghiệm của 2x + 1 = 5 là:", options: [{id: "a", text: "2"}, {id: "b", text: "3"}, {id: "c", text: "4"}, {id: "d", text: "-2"}], correctOptionId: "a", explanation: "2x=4 => x=2"},
          {id: "q4", question: "Quy tắc chuyển vế thì phải:", options: [{id: "a", text: "Đổi dấu"}, {id: "b", text: "Giữ nguyên dấu"}, {id: "c", text: "Nhân -1"}, {id: "d", text: "Chia 2"}], correctOptionId: "a", explanation: "Chuyển vế đổi dấu"},
          {id: "q5", question: "Nghiệm của -x + 2 = 0 là:", options: [{id: "a", text: "2"}, {id: "b", text: "-2"}, {id: "c", text: "0"}, {id: "d", text: "1/2"}], correctOptionId: "a", explanation: "-x=-2 => x=2"},
          {id: "q6", question: "Nghiệm của 5x = 0 là:", options: [{id: "a", text: "0"}, {id: "b", text: "5"}, {id: "c", text: "-5"}, {id: "d", text: "1/5"}], correctOptionId: "a", explanation: "x=0"}
        ]
      },
      {
        id: "bai-26", title: "Bài 26: Giải bài toán bằng cách lập phương trình", chapterId: "chuong-7",
        content: {theory: ["B1: Lập PT. B2: Giải PT. B3: Kết luận."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Bước 1 của giải toán bằng cách lập PT là:", options: [{id: "a", text: "Lập phương trình"}, {id: "b", text: "Giải"}, {id: "c", text: "Kết luận"}, {id: "d", text: "Vẽ hình"}], correctOptionId: "a", explanation: "Bước 1"}]
      },
      {
        id: "luyen-tap-c7-1", title: "Luyện tập chung (trang 37)", chapterId: "chuong-7", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-27", title: "Bài 27: Khái niệm hàm số và đồ thị của hàm số", chapterId: "chuong-7",
        content: {theory: ["y là hàm số của x nếu mỗi x cho 1 giá trị y."], formulas: ["y = f(x)"], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Đại lượng y phụ thuộc x, mỗi x cho bao nhiêu y thì gọi là hàm số?", options: [{id: "a", text: "Chỉ 1"}, {id: "b", text: "Nhiều"}, {id: "c", text: "0"}, {id: "d", text: "2"}], correctOptionId: "a", explanation: "Định nghĩa"}]
      },
      {
        id: "bai-28", title: "Bài 28: Hàm số bậc nhất và đồ thị của hàm số bậc nhất", chapterId: "chuong-7", hasGraph: true,
        content: {theory: ["Hàm số bậc nhất có dạng y = ax + b (a ≠ 0). Đồ thị là một đường thẳng."], formulas: ["y = ax + b"], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Đồ thị hàm số y = ax + b là hình gì?", options: [{id: "a", text: "Đường thẳng"}, {id: "b", text: "Đường cong"}, {id: "c", text: "Đoạn thẳng"}, {id: "d", text: "Điểm"}], correctOptionId: "a", explanation: "Đường thẳng"}]
      },
      {
        id: "bai-29", title: "Bài 29: Hệ số góc của đường thẳng", chapterId: "chuong-7", hasGraph: true,
        content: {theory: ["Hệ số góc của y = ax + b là a."], formulas: ["Hệ số góc = a"], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Hệ số góc của y = 2x - 1 là?", options: [{id: "a", text: "2"}, {id: "b", text: "-1"}, {id: "c", text: "1"}, {id: "d", text: "0"}], correctOptionId: "a", explanation: "Hệ số a"}]
      },
      {
        id: "luyen-tap-c7-2", title: "Luyện tập chung (trang 55)", chapterId: "chuong-7", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-tap-cuoi-c7", title: "Bài tập cuối chương VII", chapterId: "chuong-7", type: "chapter-test",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      }
    ]
  },
  {
    id: "chuong-8",
    title: "Chương VIII: Xác suất",
    shortTitle: "Xác suất",
    icon: "Shuffle",
    color: "text-pink-500",
    lessons: [
      {
        id: "bai-30", title: "Bài 30: Kết quả có thể và kết quả thuận lợi", chapterId: "chuong-8",
        content: {theory: ["Xác định số kết quả có thể xảy ra của phép thử."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Tung đồng xu có bao nhiêu kết quả?", options: [{id: "a", text: "2"}, {id: "b", text: "1"}, {id: "c", text: "3"}, {id: "d", text: "6"}], correctOptionId: "a", explanation: "Sấp hoặc ngửa"}]
      },
      {
        id: "bai-31",
        title: "Bài 31: Cách tính xác suất của biến cố bằng tỉ số",
        chapterId: "chuong-8",
        content: {
          theory: ["Xác suất của biến cố A là tỉ số giữa số kết quả thuận lợi cho A và tổng số kết quả có thể xảy ra.", "Xác suất P(A) luôn thỏa mãn: 0 ≤ P(A) ≤ 1.", "Biến cố chắc chắn: P(Ω) = 1. Biến cố không thể: P(∅) = 0."],
          formulas: ["P(A) = số kết quả thuận lợi / tổng số kết quả có thể", "0 ≤ P(A) ≤ 1"],
          examples: [{question: "Tung đồng xu 1 lần, P(mặt sấp) = ?", solution: ["Có 1 kết quả thuận lợi", "Có 2 kết quả có thể", "P = 1/2"]}]
        },
        quiz: [
          {id: "q1", question: "Xác suất luôn nằm trong khoảng nào?", options: [{id: "a", text: "0 đến 1"}, {id: "b", text: "-1 đến 1"}, {id: "c", text: "0 đến 100"}, {id: "d", text: "1 đến vô cùng"}], correctOptionId: "a", explanation: "0 ≤ P(A) ≤ 1"},
          {id: "q2", question: "Biến cố chắc chắn có xác suất bằng:", options: [{id: "a", text: "1"}, {id: "b", text: "0"}, {id: "c", text: "0.5"}, {id: "d", text: "100"}], correctOptionId: "a", explanation: "Chắc chắn xảy ra"},
          {id: "q3", question: "Tung xúc xắc, P(mặt 6 chấm) = ?", options: [{id: "a", text: "1/6"}, {id: "b", text: "1/2"}, {id: "c", text: "1/3"}, {id: "d", text: "0"}], correctOptionId: "a", explanation: "1 mặt thuận lợi / 6 mặt có thể"},
          {id: "q4", question: "P(mặt chẵn) khi tung xúc xắc:", options: [{id: "a", text: "1/2"}, {id: "b", text: "1/6"}, {id: "c", text: "1/3"}, {id: "d", text: "1/4"}], correctOptionId: "a", explanation: "3 mặt chẵn (2,4,6) / 6"},
          {id: "q5", question: "Rút 1 lá bài tây từ bộ 52 lá, P(lá Át) = ?", options: [{id: "a", text: "1/13"}, {id: "b", text: "1/52"}, {id: "c", text: "4/13"}, {id: "d", text: "1/4"}], correctOptionId: "a", explanation: "4 lá Át / 52 lá = 1/13"},
          {id: "q6", question: "Biến cố không thể có xác suất bằng:", options: [{id: "a", text: "0"}, {id: "b", text: "1"}, {id: "c", text: "-1"}, {id: "d", text: "0.5"}], correctOptionId: "a", explanation: "Không bao giờ xảy ra"}
        ]
      },
      {
        id: "bai-32", title: "Bài 32: Mối liên hệ giữa xác suất thực nghiệm và xác suất", chapterId: "chuong-8",
        content: {theory: ["Xác suất thực nghiệm tiến dần về xác suất lý thuyết khi thử nhiều lần."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Khi số lần thử rất lớn thì?", options: [{id: "a", text: "XS thực nghiệm gần bằng XS lý thuyết"}, {id: "b", text: "Bằng 0"}, {id: "c", text: "Bằng 1"}, {id: "d", text: "Không liên quan"}], correctOptionId: "a", explanation: "Luật số lớn"}]
      },
      {
        id: "luyen-tap-c8", title: "Luyện tập chung (trang 74)", chapterId: "chuong-8", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-tap-cuoi-c8", title: "Bài tập cuối chương VIII", chapterId: "chuong-8", type: "chapter-test",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      }
    ]
  },
  {
    id: "chuong-9",
    title: "Chương IX: Tam giác đồng dạng",
    shortTitle: "TG đồng dạng",
    icon: "Scaling",
    color: "text-teal-500",
    lessons: [
      {
        id: "bai-33", title: "Bài 33: Hai tam giác đồng dạng", chapterId: "chuong-9",
        content: {theory: ["Tỉ số các cạnh tương ứng bằng nhau, các góc tương ứng bằng nhau."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Hai tam giác đồng dạng thì:", options: [{id: "a", text: "Góc tương ứng bằng nhau"}, {id: "b", text: "Chu vi bằng nhau"}, {id: "c", text: "Diện tích bằng nhau"}, {id: "d", text: "Cạnh bằng nhau"}], correctOptionId: "a", explanation: "Tính chất"}]
      },
      {
        id: "bai-34", title: "Bài 34: Ba trường hợp đồng dạng của hai tam giác", chapterId: "chuong-9",
        content: {theory: ["c-c-c, c-g-c, g-g."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Trường hợp nào KHÔNG phải đồng dạng?", options: [{id: "a", text: "g-c-c"}, {id: "b", text: "c-c-c"}, {id: "c", text: "c-g-c"}, {id: "d", text: "g-g"}], correctOptionId: "a", explanation: "Các TH: ccc, cgc, gg"}]
      },
      {
        id: "luyen-tap-c9-1", title: "Luyện tập chung (trang 91)", chapterId: "chuong-9", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-35",
        title: "Bài 35: Định lí Pythagore và ứng dụng",
        chapterId: "chuong-9",
        content: {
          theory: ["Trong tam giác vuông, bình phương của cạnh huyền bằng tổng bình phương hai cạnh góc vuông.", "Định lí đảo: Nếu bình phương của một cạnh bằng tổng bình phương hai cạnh còn lại thì tam giác đó là tam giác vuông."],
          formulas: ["a² + b² = c² (c là cạnh huyền)", "Nếu a² + b² = c² thì tam giác ABC vuông tại C"],
          examples: [{question: "Tam giác có cạnh 3,4,5 có vuông không?", solution: ["3² + 4² = 9 + 16 = 25 = 5²", "Vuông"]}]
        },
        quiz: [
          {id: "q1", question: "Tam giác có cạnh 6,8,10 là tam giác gì?", options: [{id: "a", text: "Vuông"}, {id: "b", text: "Nhọn"}, {id: "c", text: "Tù"}, {id: "d", text: "Đều"}], correctOptionId: "a", explanation: "6²+8²=100=10²"},
          {id: "q2", question: "Trong tam giác vuông ABC vuông tại A, biểu thức nào đúng?", options: [{id: "a", text: "BC² = AB² + AC²"}, {id: "b", text: "AB² = BC² + AC²"}, {id: "c", text: "AC² = AB² + BC²"}, {id: "d", text: "BC = AB + AC"}], correctOptionId: "a", explanation: "Cạnh huyền BC"},
          {id: "q3", question: "Bộ 3 số nào là độ dài 3 cạnh tam giác vuông?", options: [{id: "a", text: "5, 12, 13"}, {id: "b", text: "4, 5, 6"}, {id: "c", text: "1, 2, 3"}, {id: "d", text: "7, 8, 9"}], correctOptionId: "a", explanation: "5²+12²=169=13²"},
          {id: "q4", question: "Cạnh huyền của tam giác vuông có 2 cạnh góc vuông là 3 và 4?", options: [{id: "a", text: "5"}, {id: "b", text: "7"}, {id: "c", text: "6"}, {id: "d", text: "25"}], correctOptionId: "a", explanation: "c² = 3²+4²=25 => c=5"},
          {id: "q5", question: "Pythagore áp dụng cho tam giác nào?", options: [{id: "a", text: "Tam giác vuông"}, {id: "b", text: "Mọi tam giác"}, {id: "c", text: "Tam giác đều"}, {id: "d", text: "Tam giác cân"}], correctOptionId: "a", explanation: "Định lí Pythagore"},
          {id: "q6", question: "Nếu a²+b²<c² thì tam giác đó là:", options: [{id: "a", text: "Tam giác tù"}, {id: "b", text: "Tam giác vuông"}, {id: "c", text: "Tam giác nhọn"}, {id: "d", text: "Tam giác vuông cân"}], correctOptionId: "a", explanation: "Hệ quả"}
        ]
      },
      {
        id: "bai-36", title: "Bài 36: Các trường hợp đồng dạng của hai tam giác vuông", chapterId: "chuong-9",
        content: {theory: ["Cạnh huyền - cạnh góc vuông."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "TH đồng dạng đặc biệt của tam giác vuông:", options: [{id: "a", text: "Cạnh huyền - cạnh góc vuông"}, {id: "b", text: "2 cạnh huyền"}, {id: "c", text: "2 góc vuông"}, {id: "d", text: "Cạnh huyền - góc nhọn"}], correctOptionId: "a", explanation: "Lý thuyết"}]
      },
      {
        id: "bai-37", title: "Bài 37: Hình đồng dạng", chapterId: "chuong-9",
        content: {theory: ["Các hình có cùng hình dạng nhưng khác kích thước."], formulas: [], examples: [{question: "Ví dụ", solution: ["giải"]}]},
        quiz: [{id: "q1", question: "Hình đồng dạng có đặc điểm gì?", options: [{id: "a", text: "Cùng hình dạng"}, {id: "b", text: "Cùng kích thước"}, {id: "c", text: "Bằng nhau"}, {id: "d", text: "Cùng diện tích"}], correctOptionId: "a", explanation: "Cùng hình dạng"}]
      },
      {
        id: "luyen-tap-c9-2", title: "Luyện tập chung (trang 108)", chapterId: "chuong-9", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-tap-cuoi-c9", title: "Bài tập cuối chương IX", chapterId: "chuong-9", type: "chapter-test",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      }
    ]
  },
  {
    id: "chuong-10",
    title: "Chương X: Hình khối",
    shortTitle: "Hình khối",
    icon: "Box",
    color: "text-amber-500",
    lessons: [
      {
        id: "bai-38",
        title: "Bài 38: Hình chóp tam giác đều",
        chapterId: "chuong-10",
        content: {
          theory: ["Hình chóp tam giác đều có đáy là tam giác đều, các mặt bên là tam giác cân bằng nhau.", "Đường cao của hình chóp đi qua tâm của đường tròn ngoại tiếp đáy."],
          formulas: ["S_xung quanh = (1/2) × chu vi đáy × apothem", "V = (1/3) × S_đáy × h"],
          examples: [{question: "Ví dụ", solution: ["giải"]}]
        },
        quiz: [
          {id: "q1", question: "Đáy của hình chóp tam giác đều là hình gì?", options: [{id: "a", text: "Tam giác đều"}, {id: "b", text: "Tam giác vuông"}, {id: "c", text: "Hình chữ nhật"}, {id: "d", text: "Hình vuông"}], correctOptionId: "a", explanation: "Đáy là tam giác đều"},
          {id: "q2", question: "Công thức tính thể tích hình chóp?", options: [{id: "a", text: "V = (1/3) * S * h"}, {id: "b", text: "V = S * h"}, {id: "c", text: "V = (1/2) * S * h"}, {id: "d", text: "V = 3 * S * h"}], correctOptionId: "a", explanation: "Thể tích khối chóp"},
          {id: "q3", question: "Mặt bên của hình chóp tam giác đều là hình gì?", options: [{id: "a", text: "Tam giác cân"}, {id: "b", text: "Tam giác đều"}, {id: "c", text: "Hình vuông"}, {id: "d", text: "Hình thoi"}], correctOptionId: "a", explanation: "Tam giác cân"},
          {id: "q4", question: "S_xung quanh của hình chóp đều bằng:", options: [{id: "a", text: "nửa chu vi đáy * trung đoạn"}, {id: "b", text: "chu vi đáy * đường cao"}, {id: "c", text: "S_đáy * h"}, {id: "d", text: "tổng diện tích đáy"}], correctOptionId: "a", explanation: "Công thức Sxq"}
        ]
      },
      {
        id: "bai-39",
        title: "Bài 39: Hình chóp tứ giác đều",
        chapterId: "chuong-10",
        content: {
          theory: ["Hình chóp tứ giác đều có đáy là hình vuông, các mặt bên là tam giác cân bằng nhau.", "Hình chiếu của đỉnh trùng với giao điểm 2 đường chéo đáy."],
          formulas: ["S_đáy = a²", "S_xung quanh = 4 × (1/2) × a × l = 2al", "V = (1/3) × a² × h"],
          examples: [{question: "Ví dụ", solution: ["giải"]}]
        },
        quiz: [
          {id: "q1", question: "Đáy của hình chóp tứ giác đều là:", options: [{id: "a", text: "Hình vuông"}, {id: "b", text: "Hình chữ nhật"}, {id: "c", text: "Hình thoi"}, {id: "d", text: "Hình thang"}], correctOptionId: "a", explanation: "Đáy là hình vuông"},
          {id: "q2", question: "Tính V khi a=3, h=4:", options: [{id: "a", text: "12"}, {id: "b", text: "36"}, {id: "c", text: "18"}, {id: "d", text: "9"}], correctOptionId: "a", explanation: "V = 1/3 * 3² * 4 = 12"},
          {id: "q3", question: "Số mặt của hình chóp tứ giác đều?", options: [{id: "a", text: "5"}, {id: "b", text: "4"}, {id: "c", text: "6"}, {id: "d", text: "8"}], correctOptionId: "a", explanation: "1 đáy + 4 mặt bên = 5"},
          {id: "q4", question: "Công thức S đáy là?", options: [{id: "a", text: "a²"}, {id: "b", text: "4a"}, {id: "c", text: "2a"}, {id: "d", text: "a³"}], correctOptionId: "a", explanation: "Đáy là hình vuông cạnh a"}
        ]
      },
      {
        id: "luyen-tap-c10", title: "Luyện tập chung (trang 121)", chapterId: "chuong-10", type: "practice",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      },
      {
        id: "bai-tap-cuoi-c10", title: "Bài tập cuối chương X", chapterId: "chuong-10", type: "chapter-test",
        content: {theory: [], formulas: [], examples: []}, quiz: []
      }
    ]
  },
  {
    id: "thuc-hanh",
    title: "Thực hành",
    shortTitle: "Thực hành",
    icon: "FlaskConical",
    color: "text-emerald-500",
    lessons: [
      {
        id: "th-lai-kep", title: "Công thức lãi kép", chapterId: "thuc-hanh",
        content: {theory: ["Thực hành tính lãi kép."], formulas: ["A = P(1+r)^n"], examples: [{question: "Ví dụ", solution: ["giải"]}]}, quiz: []
      },
      {
        id: "th-geogebra", title: "Thực hành với GeoGebra", chapterId: "thuc-hanh",
        content: {theory: ["Sử dụng phần mềm vẽ hình."], formulas: [], examples: []}, quiz: []
      },
      {
        id: "th-xac-suat", title: "Mô phỏng xác suất bằng Excel", chapterId: "thuc-hanh",
        content: {theory: ["Dùng hàm RANDBETWEEN."], formulas: [], examples: []}, quiz: []
      }
    ]
  }
];

export const getAllLessons = () => {
  return curriculum.flatMap(c => c.lessons);
};
