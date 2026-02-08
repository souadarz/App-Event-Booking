import { AuthLayout } from "@/component/auth/AuthLayout";
import { RegisterForm } from "@/component/auth/RegisterForm";


export default function RegisterPage() {
  return (
    <AuthLayout
      title="EventBooking"
      subtitle="Créez votre compte"
      footerText="Vous avez déjà un compte ?"
      footerLink="/login"
      footerLinkText="Connectez-vous"
    >
      <RegisterForm />
    </AuthLayout>
  );
}