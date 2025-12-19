import { Aside } from "./components/aside";
import { Forecast } from "./components/forecast";

function App() {
  return (
    <main className="font-geist min-h-screen flex justify-center items-center bg-cover bg-center bg-[url(./assets/anime-style-clouds.jpg)]">
      <div className="flex gap-4 w-full max-w-6xl text-black">
        <Aside />
        <Forecast />
      </div>
    </main>
  );
}

export default App;
