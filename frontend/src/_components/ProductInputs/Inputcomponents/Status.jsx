"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";

export default function Status({ selectedTab, setSelectedTab }) {
  return (
    <div>
      <Label className="text-slate-600">Status</Label>
      <Select value={selectedTab} onValueChange={(value) => setSelectedTab(value)}>
        <SelectTrigger className="mt-1 h-11 px-2">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Published">
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500" />
              Published
            </div>
          </SelectItem>
          <SelectItem value="Inactive">
            <div className="flex items-center gap-2">
              <IoClose className="text-red-500" />
              Inactive
            </div>
          </SelectItem>
          <SelectItem value="Draft">
            <div className="flex items-center gap-2">
              <FaInbox className="text-slate-500" />
              Draft
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
