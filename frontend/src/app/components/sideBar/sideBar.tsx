"use client";

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";
import OutputIcon from "@mui/icons-material/Output";
import Image from "next/image";
import { ApiInternal, RoutePages } from "@/shared/enums/internal-routes";

interface SideBarProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

const SideBar = ({ open, toggleDrawer }: SideBarProps) => {
  const router = useRouter();
  function redireciona(rota: string) {
    switch (rota) {
      case "venda":
        router.push(RoutePages.VENDA);
        break;
      case "home":
        router.push(RoutePages.HOME);
        break;
      case "produto":
        router.push(RoutePages.PRODUTO);
        break;
      case "dashboard":
        router.push(RoutePages.DASHBOARD);
        break;
    }
  }

  async function logout() {
    await fetch(ApiInternal.LOGOUT, {
      method: "POST",
    });
    router.push(RoutePages.HOME);
  }

  const DrawerList = (
    <Box className="w-70 bg-black h-full">
      <div className=" flex mt-5 mb-5 mr-4 justify-around">
        <Image src={"/vercel.svg"} alt="Logo" width={45} height={45} />
        <h1 className="text-3xl text-white">Menu</h1>
        <IconButton onClick={toggleDrawer(false)}>
          {open ? (
            <ChevronLeftIcon className=" text-white" />
          ) : (
            <ChevronRightIcon className=" text-white" />
          )}
        </IconButton>
      </div>
      <Divider sx={{ background: "#fff" }} />
      <List>
        {["home", "venda", "produto", "dashboard"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => redireciona(text)}>
              <ListItemText
                className=" text-white"
                primary={text.charAt(0).toUpperCase() + text.slice(1)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ListItemButton onClick={() => logout()}>
        <OutputIcon className=" text-red-800" />
        <ListItemText className=" text-white ml-2" primary="Logout" />
      </ListItemButton>
    </Box>
  );

  return (
    <>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-50">
        <Button
          onClick={toggleDrawer(true)}
          sx={{
            minWidth: 30,
            width: 30,
            height: 40,
            borderRadius: "0 50% 50% 0",
            padding: 0,
            backgroundColor: "#000000",
            color: "#fffff",
            "&:hover": {
              backgroundColor: "#E5E7EB",
            },
          }}
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div>
        <Drawer
          variant="persistent"
          role="presentation"
          open={open}
          onClose={toggleDrawer(false)}
        >
          {DrawerList}
        </Drawer>
      </div>
    </>
  );
};

export default SideBar;
