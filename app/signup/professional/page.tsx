import AuthForm from '@/components/AuthForm';

export default function ProfessionalSignup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Sign Up as a Professional</h1>
      <AuthForm type="signup" userType="professional" />
    </div>
  );
}