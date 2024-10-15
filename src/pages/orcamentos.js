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
      const novoOrcamento = { categoria, meta: parseFloat(meta), gasto: 0 };
      setOrcamentos([...orcamentos, novoOrcamento]);
      setCategoria("");
      setMeta("");
    }
  };

  const atualizarGasto = (index, valor) => {
    const novoOrcamento = [...orcamentos];
    novoOrcamento[index].gasto += parseFloat(valor);
    setOrcamentos(novoOrcamento);
    verificarAlertas(novoOrcamento);
  };

  const verificarAlertas = (orcamentosAtualizados) => {
    const novosAlertas = orcamentosAtualizados
      .filter((o) => o.gasto >= o.meta * 0.8) // Alerta para gastos acima de 80%
      .map((o) =>
        o.gasto >= o.meta
          ? `Atenção: Orçamento para ${o.categoria} foi excedido!`
          : `Aviso: Gastos com ${o.categoria} estão em 80% ou mais do orçamento.`
      );
    setAlertas(novosAlertas);
  };

  const handleBack = () => {
    router.push("/"); // Redireciona para a página inicial
  };

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
            <span>Gasto: R${orc.gasto.toFixed(2)}</span>
            <input
              type="number"
              placeholder="Adicionar Gasto"
              onChange={(e) => atualizarGasto(index, e.target.value)}
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
