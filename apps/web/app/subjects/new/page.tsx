"use client";

import { title } from "@/components/primitives";
import { useRequireUser } from "@/hooks/requireUser";

export default function SubjectsNewPage() {
  useRequireUser();

  return (
    <div>
      <h1 className={title()}>New subject</h1>
    </div>
  );
}
