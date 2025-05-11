import { isAxiosError } from "axios";
import Api from "../Lib/Axios";
import {
  dashboardMetricSchema,
  type Metric,
  type MetricFormData,
} from "../Types/Index";

export async function getMetrics() {
  try {
    const { data } = await Api.get("/metrics");
    const response = dashboardMetricSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
    throw new Error("Formato de datos inválido");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al obtener las métricas");
  }
}

export const getMetricById = async (id: string): Promise<Metric> => {
  try {
    const response = await Api.get(`/metrics/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al obtener la métrica");
  }
};

export const createMetric = async (
  metricData: MetricFormData
): Promise<Metric> => {
  try {
    const response = await Api.post("/metrics", metricData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al crear la métrica");
  }
};

export const deleteMetric = async (id: string): Promise<void> => {
  try {
    const response = await Api.delete(`/metrics/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al eliminar la métrica");
  }
};

export const updateMetric = async (id: string, metricData: MetricFormData): Promise<Metric> => {
  try {
    const response = await Api.put(`/metrics/${id}`, metricData);
    return response.data;
  } catch (error) {
     if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al actualizar la métrica");
  }
};
