import { useState, useEffect } from "react";
import styles from "../styles/Painel.module.css";

const Painel = () => {
  const [saldoAtual, setSaldoAtual] = useState(0);
  const [receitasRecentes, setReceitasRecentes] = useState([]);
  const [despesasRecentes, setDespesasRecentes] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const storedRegistros = localStorage.getItem("registros");
      if (storedRegistros) {
        const registros = JSON.parse(storedRegistros);
        const receitas = registros.filter(
          (registro) => registro.categoria === "receita"
        );
        const despesas = registros.filter(
          (registro) => registro.categoria === "despesa"
        );

        const totalReceitas = receitas.reduce(
          (acc, receita) => acc + parseFloat(receita.valor),
          0
        );
        const totalDespesas = despesas.reduce(
          (acc, despesa) => acc + parseFloat(despesa.valor),
          0
        );

        setReceitasRecentes(receitas);
        setDespesasRecentes(despesas);
        setSaldoAtual(totalReceitas - totalDespesas);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Painel Financeiro</h1>

      {/* Visão geral */}
      <div className={styles.overview}>
        <div className={styles.card}>
          <h2>Saldo Atual</h2>
          <p>R$ {saldoAtual.toFixed(2)}</p>
        </div>
        <div className={styles.card}>
          <h2>Receitas Recentes</h2>
          <ul className={styles.ul}>
            {receitasRecentes.map((receita, index) => (
              <li key={index} className={styles.li}>
                {receita.data}: R$ {parseFloat(receita.valor).toFixed(2)} -{" "}
                {receita.descricao}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <h2>Despesas Recentes</h2>
          <ul className={styles.ul}>
            {despesasRecentes.map((despesa, index) => (
              <li key={index} className={styles.li}>
                {despesa.data}: R$ {parseFloat(despesa.valor).toFixed(2)} -{" "}
                {despesa.descricao}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gráficos e Relatórios */}
      <div className={styles.reports}>
        <h2>Relatórios e Estatísticas</h2>
        <p>Gráfico de receitas e despesas:</p>
        <div className={styles.grafico}>
          {/* Placeholder para o gráfico */}
          <p>Gráfico de Receita x Despesa</p>
        </div>
      </div>

      {/* Análise de Tendências */}
      <div className={styles.analysis}>
        <h2>Análise de Tendências</h2>
        <p>
          Aqui você pode exibir uma análise das suas finanças ao longo do tempo,
          mostrando como suas receitas e despesas variaram em diferentes
          períodos.
        </p>
      </div>
    </div>
  );
};

export default Painel;
