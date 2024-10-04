import { useState } from "react";
import { useRouter } from "next/router"; // Importar useRouter
import styles from "../styles/Receitas.module.css";

const Receitas = () => {
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [registros, setRegistros] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const router = useRouter(); // Inicializar useRouter

  const handleAddRegistro = () => {
    if (isEditing) {
      const updatedRegistros = [...registros];
      updatedRegistros[editIndex] = { data, valor, descricao, categoria };
      setRegistros(updatedRegistros);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const novoRegistro = {
        data,
        valor,
        descricao,
        categoria,
      };
      setRegistros([...registros, novoRegistro]);
    }

    setData("");
    setValor("");
    setDescricao("");
    setCategoria("");
  };

  const handleEditRegistro = (index) => {
    const registro = registros[index];
    setData(registro.data);
    setValor(registro.valor);
    setDescricao(registro.descricao);
    setCategoria(registro.categoria);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteRegistro = (index) => {
    const updatedRegistros = registros.filter((_, i) => i !== index);
    setRegistros(updatedRegistros);
  };

  const handleBack = () => {
    router.push("/"); // Volta para a página inicial
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerenciar Receitas e Despesas</h1>

      <div className={styles.form}>
        <label htmlFor="data">Data:</label>
        <input
          type="date"
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="valor">Valor:</label>
        <input
          type="number"
          id="valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="descricao">Descrição:</label>
        <input
          type="text"
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="categoria">Categoria:</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className={styles.input}
        >
          <option value="">Selecione uma categoria</option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>

        <button onClick={handleAddRegistro} className={styles.button}>
          {isEditing ? "Salvar Alterações" : "Adicionar Registro"}
        </button>

        {/* Botão de voltar */}
        <button onClick={handleBack} className={styles.backButton}>
          Voltar à página inicial
        </button>
      </div>

      <div className={styles.registros}>
        <h2>Registros</h2>
        <ul>
          {registros.map((registro, index) => (
            <li key={index} className={styles.registro}>
              <span>{registro.data}</span> - <span>{registro.valor}</span> -{" "}
              <span>{registro.descricao}</span> -{" "}
              <span>{registro.categoria}</span>
              <div className={styles.actions}>
                <button
                  onClick={() => handleEditRegistro(index)}
                  className={styles.editButton}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteRegistro(index)}
                  className={styles.deleteButton}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Receitas;
