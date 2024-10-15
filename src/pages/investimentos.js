import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Investimentos.module.css";

const Investimentos = () => {
  const [investimentos, setInvestimentos] = useState([]);
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [data, setData] = useState("");

  const router = useRouter();

  // Carregar investimentos do localStorage ao montar o componente
  useEffect(() => {
    const storedInvestimentos = localStorage.getItem("investimentos");
    if (storedInvestimentos) {
      setInvestimentos(JSON.parse(storedInvestimentos));
    }
  }, []);

  // Salvar investimentos no localStorage sempre que houver uma mudança
  useEffect(() => {
    if (investimentos.length > 0) {
      localStorage.setItem("investimentos", JSON.stringify(investimentos));
    }
  }, [investimentos]);

  const handleAddInvestimento = () => {
    if (tipo && valor && instituicao && data) {
      const novoInvestimento = {
        tipo,
        valor: parseFloat(valor),
        instituicao,
        data,
      };
      setInvestimentos([...investimentos, novoInvestimento]);

      // Limpar os campos
      setTipo("");
      setValor("");
      setInstituicao("");
      setData("");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleBack = () => {
    router.push("/"); // Redireciona para a página inicial
  };

  const calcularRendimento = (valorInicial, meses) => {
    const taxa = 0.005; // Exemplo: 0,5% ao mês
    return valorInicial * Math.pow(1 + taxa, meses);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Investimentos</h1>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Tipo de Investimento"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Instituição"
          value={instituicao}
          onChange={(e) => setInstituicao(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleAddInvestimento} className={styles.addButton}>
          Adicionar Investimento
        </button>
      </div>
      <button className={styles.backButton} onClick={handleBack}>
        Voltar à Página Inicial
      </button>
      <h2 className={styles.subtitle}>Seus Investimentos</h2>
      <ul className={styles.ul}>
        {investimentos.map((investimento, index) => {
          const meses = Math.max(
            (new Date() - new Date(investimento.data)) /
              (1000 * 60 * 60 * 24 * 30),
            0
          );
          const rendimento = calcularRendimento(investimento.valor, meses);

          return (
            <li key={index} className={styles.li}>
              <strong>{investimento.tipo}</strong> - {investimento.instituicao}
              <br />
              Valor Inicial: R$ {investimento.valor.toFixed(2)}
              <br />
              Rendimento Estimado: R$ {rendimento.toFixed(2)}
              <br />
              Data de Início: {investimento.data}
            </li>
          );
        })}
      </ul>
      <footer className={styles.footer}>
        <p>&copy; 2024 Organiza. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Investimentos;
