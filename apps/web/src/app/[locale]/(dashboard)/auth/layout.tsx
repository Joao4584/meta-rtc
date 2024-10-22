import AuthTemplate from '@/modules/authentication/templates/authTemplate'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthTemplate>{children}</AuthTemplate>
}