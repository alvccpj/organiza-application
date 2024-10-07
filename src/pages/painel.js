import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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

  // Preparar os dados para o gráfico
  const data = [
    {
      name: "Receitas",
      valor: receitasRecentes.reduce(
        (acc, receita) => acc + parseFloat(receita.valor),
        0
      ),
    },
    {
      name: "Despesas",
      valor: despesasRecentes.reduce(
        (acc, despesa) => acc + parseFloat(despesa.valor),
        0
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Painel Financeiro</h1>

      {/* Visão geral */}
      <div className={styles.overview}>
        <div className={styles.card}>
          <h2 className={styles.h2}>Saldo Atual</h2>
          <p className={styles.saldo}>R$ {saldoAtual.toFixed(2)}</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.h2}>Receitas Recentes</h2>
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
          <h2 className={styles.h2}>Despesas Recentes</h2>
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

      {/* Gráfico de Receitas e Despesas */}
      <div className={styles.reports}>
        <h2>Gráfico de Receita x Despesa</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
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
      <footer className={styles.footer}>
        <p>&copy; 2024 Organiza. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Painel;
