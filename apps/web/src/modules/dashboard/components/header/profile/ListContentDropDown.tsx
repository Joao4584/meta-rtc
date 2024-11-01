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
} from "@/modules/shared/ui/dropdown-menu";
import { ReactElement } from "react";

// import { setToken } from "@/src/lib/token";
import { useRouter } from 'next/navigation';
import { Cloud, Github, Keyboard, LifeBuoy, LogOut, Settings, SunMoon, User } from "lucide-react";
import { useTheme } from "next-themes";

export const ListContentDropDown = (): ReactElement => {
    const router = useRouter();
    const { setTheme, theme } = useTheme();
    const disconnectAuth = () => {
        router.push('/auth');
    }

    const alterThemeColor = () => {
        setTheme(theme == "dark" ? "light": "dark");
    }

    return (
        <DropdownMenuContent className="w-64 relative -left-6 top-1 rounded-tr-none dark:rounded-tr-none">
            <DropdownMenuLabel className="">Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Keyboard className="mr-2 h-4 w-4" />
                    <span>Atalhos de Teclado</span>
                    <DropdownMenuShortcut className="text-xs">ctrl + /</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled onClick={alterThemeColor}>
                    <SunMoon className="mr-2 h-4 w-4" />
                    <span>Modo {theme == "dark" ? "Claro" : "Escuro"}</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub (Projeto)</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Suporte</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
                <Cloud className="mr-2 h-4 w-4" />
                <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={disconnectAuth} className="rounded-bl-full dark:rounded-bl-xl rounded-br-full dark:rounded-br-xl">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Desconectar</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}
