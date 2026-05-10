import { useState } from "react";
import { evaluate } from "mathjs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function GraphPlotter() {
  const [functions, setFunctions] = useState<string[]>(["2*x + 3", "x^2 - 4"]);
  const [newFunc, setNewFunc] = useState("");
  const [error, setError] = useState("");

  const addFunction = () => {
    if (!newFunc.trim()) return;
    try {
      // Test evaluate to see if it's valid
      evaluate(newFunc, { x: 1 });
      setFunctions(prev => [...prev, newFunc]);
      setNewFunc("");
      setError("");
    } catch (e) {
      setError("Hàm số không hợp lệ. Vui lòng kiểm tra lại. Ví dụ: 2*x + 3, x^2 - 4, sin(x)");
    }
  };

  const removeFunction = (idx: number) => {
    setFunctions(prev => prev.filter((_, i) => i !== idx));
  };

  const generateData = () => {
    const data = [];
    for (let x = -10; x <= 10; x += 0.5) {
      const point: any = { x };
      functions.forEach((func, i) => {
        try {
          point[`f${i}`] = evaluate(func, { x });
        } catch {
          point[`f${i}`] = null;
        }
      });
      data.push(point);
    }
    return data;
  };

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vẽ đồ thị hàm số</CardTitle>
          <CardDescription>Nhập hàm số theo biến x (vd: 2*x + 3, x^2, x/2)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Nhập hàm số y = f(x)..."
                value={newFunc}
                onChange={e => setNewFunc(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addFunction()}
              />
            </div>
            <Button onClick={addFunction}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm
            </Button>
          </div>
          {error && <p className="text-sm text-destructive mb-4">{error}</p>}
          
          <div className="flex flex-wrap gap-2 mb-6">
            {functions.map((f, i) => (
              <Badge key={i} variant="secondary" className="px-3 py-1 flex items-center gap-2 text-sm" style={{ borderLeft: `4px solid ${colors[i % colors.length]}` }}>
                y = {f}
                <button onClick={() => removeFunction(i)} className="text-muted-foreground hover:text-foreground">
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {functions.length === 0 && (
              <p className="text-sm text-muted-foreground italic">Chưa có hàm số nào. Hãy thêm một hàm số để vẽ đồ thị.</p>
            )}
          </div>

          <div className="h-[400px] w-full border rounded-lg p-4 bg-card">
            {functions.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateData()} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="x" type="number" domain={[-10, 10]} ticks={[-10, -5, 0, 5, 10]} />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip 
                    formatter={(value: number, name: string) => [value.toFixed(2), `y = ${functions[parseInt(name.replace('f', ''))]}`]}
                    labelFormatter={(label) => `x = ${label}`}
                  />
                  <ReferenceLine x={0} stroke="hsl(var(--foreground))" strokeWidth={2} opacity={0.3} />
                  <ReferenceLine y={0} stroke="hsl(var(--foreground))" strokeWidth={2} opacity={0.3} />
                  {functions.map((_, i) => (
                    <Line 
                      key={i} 
                      type="monotone" 
                      dataKey={`f${i}`} 
                      stroke={colors[i % colors.length]} 
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                Đồ thị trống
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
