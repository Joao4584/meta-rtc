import { DropdownMenu, DropdownMenuTrigger } from "@/modules/shared/ui/dropdown-menu";
import { Wifi } from "lucide-react";
import Image from "next/image";
import { ListContentDropDown } from "./ListContentDropDown";


export default function ProfileHeader() {

  return(
    <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="text-slate-200">
              <div className="text-sm font-medium">Joao4584</div>
              <div className="text-sm text-gray-400 flex ">
                Status: <Wifi className="w-4 h-4 ml-1.5 mt-0.5 text-green-600" />
              </div> 
            </div>
            <Image src="/examples/image-default-user.jpg" alt="User Logo"
              width={40} height={40} className="w-10 h-10 rounded-lg border-2 border-indigo-400" 
            />
        </div>
        </DropdownMenuTrigger>
        <ListContentDropDown/>
    </DropdownMenu>
  )
}