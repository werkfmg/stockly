"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as LuIcons from "react-icons/lu";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";

import { icons } from "./Icon"; // هنا icons عبارة عن { id, icon: "FaBookReader", isSelected: false }

const allIconPacks = {
  ...FaIcons,
  ...IoIcons,
  ...LuIcons,
  ...GiIcons,
  ...MdIcons,
  ...BsIcons,
  ...AiIcons,
};

const getIcon = (iconName) => {
  const IconComponent = allIconPacks[iconName];
  return IconComponent ? <IconComponent /> : null;
};

// Context
const IconContext = createContext();

export const IconProvider = ({ children, iconsArray, onUpdateIcon }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [allIcons, setAllIcons] = useState(iconsArray);

  const updateSelectedIcon = (iconName) => {
    onUpdateIcon(iconName); // نرجع string
  };

  return (
    <IconContext.Provider
      value={{
        updateSelectedIcon,
        openDialog,
        setOpenDialog,
        allIcons,
        setAllIcons,
      }}
    >
      {children}
    </IconContext.Provider>
  );
};

export const useIconContext = () => {
  const context = useContext(IconContext);
  if (!context)
    throw new Error("useIconContext must be used within IconProvider");
  return context;
};

// Dialog Box Component
export function IconDialogBox() {
  const {
    allIcons,
    setAllIcons,
    updateSelectedIcon,
    openDialog,
    setOpenDialog,
  } = useIconContext();

  const handleSelect = (iconObj) => {
    setAllIcons((prev) =>
      prev.map((icon) => ({
        ...icon,
        isSelected: icon.id === iconObj.id,
      }))
    );
    updateSelectedIcon(iconObj.icon); // نخزن الاسم بس
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="h-11">
          {(() => {
            const SelectedIconObj = allIcons.find((icon) => icon.isSelected);
            if (SelectedIconObj) {
              return getIcon(SelectedIconObj.icon);
            }
            return "Choose";
          })()}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl mt-5">
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
          <DialogDescription>
            Pick an icon to represent your content. You can update it anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full border rounded-lg p-3 flex flex-wrap gap-2 mt-5">
          {allIcons.map((iconObj) => (
            <div
              key={iconObj.id}
              className={`rounded-md border p-3 hover:bg-primary hover:text-white ${
                iconObj.isSelected
                  ? "bg-primary text-white border-none"
                  : "text-slate-400"
              }`}
              onClick={() => handleSelect(iconObj)}
            >
              {getIcon(iconObj.icon)}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Selector Component
export function IconSelector({ onUpdateIcon }) {
  return (
    <IconProvider iconsArray={icons} onUpdateIcon={onUpdateIcon}>
      <IconDialogBox />
    </IconProvider>
  );
}
