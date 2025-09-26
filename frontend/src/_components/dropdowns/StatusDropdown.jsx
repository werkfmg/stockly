"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { LuGitPullRequestDraft } from "react-icons/lu";
import { FaCheck, FaInbox } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const statuses = [
  { value: "Published", label: "Published", icon: FaCheck },
  { value: "Inactive", label: "Inactive", icon: IoClose },
  { value: "Draft", label: "Draft", icon: FaInbox },
];

const StatusDropdown = ({ selectedStatuses, setSelectedStatuses }) => {
  const [open, setOpen] = useState(false);

  function returnColor(status) {
    switch (status) {
      case "Published":
        return "text-green-600 bg-green-100";
      case "Inactive":
        return "text-red-600 bg-red-100";
      case "Draft":
        return "text-gray-600 bg-gray-100";
      default:
        return "";
    }
  }

  function handleCheckBoxChange(value) {
    setSelectedStatuses((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  }

  function clearFilter() {
    setSelectedStatuses([]);
  }

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"secondary"} className="h-10">
            <LuGitPullRequestDraft />
            Status
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-48" side="bottom" align="center">
          <Command className="p-1">
            <CommandList>
              <CommandGroup>
                {statuses.map((status) => {
                  const Icon = status.icon;
                  return (
                    <CommandItem
                      className="h-10 mb-2"
                      key={status.value}
                      value={status.value}
                      onSelect={() => handleCheckBoxChange(status.value)}
                    >
                      <Checkbox
                        className="size-4 rounded-[4px]"
                        checked={selectedStatuses.includes(status.value)}
                        onCheckedChange={() =>
                          handleCheckBoxChange(status.value)
                        }
                      />
                      <div
                        className={`flex items-center gap-1 ${returnColor(
                          status.value
                        )} p-1 rounded-lg px-4 text-[13px]`}
                      >
                        <Icon className="text-sm" />
                        {status.label}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
            <div className="flex flex-col gap-2 text-[23px]">
              <Separator />
              <Button
                variant={"ghost"}
                className="text-[12px] mb-1"
                onClick={clearFilter}
              >
                Clear Filters
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StatusDropdown;
