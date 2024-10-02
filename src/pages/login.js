import { useState } from "react";
import styles from "../styles/Login.module.css"; // Certifique-se de criar este arquivo CSS para estilos

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // Controla se estamos na tela de login ou registro
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica de autenticação ou registro
        console.log({ name, email, password });
    };

    return (
        <div className={styles.container}>
            <h1>{isLogin ? "Login" : "Registro"}</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                {!isLogin && (
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>Nome</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Senha</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    {isLogin ? "Entrar" : "Registrar"}
                </button>
            </form>
            <p className={styles.toggleText}>
                {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
                <span onClick={() => setIsLogin(!isLogin)} className={styles.toggleLink}>
                    {isLogin ? "Registrar" : "Entrar"}
                </span>
            </p>
        </div>
    );
};

export default Login;
