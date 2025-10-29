"use client";
import {
  Bookmark,
  BotMessageSquare,
  Home,
  MessageCircle,
  Search,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Bottomnav() {
  const router = usePathname();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 rounded-xl  w-full bg-gray-100">
      <div className="max-w-md mx-auto">
        <div className="flex items-center py-5 px-7 justify-between ">
          <Link
            href={"/"}
            className={pathname === "/" ? "text-orange-400" : ""}
          >
            <Home />
          </Link>
          <Link 
          href={"/search"}
          className={pathname==='/search'? "text-orange-400":""}
          >
            <Search />
          </Link>
          <Link href={"/Aichat"}
          className={pathname==='/Aichat'? "text-orange-400":""}
          >
            {" "}
            <BotMessageSquare />
          </Link>
          <Link href={"/profile"}
          className={pathname==='/profile'? "text-orange-400":""}>
            {" "}
            <User2 />
          </Link>
        </div>
      </div>
    </nav>
  );
}
