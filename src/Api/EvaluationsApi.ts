import Api from "../Lib/Axios";
import { type Evaluation } from "../Types/Index";
import { isAxiosError } from "axios";

export async function saveEvaluation(evaluation: Evaluation) {
  try {
    const { data } = await Api.post("/evaluations", evaluation);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al guardar la evaluación");
  }
}

export async function getEvaluations() {
  try {
    const { data } = await Api.get("/evaluations");
    console.log(data)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al obtener las evaluaciones");
  }
}

export const deleteEvaluation = async (id: string) => {
  try {
    await Api.delete(`/evaluations/${id}`);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error al eliminar evaluación");
    }
    throw new Error("Error desconocido al eliminar evaluación");
  }
};