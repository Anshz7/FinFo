export default function LoginPage() {
    return (
      <div className="h-screen overflow-hidden flex items-center justify-center bg-[#edf2f7]">
        <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-[#23292f] text-white">
          <section className="flex w-[30rem] flex-col space-y-10">
            <div className="text-center text-4xl font-serif">L O G I N</div>
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input
                type="text"
                placeholder="Username"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              />
            </div>
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input
                type="password"
                placeholder="Password"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              />
            </div>
            <button className="transform rounded-sm bg-[#ca0905] py-2 font-bold duration-300 hover:bg-[#ca0805bc]">
              LOG IN
            </button>
            <a href="#" className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300">
              FORGOT PASSWORD?
            </a>
        
          </section>
        </main>
      </div>
    );
  }