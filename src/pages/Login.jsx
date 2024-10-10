import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faDeleteLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-between bg-gradient-to-r from-blue-400 to-purple-600">
      <nav className="absolute top-0 w-full py-2 text-center">
        <div className="flex flex-row px-8">
          <img
            src="../public/login-assets/logo-login.png"
            alt="logo app"
            className="h-20 transform scale-x-[-1]"
          />
          <p className="text-4xl font-bold content-end">ATMONEY</p>
        </div>
      </nav>

      <div className="flex w-1/2 flex-col items-center justify-center px-8">
        <div className="flex flex-col items-start rounded-xl bg-neutral-200 bg-opacity-80 p-6 text-left shadow-lg">
          <h1 className="mb-4 text-5xl font-bold text-black">
            Transforma tu Economía ¡miau miau!
          </h1>
          <p className="text-lg text-gray-700">
            Gastar, ahorrar y vivir mejor con hábitos simples.
          </p>
        </div>
        <img
          src="../public/login-assets/image-login.png"
          alt="imagen decorativa"
          className="mt-4 max-w-md transform scale-x-[-1]"
        />
      </div>

      <div className="mx-10 w-2/5 rounded-xl bg-white px-12 py-8 shadow-lg">
        <header className="my-4 text-center">
          <h2 className="text-3xl font-extrabold text-slate-800">
            INICIAR SESION
          </h2>
        </header>

        <div className="my-4 text-center">
          <button className="flex w-full items-center justify-center rounded-full border border-gray-300 p-2 shadow-md transition-shadow hover:shadow-lg">
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

        <hr className="my-4 border-black" />

        <form className=" ">
          {error && (
            <div className="rounded-md bg-blue-200 py-2 text-center">
              <p className="text-red-600">CREDENCIALES INVALIDAS</p>
            </div>
          )}

          <div className="my-4 flex flex-col">
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
              className="absolute inset-y-0 right-3 flex items-center"
            >
              {showPassword ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  style={{ color: "#d93030" }}
                />
              ) : (
                <FontAwesomeIcon icon={faEye} style={{ color: "#74C0FC" }} />
              )}
            </button>
          </div>

          <div className="my-4 text-center">
            <button className="font-bold text-amber-500">
              ¿Haz olvidado tu contraseña?
            </button>
          </div>

          <div className="my-4 text-center">
            <button className="flex w-full items-center justify-between rounded-full border border-gray-300 p-4 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded border-gray-400 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">No soy un robot</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22C6.485 22 2 17.514 2 12S6.485 2 12 2s10 4.485 10 10-4.485 10-10 10zm5-11h-3v4H10v-4H7V9h3V5h4v4h3v2z" />
                  </svg>
                </div>
                <div className="text-xs text-gray-500">
                  <a href="#" className="hover:underline">
                    Privacy
                  </a>{" "}
                  •{" "}
                  <a href="#" className="hover:underline">
                    Terms
                  </a>
                </div>
              </div>
            </button>
          </div>

          <div className="my-4 text-center">
            <button
              onClick={() => navigate("/signup")}
              className="mt-3 w-full rounded-md bg-amber-500 py-3 text-base font-bold text-gray-200 transition-all duration-300 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Iniciar Sesión
            </button>
          </div>

          <div className="my-4 text-center">
            <p className="text-sm text-gray-400">¿No tienes una cuenta?</p>
            <button
              onClick={() => navigate("/signup")}
              className="mt-3 w-full rounded-md bg-amber-500 py-3 text-base font-bold text-gray-200 transition-all duration-300 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Regístrate
            </button>
          </div>
        </form>
      </div>

      <div className="absolute bottom-0 w-full py-4 text-center">
        <div className="flex justify-around text-slate-600">
          <a href="#" className="hover:text-slate-900 hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:text-slate-900 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-900 hover:underline">
            Security
          </a>
        </div>
      </div>
    </div>
  );
}
