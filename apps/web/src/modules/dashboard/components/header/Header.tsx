import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/modules/shared/ui/dropdown-menu"

import { RefreshCcw, Bell, Star, Wifi } from "lucide-react"; 
import ProfileHeader from "./profile/profile";

export const HeaderDashboard = () => {


  return(
    <ul className="bg-gray-header bg-opacity-50  w-full h-16 px-6 flex justify-center items-center">
      <div className="flex justify-between items-center w-full max-w-screen-2xl">

          <li className="w-48">
            <Image  src="/logo/icon-meta.png" alt="" className="w-32" width={200} height={65} />
          </li>
          <li className="flex items-center gap-8">
            <div className="flex gap-2">
              <button className="bg-gray-btn-card border-gray-700 hover:bg-slate-600 transition-colors border p-2 rounded-md flex items-center">
                  <Bell className="w-4 h-4" />
              </button>
              <button className="bg-gray-btn-card border-gray-700 hover:bg-slate-600 transition-colors border p-2 rounded-md flex items-center">
                <Star className="w-4 h-4" />
              </button>
            </div>
            <ProfileHeader/>       
          </li>
      </div>
    </ul>
  )
}