"use client";

import { title } from "@/components/primitives";
import { useRequireUser } from "@/hooks/requireUser";

export default function AccountPage() {
  useRequireUser();

  return (
    <div>
      <h1 className={title()}>Account</h1>
    </div>
  );
}
