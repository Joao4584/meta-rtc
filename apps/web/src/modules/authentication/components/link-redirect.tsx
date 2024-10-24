import { useI18n } from "@/locale/client"
import Link from "next/link";

export const LinkRedirectRegister = async () => {
  const t = useI18n();
  return(
    <div className="w-full flex justify-center mt-4">
        <span className="text-slate-600 dark:text-slate-300 text-sm ">
          {t("auth.register_redirect.question")} <Link href={"/auth/register"} className="underline">{t("auth.register_redirect.button")}</Link>
        </span>
    </div>
  )
}
export const LinkRedirectLogin = async () => {
  const t = useI18n();
  return(
    <div className="w-full flex justify-center mt-4">
        <span className="text-slate-600 dark:text-slate-300 text-sm ">
          {t("auth.login_redirect.question")} <Link href={"/auth/"} className="underline">{t("auth.login_redirect.button")}</Link>
        </span>
    </div>
  )
}