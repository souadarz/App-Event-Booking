import { AuthLayout } from "@/component/auth/AuthLayout";
import { LoginForm } from "@/component/auth/LoginForm";


export default function LoginPage() {
  return (
    <AuthLayout
      title="EventBooking"
      subtitle="Connectez-vous à votre compte"
      footerText="Vous n'avez pas de compte ?"
      footerLink="/register"
      footerLinkText="Inscrivez-vous"
    >
      <LoginForm />
    </AuthLayout>
  );
}