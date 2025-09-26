import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MdInventory, MdCheckCircle, MdOutlineDrafts, MdBlock } from "react-icons/md";
import { useEffect, useState } from "react";

const DashboardCards = ({ products, isLoading }) => {
  const total = products.length;
  const published = products.filter((p) => p.status === "Published").length;
  const draft = products.filter((p) => p.status === "Draft").length;
  const inactive = products.filter((p) => p.status === "Inactive").length;

  const stats = [
    { title: "Total Products", value: total, icon: <MdInventory className="w-6 h-6 text-blue-500" />, percentage: 100 },
    { title: "Published", value: published, icon: <MdCheckCircle className="w-6 h-6 text-green-500" />, percentage: total ? (published / total) * 100 : 0 },
    { title: "Draft", value: draft, icon: <MdOutlineDrafts className="w-6 h-6 text-yellow-500" />, percentage: total ? (draft / total) * 100 : 0 },
    { title: "Inactive", value: inactive, icon: <MdBlock className="w-6 h-6 text-red-500" />, percentage: total ? (inactive / total) * 100 : 0 },
  ];

  const [animatedPercentages, setAnimatedPercentages] = useState(
    stats.map(() => 0)
  );

  useEffect(() => {
    if (!isLoading) {
      const intervals = stats.map((stat, idx) =>
        setInterval(() => {
          setAnimatedPercentages((prev) => {
            const newPercentages = [...prev];
            if (newPercentages[idx] < stat.percentage) {
              newPercentages[idx] += 2; // سرعة animation
              if (newPercentages[idx] > stat.percentage) newPercentages[idx] = stat.percentage;
            }
            return newPercentages;
          });
        }, 15)
      );

      return () => intervals.forEach(clearInterval);
    }
  }, [isLoading, stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse z-10"></div>
          )}
          <CardHeader className="flex items-center gap-2">
            {stat.icon}
            <CardTitle>{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{isLoading ? "..." : stat.value}</p>
            {!isLoading && (
              <>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${animatedPercentages[idx]}%`,
                      backgroundColor: stat.icon.props.className.includes("text-blue") ? "#3b82f6" :
                                      stat.icon.props.className.includes("text-green") ? "#10b981" :
                                      stat.icon.props.className.includes("text-yellow") ? "#facc15" :
                                      "#ef4444"
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">{animatedPercentages[idx].toFixed(1)}%</p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
