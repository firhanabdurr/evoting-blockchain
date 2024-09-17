import React from "react";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PeopleIcon from "@mui/icons-material/People";
import LoopIcon from "@mui/icons-material/Loop";
import LogoutIcon from "@mui/icons-material/Logout";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import GradingIcon from "@mui/icons-material/Grading";
import logo from "../logo.svg";

export const WebsiteDetails = {
  icon: logo,
  title: "evoting",
};

export const SidebarData = [
  {
    title: "Beranda",
    icon: <AiOutlineDashboard />,
    link: "/admin/dashboard",
    id: "",
  },
  {
    title: "Pemilih",
    icon: <PeopleIcon />,
    link: "/admin/user",
    id: "",
  },
  {
    title: "Kandidat",
    icon: <AiOutlineUser />,
    link: "/admin/candidate",
    id: "",
  },
  {
    title: "Pemilihan",
    icon: <HowToVoteIcon />,
    link: "/admin/election",
    id: "",
  },
  {
    title: "Fase Pemilihan",
    icon: <LoopIcon />,
    link: "/admin/phase",
    id: "",
  },
  {
    title: "Hasil",
    icon: <GradingIcon />,
    link: "/admin/result",
    id: "",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/admin/logout",
    id: "",
  },
];

export const hidingSysmbole = {
  icon: <BsFillArrowLeftCircleFill />,
};
