import { useEffect, useState } from "react";

interface ChatUser {
  userId: string;
  username: string;
  updateUsername: (newUsername: string) => void;
}

export function useChatUser(): ChatUser {
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    let storedUserId = localStorage.getItem("chatUserId");

    if (!storedUserId) {
      storedUserId = crypto.randomUUID();
      localStorage.setItem("chatUserId", storedUserId);
    }

    setUserId(storedUserId);

    const storedUsername = localStorage.getItem("chatUsername");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const updateUsername = (newUsername: string) => {
    localStorage.setItem("chatUsername", newUsername);
    setUsername(newUsername);
  };

  return { userId, username, updateUsername };
}
