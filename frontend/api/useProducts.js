import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],            
    queryFn: async () => {             
      const res = await axios.get("http://localhost:3000/products");
      return res.data;             
    },
  });
};
