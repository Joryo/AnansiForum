"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useContext, useEffect, useState } from "react";

import { useRequireUser } from "@/hooks/requireUser";
import { updateMember } from "@/services/api/Members";
import { UserContext } from "@/contexts/UserContext";

export default function PostsNewPage() {
  useRequireUser();
  const { setUser, user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = () => {
    //TODO: Validate fields
    if (!user) return;
    updateMember(user.id, email, name, password)
      .then((response) => {
        //TODO Show success alert
        setUser(response.data);
      })
      .catch((error) => {
        //TODO: Show alert error
        console.error(error);
      });
  };

  return (
    <>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="New password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex flex-row-reverse">
        <Button
          className="max-w-32"
          color="primary"
          size="lg"
          onClick={() => handleSubmit()}
        >
          Update
        </Button>
      </div>
    </>
  );
}
