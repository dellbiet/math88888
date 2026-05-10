import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppLayout } from "@/components/layout/AppLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Calculator, Dices, LineChart, ChevronRight } from "lucide-react";

export default function ThucHanh() {
  // Lãi kép state
  const [principal, setPrincipal] = useState<number>(10000000);
  const [rate, setRate] = useState<number>(5);
  const [years, setYears] = useState<number>(5);

  const compoundInterestData = useMemo(() => {
    const data = [];
    let current = principal;
    for (let i = 0; i <= years; i++) {
      data.push({ year: i, amount: Math.round(current) });
      current = current * (1 + rate / 100);
    }
    return data;
  }, [principal, rate, years]);

  // Xác suất state
  const [flips, setFlips] = useState<number>(100);
  const [flipResults, setFlipResults] = useState<{ heads: number; tails: number }>({ heads: 0, tails: 0 });

  const handleFlip = () => {
    let heads = 0;
    let tails = 0;
    for (let i = 0; i < flips; i++) {
      if (Math.random() < 0.5) {
        heads++;
      } else {
        tails++;
      }
    }
    setFlipResults({ heads, tails });
  };

  const flipData = [
    { name: "Sấp", count: flipResults.heads },
    { name: "Ngửa", count: flipResults.tails },
  ];

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Thực hành</h1>
          <p className="text-muted-foreground">Các ứng dụng toán học trong thực tế và mô phỏng</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Lãi kép
              </CardTitle>
              <CardDescription>Tính toán sự tăng trưởng của tiền gửi tiết kiệm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Vốn ban đầu (VND)</Label>
                  <Input 
                    type="number" 
                    value={principal} 
                    onChange={(e) => setPrincipal(Number(e.target.value) || 0)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lãi suất (%/năm)</Label>
                  <Input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(Number(e.target.value) || 0)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Số năm</Label>
                  <Input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value) || 0)} 
                  />
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium">Tổng tiền sau {years} năm:</p>
                <p className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(compoundInterestData[compoundInterestData.length - 1]?.amount || 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Công thức: A = P(1 + r/100)ⁿ</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={compoundInterestData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" />
                    <YAxis 
                      tickFormatter={(value) => new Intl.NumberFormat("vi-VN", { notation: "compact", compactDisplay: "short" }).format(value)}
                    />
                    <Tooltip 
                      formatter={(value: number) => [new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value), "Tổng tiền"]}
                      labelFormatter={(label) => `Năm ${label}`}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dices className="h-5 w-5 text-primary" />
                  Mô phỏng xác suất
                </CardTitle>
                <CardDescription>Tung đồng xu để kiểm chứng xác suất thực nghiệm</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-end gap-4">
                  <div className="space-y-2 flex-1">
                    <Label>Số lần tung</Label>
                    <Input 
                      type="number" 
                      value={flips} 
                      onChange={(e) => setFlips(Number(e.target.value) || 0)} 
                    />
                  </div>
                  <Button onClick={handleFlip} className="w-32">Thực hiện</Button>
                </div>

                {flipResults.heads > 0 || flipResults.tails > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-medium">Mặt sấp</p>
                        <p className="text-xl font-bold">{flipResults.heads}</p>
                        <p className="text-xs text-muted-foreground">{Math.round(flipResults.heads / (flipResults.heads + flipResults.tails) * 100)}%</p>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-medium">Mặt ngửa</p>
                        <p className="text-xl font-bold">{flipResults.tails}</p>
                        <p className="text-xs text-muted-foreground">{Math.round(flipResults.tails / (flipResults.heads + flipResults.tails) * 100)}%</p>
                      </div>
                    </div>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={flipData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" width={50} />
                          <Tooltip cursor={{ fill: 'transparent' }} />
                          <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} label={{ position: 'right' }} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
                    Nhấn "Thực hiện" để bắt đầu mô phỏng
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Vẽ đồ thị
                </CardTitle>
                <CardDescription>Công cụ trực quan hóa hàm số</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-foreground/80">Sử dụng công cụ vẽ đồ thị để khảo sát sự biến thiên của các hàm số, tìm tọa độ giao điểm và hiểu rõ hơn về mối quan hệ giữa đại số và hình học.</p>
                <Link href="/do-thi" className="inline-block w-full">
                  <Button variant="outline" className="w-full justify-between">
                    Mở công cụ vẽ đồ thị
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
