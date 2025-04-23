import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/auth";
import { adminLogin } from "../../api.service";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { isAuthenticated, issLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { token, admin } = await adminLogin(username, password);
      login(token, admin);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!issLoading && isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, issLoading, router]);

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-[#edf2f7]">
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-[#23292f] text-white">
        <section className="flex w-[30rem] flex-col space-y-20">
          <div className="text-center text-5xl font-serif">F I N F O</div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                required
              />
            </div>
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mt-12">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full transform rounded-sm bg-[#ca0905] py-2 font-bold duration-300 hover:bg-[#ca0805bc] mt-12"
              disabled={isLoading}
            >
              {isLoading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
