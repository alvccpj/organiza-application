import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Orcamentos.module.css";

export default function Orcamentos() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [meta, setMeta] = useState("");
  const [alertas, setAlertas] = useState([]);

  const router = useRouter();

  // Carrega orçamentos salvos do localStorage
  useEffect(() => {
    const orcamentosSalvos =
      JSON.parse(localStorage.getItem("orcamentos")) || [];
    setOrcamentos(orcamentosSalvos);
  }, []);

  // Salva orçamentos sempre que há uma mudança
  useEffect(() => {
    localStorage.setItem("orcamentos", JSON.stringify(orcamentos));
  }, [orcamentos]);

  const adicionarOrcamento = () => {
    if (categoria && meta) {
      const novoOrcamento = {
        categoria,
        meta: parseFloat(meta),
        receita: 0,
        despesa: 0,
      };
      setOrcamentos([...orcamentos, novoOrcamento]);
      setCategoria("");
      setMeta("");
    }
  };

  const atualizarValor = (index, tipo, valor) => {
    const novoOrcamento = [...orcamentos];
    const valorNumerico = parseFloat(valor) || 0;
    novoOrcamento[index][tipo] += valorNumerico;
    setOrcamentos(novoOrcamento);
    verificarAlertas(novoOrcamento);
  };

  const verificarAlertas = (orcamentosAtualizados) => {
    const novosAlertas = orcamentosAtualizados
      .map((o) => {
        const saldoDisponivel = o.meta + o.receita - o.despesa;
        const percentualGasto = (o.despesa / (o.meta + o.receita)) * 100;

        if (percentualGasto >= 100) {
          return `⚠️ Atenção: Orçamento para ${o.categoria} foi excedido!`;
        } else if (percentualGasto >= 80) {
          return `🔔 Aviso: Gastos com ${o.categoria} atingiram 80% ou mais do orçamento disponível.`;
        }
        return null;
      })
      .filter((alerta) => alerta !== null);

    setAlertas(novosAlertas);
  };

  const handleBack = () => router.push("/");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orçamentos</h1>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Meta de orçamento"
          value={meta}
          onChange={(e) => setMeta(e.target.value)}
          className={styles.input}
        />
        <button onClick={adicionarOrcamento} className={styles.addButton}>
          Adicionar Orçamento
        </button>
      </div>

      <button className={styles.backButton} onClick={handleBack}>
        Voltar à Página Inicial
      </button>

      <ul className={styles.ul}>
        {orcamentos.map((orc, index) => (
          <li key={index} className={styles.li}>
            <span>{orc.categoria}</span>
            <span>Meta: R${orc.meta.toFixed(2)}</span>
            <span>Receita: R${orc.receita.toFixed(2)}</span>
            <span>Despesa: R${orc.despesa.toFixed(2)}</span>
            <input
              type="number"
              placeholder="Adicionar Receita"
              onChange={(e) => atualizarValor(index, "receita", e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Adicionar Despesa"
              onChange={(e) => atualizarValor(index, "despesa", e.target.value)}
              className={styles.input}
            />
          </li>
        ))}
      </ul>

      {alertas.length > 0 && (
        <div className={styles.alertBox}>
          {alertas.map((alerta, index) => (
            <p key={index} className={styles.alert}>
              {alerta}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
