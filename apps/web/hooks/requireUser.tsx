import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import { UserContext } from "@/contexts/UserContext";

export function useRequireUser() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return user;
}
