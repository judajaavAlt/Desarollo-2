export default function Logo() {
    return (
      <div className="px-8 py-2">
        <p className="flex items-end text-3xl font-bold">
          {" "}
          <img
            src="../public/login-assets/logo-login.png"
            alt="logo app"
            className="h-16 scale-x-[-1] transform"
          />
          CATMONEY
        </p>
      </div>
    );
  }