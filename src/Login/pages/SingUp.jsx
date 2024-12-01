// Dependencias
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Importa PropTypes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Componentes
import Logo from "../components/Logo";
import Decoracion from "../components/Decoracion";
import Footer from "../components/Footer";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Maneja el cambio de valores de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    console.log(`Crear cuenta con ${email} y ${password}`);
    navigate("/home");
  };

  return (
    <div className="grid min-h-screen grid-cols-2 bg-gradient-to-r from-amber-500 to-amber-300">
      <nav className="col-span-2">
        <Logo />
      </nav>

      <Decoracion />

      <div className="flex items-center justify-center">
        <div className="rounded-xl bg-slate-50 p-8 lg:w-full 2xl:w-7/12">
          <form onSubmit={handleSignUp}>
            <header className="my-4 mb-8 text-center">
              <h2 className="text-5xl font-extrabold text-slate-800">
                CREAR CUENTA
              </h2>
            </header>

            <InputField
              label="Correo Electrónico"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Ingresa tu correo"
              required
            />

            <InputField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-amber-400"
                  />
                </button>
              }
            />

            <button
              type="submit"
              className="w-full rounded-full bg-amber-500 py-3 text-slate-900 transition hover:bg-amber-600 my-4"
            >
              Aceptar y unirse
            </button>

            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 flex h-3 w-3 items-center justify-center rounded-full border border-gray-300"></span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="my-4 text-center">
              <p className="text-sm">
                Al hacer clic en «Aceptar y unirse», aceptas las{" "}
                <a className="text-amber-400 underline" href="#">
                  Condiciones de uso
                </a>
                , la{" "}
                <a className="text-amber-400 underline" href="#">
                  Política de privacidad
                </a>{" "}
                y la{" "}
                <a className="text-amber-400 underline" href="#">
                  Política de cookies
                </a>
                de Catmoney.
              </p>
            </div>

            <div className="my-4 flex justify-center text-center">
              <p className="text-sm text-slate-700">
                ¿Ya tienes una cuenta?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-bold text-amber-500 hover:underline"
                >
                  Log In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <footer className="col-span-2 w-full">
        <Footer />
      </footer>
    </div>
  );
}

// Componente reutilizable para campos de entrada
function InputField({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  icon,
}) {
  return (
    <div className="my-4">
      <label className="block mb-2 text-md font-semibold text-slate-600">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-md border border-gray-700 p-3 pr-10 text-gray-600 focus:ring-amber-400"
        />
        {icon && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

// Validación de PropTypes para InputField
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  icon: PropTypes.node,
};
