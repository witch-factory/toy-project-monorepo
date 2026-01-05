import { useState } from "react";

type Props = {
  username: string;
  setUsername: (username: string) => void;
};

function Input({ username, setUsername }: Props) {
  // 기타 코드들
  return (
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  );
}

function App() {
  const [username, setUsername] = useState("");
  return (
    <div>
      <Input username={username} setUsername={setUsername} />
    </div>
  );
}

export default App;
