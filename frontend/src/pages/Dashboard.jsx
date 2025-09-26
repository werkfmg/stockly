import DashboardCards from "../_components/Dashboard/DashboardCards";
import {StatusPieChart} from "../_components/Dashboard/StatusPieChart";
import { useProducts } from "../../api/useProducts";
import AppHeader from "../_components/AppHaeder/Header";
import {ProductsBarChart} from "../_components/Dashboard/ProductsBarChart";
import { CategoryPieCharts } from "../_components/Dashboard/CategoryPieCharts";

export default function Dashboard() {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="p-6 space-y-6">
      <AppHeader />
      <DashboardCards products={products} isLoading={isLoading}/>
      <div className="grid grid-cols-2 gap-6">
        <ProductsBarChart products={products} />
        <StatusPieChart products={products} />
        <CategoryPieCharts products={products}/>
        
      </div>
    </div>
  );
}
