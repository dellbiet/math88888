import { AppLayout } from "@/components/layout/AppLayout";
import { GraphPlotter } from "@/components/GraphPlotter";

export default function Graph() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b">
          <h1 className="text-3xl font-bold tracking-tight">Đồ thị hàm số</h1>
          <p className="text-muted-foreground mt-2">
            Nhập hàm số y = f(x) để vẽ đồ thị trên mặt phẳng tọa độ.
          </p>
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <GraphPlotter />
        </div>
      </div>
    </AppLayout>
  );
}
