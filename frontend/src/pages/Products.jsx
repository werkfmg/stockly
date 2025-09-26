import AppTable from '../_components/AppTable'
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import AppHeader from '../_components/AppHaeder/Header'
const Products = () => {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-50";

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
    <div className={`poppins p-5 ${bgColor} border w-full min-h-screen`}>
      <Card className="flex flex-col shadow-none p-5">
        <AppHeader />
        <AppTable />
      </Card>
    </div>
    </>
  )
}

export default Products





















