export default function Decoracion() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative ml-32 flex w-7/12 flex-col items-start rounded-xl bg-orange-100 bg-opacity-80 p-6 text-left shadow-lg">
        <h1 className="mb-4 text-6xl font-bold text-black">
          Transforma tu Economía ¡miau miau!
        </h1>

        <p className="text-2xl font-bold text-slate-700">
          Gastar, ahorrar y vivir mejor con hábitos simples.
        </p>

        <div className="absolute bottom-[-30px] left-1/2 h-0 w-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-orange-200"></div>
      </div>

      <img
        src="../public/login-assets/image-login.png"
        alt="imagen decorativa"
        className="mt-4 max-w-screen-sm scale-x-[-1] transform"
      />
    </div>
  );
}
