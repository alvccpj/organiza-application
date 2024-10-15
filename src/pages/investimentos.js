import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importação do useRouter
import styles from "../styles/Investimentos.module.css";

const Investimentos = () => {
  const [investimentos, setInvestimentos] = useState([]);
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [data, setData] = useState("");

  const router = useRouter(); // Inicialização do router

  // Carregar investimentos salvos no localStorage
  useEffect(() => {
    const storedInvestimentos = localStorage.getItem("investimentos");
    if (storedInvestimentos) {
      setInvestimentos(JSON.parse(storedInvestimentos));
    }
  }, []);

  // Salvar investimentos no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("investimentos", JSON.stringify(investimentos));
  }, [investimentos]);

  const handleAddInvestimento = () => {
    const novoInvestimento = {
      tipo,
      valor: parseFloat(valor),
      instituicao,
      data,
    };
    setInvestimentos([...investimentos, novoInvestimento]);

    // Limpar os campos após a adição
    setTipo("");
    setValor("");
    setInstituicao("");
    setData("");
  };

  const handleBack = () => {
    router.push("/"); // Redireciona para a página inicial
  };

  const calcularRendimento = (valorInicial, meses) => {
    const taxa = 0.005; // 0,5% ao mês (exemplo)
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

        <button className={styles.backButton} onClick={handleBack}>
          Voltar à Página Inicial
        </button>
      </div>

      <h2 className={styles.subtitle}>Seus Investimentos</h2>
      <ul className={styles.ul}>
        {investimentos.map((investimento, index) => {
          const meses = Math.max(
            (new Date() - new Date(investimento.data)) / (1000 * 60 * 60 * 24 * 30),
            0
          );
          const rendimento = calcularRendimento(investimento.valor, meses);

          return (
            <li key={index} className={styles.li}>
              <strong>{investimento.tipo}</strong> - {investimento.instituicao} <br />
              Valor Inicial: R$ {investimento.valor.toFixed(2)} <br />
              Rendimento Estimado: R$ {rendimento.toFixed(2)} <br />
              Data de Início: {investimento.data}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Investimentos;
