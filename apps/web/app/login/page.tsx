import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Input } from "@nextui-org/input";

export default function LoginPage() {
  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardHeader className="text-2xl text-center">Login</CardHeader>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <Input required id="email" label="Email" type="email" />
          </div>
          <div className="space-y-2">
            <Input required id="password" label="Password" type="password" />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full">Login</Button>
          <Link className="text-sm text-center" href="#" prefetch={false}>
            Forgot Password?
          </Link>
        </CardFooter>
      </Card>
      <div className="mt-4">
        <span className="text-sm">Don't have an account? </span>
        <Link className="text-sm text-blue-500" href="#" prefetch={false}>
          Sign up
        </Link>
      </div>
    </>
  );
}
