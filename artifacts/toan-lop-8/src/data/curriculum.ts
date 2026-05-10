export type Example = {
  question: string;
  solution: string[];
};

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
  content: {
    theory: string[];
    examples: Example[];
    formulas: string[];
  };
  quiz: QuizQuestion[];
  hasGraph?: boolean;
};

export type Chapter = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export const curriculum: Chapter[] = [
  {
    id: "chuong-6",
    title: "Chương VI: Phân thức đại số",
    lessons: [
      {
        id: "bai-21",
        title: "Bài 21: Phân thức đại số",
        chapterId: "chuong-6",
        content: {
          theory: [
            "Định nghĩa: Một phân thức đại số (hay nói gọn là phân thức) là một biểu thức có dạng A/B, trong đó A, B là những đa thức và B ≠ 0.",
            "A được gọi là tử thức (hay tử), B được gọi là mẫu thức (hay mẫu).",
            "Hai phân thức bằng nhau: A/B = C/D nếu A·D = B·C",
            "Phân thức bằng 0: A/B = 0 khi và chỉ khi A = 0 và B ≠ 0."
          ],
          examples: [
            {
              question: "Hai phân thức (x-1)/(x+1) và (x²-1)/(x+1)² có bằng nhau không?",
              solution: [
                "Ta xét tích chéo: (x-1)·(x+1)² = (x-1)(x²+2x+1) = x³ + x² - x - 1",
                "Và: (x+1)·(x²-1) = (x+1)(x-1)(x+1) = (x-1)(x+1)² = x³ + x² - x - 1",
                "Vì hai tích chéo bằng nhau nên hai phân thức bằng nhau."
              ]
            }
          ],
          formulas: [
            "A/B = C/D ⟺ A·D = B·C",
            "A/B = 0 ⟺ A = 0, B ≠ 0"
          ]
        },
        quiz: [
          {
            id: "q1",
            question: "Biểu thức nào sau đây là phân thức đại số?",
            options: [
              { id: "a", text: "2x + 1" },
              { id: "b", text: "(x-1)/0" },
              { id: "c", text: "(x²-1)/(x+2)" },
              { id: "d", text: "√x / 2" }
            ],
            correctOptionId: "c"
          },
          {
            id: "q2",
            question: "Điều kiện để phân thức A/B xác định là gì?",
            options: [
              { id: "a", text: "A ≠ 0" },
              { id: "b", text: "B ≠ 0" },
              { id: "c", text: "A = B" },
              { id: "d", text: "A + B ≠ 0" }
            ],
            correctOptionId: "b"
          },
          {
            id: "q3",
            question: "Phân thức nào sau đây có giá trị bằng 0?",
            options: [
              { id: "a", text: "(x-1)/(x+1)" },
              { id: "b", text: "(x+1)/(x-1)" },
              { id: "c", text: "0/(x²+1)" },
              { id: "d", text: "x/(x²-1)" }
            ],
            correctOptionId: "c"
          }
        ]
      },
      {
        id: "bai-22",
        title: "Bài 22: Tính chất cơ bản của phân thức đại số",
        chapterId: "chuong-6",
        content: {
          theory: [
            "Nếu nhân cả tử và mẫu của một phân thức với cùng một đa thức khác đa thức 0 thì được một phân thức bằng phân thức đã cho: A/B = (A·M)/(B·M)",
            "Nếu chia cả tử và mẫu của một phân thức cho một nhân tử chung của chúng thì được một phân thức bằng phân thức đã cho: A/B = (A:N)/(B:N)",
            "Quy tắc đổi dấu: Nếu đổi dấu cả tử và mẫu của một phân thức thì được một phân thức bằng phân thức đã cho: A/B = (-A)/(-B)"
          ],
          examples: [
            {
              question: "Rút gọn phân thức: (x³-x)/(x²+x)",
              solution: [
                "Tử: x³-x = x(x²-1) = x(x-1)(x+1)",
                "Mẫu: x²+x = x(x+1)",
                "Chia cả tử và mẫu cho nhân tử chung x(x+1), ta được: x-1"
              ]
            }
          ],
          formulas: [
            "A/B = (A·M)/(B·M) (M ≠ 0)",
            "A/B = (A:N)/(B:N) (N là nhân tử chung)",
            "A/B = (-A)/(-B)"
          ]
        },
        quiz: [
          {
            id: "q1",
            question: "Phân thức (x-y)/(y-x) bằng phân thức nào sau đây?",
            options: [
              { id: "a", text: "1" },
              { id: "b", text: "-1" },
              { id: "c", text: "x-y" },
              { id: "d", text: "y-x" }
            ],
            correctOptionId: "b"
          }
        ]
      }
    ]
  },
  {
    id: "chuong-7",
    title: "Chương VII: Phương trình và hàm số",
    lessons: [
      {
        id: "bai-25",
        title: "Bài 25: Phương trình bậc nhất một ẩn",
        chapterId: "chuong-7",
        content: {
          theory: [
            "Phương trình bậc nhất một ẩn có dạng ax + b = 0, với a, b là hai số đã cho và a ≠ 0.",
            "Quy tắc chuyển vế: Khi chuyển một hạng tử từ vế này sang vế kia của một phương trình, ta phải đổi dấu hạng tử đó.",
            "Quy tắc nhân: Trong một phương trình, ta có thể nhân cả hai vế với cùng một số khác 0."
          ],
          examples: [
            {
              question: "Giải phương trình: 3x - 6 = 0",
              solution: [
                "Chuyển vế -6: 3x = 6",
                "Chia 2 vế cho 3: x = 6/3 = 2",
                "Vậy phương trình có nghiệm x = 2."
              ]
            }
          ],
          formulas: [
            "ax + b = 0 (a ≠ 0) ⟺ x = -b/a"
          ]
        },
        quiz: [
          {
            id: "q1",
            question: "Phương trình nào sau đây là phương trình bậc nhất một ẩn?",
            options: [
              { id: "a", text: "0x + 2 = 0" },
              { id: "b", text: "2x² + x = 0" },
              { id: "c", text: "-3x + 1 = 0" },
              { id: "d", text: "1/x + 2 = 0" }
            ],
            correctOptionId: "c"
          }
        ]
      },
      {
        id: "bai-28",
        title: "Bài 28: Hàm số và đồ thị",
        chapterId: "chuong-7",
        hasGraph: true,
        content: {
          theory: [
            "Nếu đại lượng y phụ thuộc vào đại lượng thay đổi x sao cho với mỗi giá trị của x ta luôn xác định được chỉ một giá trị tương ứng của y thì y được gọi là hàm số của x và x gọi là biến số.",
            "Đồ thị của hàm số y = f(x) là tập hợp tất cả các điểm biểu diễn các cặp giá trị tương ứng (x; f(x)) trên mặt phẳng tọa độ."
          ],
          examples: [
            {
              question: "Vẽ đồ thị hàm số y = 2x",
              solution: [
                "Cho x = 0 thì y = 0, ta được điểm O(0;0)",
                "Cho x = 1 thì y = 2, ta được điểm A(1;2)",
                "Đường thẳng đi qua O và A là đồ thị hàm số y = 2x"
              ]
            }
          ],
          formulas: [
            "y = f(x)"
          ]
        },
        quiz: [
          {
            id: "q1",
            question: "Điểm nào sau đây thuộc đồ thị hàm số y = -3x?",
            options: [
              { id: "a", text: "A(1; 3)" },
              { id: "b", text: "B(-1; -3)" },
              { id: "c", text: "C(2; -6)" },
              { id: "d", text: "D(0; 3)" }
            ],
            correctOptionId: "c"
          }
        ]
      }
    ]
  }
];

export const getAllLessons = () => {
  return curriculum.flatMap(c => c.lessons);
};
