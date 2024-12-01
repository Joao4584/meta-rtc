import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";


interface SubmitButtonProps{
  className?: string;
  loading: boolean;
  children: ReactNode
}
export default function SubmitButton(props: SubmitButtonProps) {

  return(
    <button
        type="submit"
        disabled={props.loading}
        className={` flex rounded-md px-4 py-3 justify-center gap-2 text-white font-medium bg-indigo-600 disabled:bg-indigo-800 hover:bg-indigo-700 ${props.className}`}
    >
      {props.children} 
      {
        props.loading ? <LoaderCircle className="animate-spin" /> : ""
      }
      
    </button>
  )

}