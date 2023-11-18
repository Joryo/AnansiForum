"use client";

import { useContext, useEffect } from "react";

import { useRequireUser } from "@/hooks/requireUser";
import { UserContext } from "@/contexts/UserContext";

export default function AccountPage() {
  useRequireUser();

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(null);
  }, []);

  return;
}
