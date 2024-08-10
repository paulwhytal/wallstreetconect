import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Wall Street Connect</h1>
      <p className="text-xl mb-12 text-center max-w-2xl">
        Connect and learn from top Wall Street professionals in investment banking, private equity, private credit, and hedge funds.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>For Professionals</CardTitle>
            <CardDescription>Get paid to share your expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Create your profile</li>
              <li>Offer 1-on-1 calls</li>
              <li>Review resumes</li>
              <li>Sell your resumes, templates, and more</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/signup/professional">Sign Up as a Professional</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>For Prospects</CardTitle>
            <CardDescription>Launch your career in finance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Schedule 1-on-1 calls with active professionals</li>
              <li>Get your resume reviewed</li>
              <li>Access resources</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/signup/prospect">Sign Up as a Prospect</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8">
        <p className="text-center mb-4">Already have an account?</p>
        <Button asChild variant="outline">
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </main>
  );
}