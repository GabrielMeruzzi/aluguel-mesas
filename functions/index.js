/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const {
  onCall,
  onRequest,
  HttpsError,
} = require("firebase-functions/v2/https");

const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// GET ALUGUEIS ENTREGAR
exports.getAluguelEntregar = onCall(async (req, res) => {
  try {
    const snapshot = await db
      .collection("aluguel")
      .where("status", "==", 0)
      .get();
    const alugueis = [];
    snapshot.forEach((doc) => {
      alugueis.push({ id: doc.id, ...doc.data() });
    });
    return alugueis;
  } catch (err) {
    console.error("Erro ao buscar dados de aluguel", err);
  }
});

// GET ALUGUEIS ENTREGUE
exports.getAluguelEntregue = onCall(async (req, res) => {
  try {
    const snapshot = await db
      .collection("aluguel")
      .where("status", "==", 1)
      .get();
    const alugueis = [];
    snapshot.forEach((doc) => {
      alugueis.push({ id: doc.id, ...doc.data() });
    });
    return alugueis;
  } catch (err) {
    console.error("Erro ao buscar dados de aluguel", err);
  }
});

// GET ALUGUEIS PENDENTE
exports.getAluguelPendente = onCall(async (req, res) => {
  try {
    const snapshot = await db
      .collection("aluguel")
      .where("status", "==", 2)
      .where("pagamento", "==", false)
      .get();
    const alugueis = [];
    snapshot.forEach((doc) => {
      alugueis.push({ id: doc.id, ...doc.data() });
    });
    return alugueis;
  } catch (err) {
    console.error("Erro ao buscar dados de aluguel", err);
  }
});

// GET ALUGUEIS FINALIZADO
exports.getAluguelFinalizado = onCall(async (req, res) => {
  try {
    const snapshot = await db
      .collection("aluguel")
      .where("status", "==", 2)
      .where("pagamento", "==", true)
      .get();
    const alugueis = [];
    snapshot.forEach((doc) => {
      alugueis.push({ id: doc.id, ...doc.data() });
    });
    return alugueis;
  } catch (err) {
    console.error("Erro ao buscar dados de aluguel", err);
  }
});

// ADICIONAR ALUGUEL
exports.addAluguel = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  const aluguel = req.body;
  try {
    await getFirestore()
      .collection("aluguel")
      .add({
        nome: aluguel.nome,
        celular: aluguel.celular,
        endereco: aluguel.endereco,
        qntCustomizada: aluguel.qntCustomizada,
        qntJogos: aluguel.qntJogos,
        qntMesas: aluguel.qntMesas,
        qntCadeiras: aluguel.qntCadeiras,
        valor: aluguel.valor,
        observacao: aluguel.observacao,
        pagamento: aluguel.pagamento,
        status: aluguel.status,
        dataCriacao: new Date().toLocaleDateString("pt-BR"),
        dataEntrega: new Date(aluguel.dataEntrega).toLocaleDateString("pt-BR"),
      });
    return res.status(200).json({
      success: true,
      message: `Aluguel Adicionado.`,
    });
  } catch (err) {
    console.error("Erro ao adicionar aluguel", err);
    return res.status(500).json({
      sucess: false,
      message: "Não foi possível adicionar aluguel ao BD.",
      error: err.message,
    });
  }
});

// UPDATE ALUGUEL
exports.updateAluguel = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  const { idAluguel, newData } = req.body;
  try {
    await db.collection("aluguel").doc(idAluguel).update(newData);
    return res.status(200).json({
      success: true,
      message: `Dados atualizados.`,
    });
  } catch (err) {
    console.error("Erro ao atualizar dados:", err);
    return res.status(500).json({
      success: false,
      message: "Não foi possível atualizar o dados do aluguel.",
      error: err.message,
    });
  }
});

// DELETE ALUGUEL
exports.deleteAluguel = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  const { idAluguel } = req.body;
  try {
    await db.collection("aluguel").doc(idAluguel).delete();
    return res.status(200).json({
      success: true,
      message: `Aluguel excluido.`,
    });
  } catch (err) {
    console.error("Erro ao excluir:", err);
    return res.status(500).json({
      success: false,
      message: "Não foi possível excluir aluguel.",
      error: err.message,
    });
  }
});
