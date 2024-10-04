import { useState } from "react";
import { useRouter } from "next/router"; // Importa o useRouter para redirecionamento
import styles from "../styles/Login.module.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const MIN_PASSWORD_LENGTH = 8;
  const router = useRouter(); // Inicializa o hook de roteamento

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`);
      return;
    }

    setError("");

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        window.alert("Login realizado com sucesso!");
      } else {
        window.alert("Credenciais incorretas!");
      }
    } else {
      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      window.alert("Registro realizado com sucesso!");

      setName("");
      setEmail("");
      setPassword("");
      setIsLogin(true);
    }
  };

  const handleBackToHome = () => {
    router.push("/"); // Redireciona para a página inicial
  };

  return (
    <div className={styles.container}>
      <h1>{isLogin ? "Login" : "Registro"}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
          </div>
        )}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          {isLogin ? "Entrar" : "Registrar"}
        </button>
      </form>

      {/* Novo botão para voltar à página inicial */}
      <button onClick={handleBackToHome} className={styles.backButton}>
        Voltar à página inicial
      </button>

      <p className={styles.toggleText}>
        {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className={styles.toggleLink}
        >
          {isLogin ? "Registrar" : "Entrar"}
        </span>
      </p>
    </div>
  );
};

export default Login;
