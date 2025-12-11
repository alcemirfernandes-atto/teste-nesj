"use client";

import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/image";
import SideBar from "./sideBar/sideBar";
import { useState } from "react";

const DRAWER_WIDTH = 280;

type Props = {
  title: string;
  arrowback?: boolean;
  img?: string;
  children: React.ReactNode;
};

export default function NavBar({
  title,
  arrowback = false,
  img = "",
  children,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const mainContentStyle = {
    marginLeft: open ? `${DRAWER_WIDTH}px` : "0",
    transition: "margin-left ease-in-out",
  };

  return (
    <div className="flex flex-col">
      <SideBar toggleDrawer={toggleDrawer} open={open}></SideBar>
      <div style={mainContentStyle}>
        <nav className="bg-black flex flex-row items-center h-15 gap-4 p-4">
          {img != "" && <Image src={img} alt="Logo" width={45} height={45} />}
          {arrowback && (
            <IconButton onClick={() => router.back()}>
              <ArrowBackIosIcon className="text-white" />
            </IconButton>
          )}
          <span className="text-xl font-semibold text-white">{title}</span>
        </nav>
        {children}
      </div>
    </div>
  );
}
