// Dependencias
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Importa PropTypes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

// Componentes
import Logo from "../components/Logo";
import Decoracion from "../components/Decoracion";
import Footer from "../components/Footer";

// Helpers
import { readUser } from "../../helpers/portUsers";

export default function Login() {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Iniciando sesión...",
        showConfirmButton: false,
        timer: 1500,
      });

      const userData = await readUser(email);
      if (userData) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Inicio de sesión exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/home");
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "Error al iniciar sesión",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-2 bg-gradient-to-r from-amber-500 to-amber-300">
      <nav className="col-span-2">
        <Logo />
      </nav>

      <Decoracion />

      <div className="flex items-center justify-center">
        <div className="rounded-xl bg-slate-50 p-8 lg:w-full 2xl:w-7/12">
          <form onSubmit={handleLogin}>
            <header className="my-4 mb-8 text-center">
              <h2 className="text-5xl font-extrabold text-slate-800">
                INICIAR SESIÓN
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

            <div className="my-4 text-center">
              <button
                type="button"
                onClick={() => Swal.fire("Recuperar contraseña no implementado")}
                className="font-bold text-amber-500 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-amber-500 py-3 text-slate-900 transition hover:bg-amber-600"
            >
              Iniciar sesión
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm">
                ¿No tienes una cuenta?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="font-bold text-amber-500 hover:underline"
                >
                  Regístrate
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <footer className="col-span-2">
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
