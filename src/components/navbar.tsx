"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { logout, userState } from "@/store/silces/userSlice";
import { useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import IconWrapper from "./icon-wrapper";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(userState);
  const router = useRouter();

  const onLogout = async () => {
    dispatch(logout());
  };

  const goTo = (path: string) => router.push(path);
  return (
    <NextUINavbar
      isBordered
      maxWidth="xl"
      position="sticky"
      className="sticky z-50 top-0"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Blog</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Button
            onClick={() => goTo("/new-post")}
            variant="light"
            startContent={<IconWrapper>edit_square</IconWrapper>}
          >
            Write
          </Button>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user?.name}
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              textValue="Profile"
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              textValue="Log Out"
              onClick={onLogout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NextUINavbar>
  );
};
