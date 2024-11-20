import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; 
import Swal from "sweetalert2";
import Logo from "../components/Logo";
import Decoracion from "../components/Decoracion";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
 

  function handleGoogle(e) {
    e.preventDefault();
    console.log("inicio sesion con google");
    navigate("/home");
  }

  function retrievePassword(e) {
    e.preventDefault();
    console.log("recuperar contrasenia");
  }

 

  function handleLogin(e) {
    e.preventDefault(); 

    console.log(`inicio sesion ${email} ${password}`);
    navigate("/home");
  }

  return (
    <div className="grid min-h-screen grid-cols-2 bg-gradient-to-r from-amber-500 to-amber-300">
      <nav className="col-span-2">
        <Logo></Logo>
      </nav>

      <Decoracion></Decoracion>

      <div className="flex items-center justify-center">
        <div className="rounded-xl bg-slate-50 p-8 lg:w-full 2xl:w-7/12">
          <form onSubmit={handleLogin} className="">
            <header className="my-4 mb-8 text-center">
              <div className="flex flex-row">
                <div className="mr-3 h-12 w-2 bg-amber-300"></div>
                <h2 className="content-center text-5xl font-extrabold text-slate-800">
                  INICIAR SESION
                </h2>
              </div>
            </header>

            <div className="my-4 text-center">
              <button
                type="button"
                onClick={handleGoogle}
                className="flex w-full items-center justify-center rounded-full border border-gray-300 px-6 py-5 shadow-md transition-shadow hover:shadow-lg"
              >
                <img
                  src="https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png"
                  alt="Google"
                  className="mr-3 h-6 w-6"
                />
                <span className="font-medium text-gray-600">
                  Continue with Google
                </span>
              </button>
            </div>

            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 flex h-3 w-3 items-center justify-center rounded-full border border-gray-300"></span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="my-4 flex flex-col">
              <label
                className="text-md mb-2 font-semibold text-slate-600"
                htmlFor="email"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingresa tu correo"
                className="rounded-md border border-gray-700 p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="relative my-4 w-full">
              <label
                className="text-md mb-2 font-semibold text-slate-600"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingresa tu contraseña"
                className="w-full rounded-md border border-gray-700 p-3 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-10 right-2 flex items-center p-2"
              >
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    style={{ color: "#d93030", fontSize: "1.5rem" }} // Aumenta el tamaño del ícono
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    style={{ color: "#FEAF00", fontSize: "1.5rem" }} // Aumenta el tamaño del ícono
                  />
                )}
              </button>
            </div>

            <div className="my-4 text-center">
              <button
                type="button"
                onClick={retrievePassword}
                className="font-bold text-amber-500 hover:underline"
              >
                ¿Haz olvidado tu contraseña?
              </button>
            </div>

            <div className="my-4 flex justify-center text-center">
 
            </div>

            <div className="my-4 text-center">
              <button
                type="submit"
                className="focus:ring-esmerald-400 w-full rounded-full bg-amber-500 py-3 text-slate-900 transition-all duration-500 hover:bg-amber-600 focus:ring-2"
              >
                Iniciar sesion
              </button>
            </div>

            <div className="my-4 flex justify-center text-center">
              <p className="text-sm text-slate-600">
                ¿No tienes una cuenta?{" "}
                <button
                  onClick={() => navigate("/singup")}
                  className="font-bold text-amber-500 hover:underline"
                >
                  Sing UP
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <footer className="col-span-2 w-full">
        <Footer></Footer>
      </footer>
    </div>
  );
}
