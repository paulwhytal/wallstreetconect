import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Wall Street Connect</h1>
      <p className="text-xl mb-12 text-center max-w-2xl">
        Connect with top Wall Street professionals or find your next career opportunity in investment banking, private equity, private credit, and hedge funds.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>For Professionals</CardTitle>
            <CardDescription>Share your expertise and grow your network</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Create your profile</li>
              <li>Offer consultations</li>
              <li>Review resumes</li>
              <li>Share resources</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/signup">Sign Up as a Professional</Link>
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
              <li>Browse expert profiles</li>
              <li>Get resume reviews</li>
              <li>Book consultations</li>
              <li>Access resources</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/signup">Sign Up as a Prospect</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="flex space-x-4">
        <Button asChild variant="outline">
          <Link href="/login">Log In</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </main>
  );
}