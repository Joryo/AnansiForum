"use client";

import { title } from "@/components/primitives";
import { useRequireUser } from "@/hooks/requireUser";

export default function AccountPage() {
  useRequireUser();

  return (
    <div>
      <h1 className={title()}>Logout</h1>
    </div>
  );
}
