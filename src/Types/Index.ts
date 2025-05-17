import z from "zod";

export const metricSchema = z.object({
  _id: z.string(),
  caracteristica: z.string().min(1, "La característica es obligatoria"),
  subcaracteristica: z.string().min(1, "La subcaracterística es obligatoria"),
  metrica: z.string().min(1, "La métrica es obligatoria"),
  descripcion: z.string().optional(),
  fechaCreacion: z.string().optional(),
});

export const metricFormSchema = metricSchema.pick({
  caracteristica: true,
  subcaracteristica: true,
  metrica: true,
  descripcion: true,
});

export const dashboardMetricSchema = z.array(
  metricSchema.pick({
    _id: true,
    caracteristica: true,
    subcaracteristica: true,
    metrica: true,
  })
);

export interface Project {
  _id: string;
  name: string;
  description: string;
  status: "Aprobado" | "Revisión" | "No Aprobado";
  endDate: string;
  startDate: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  status: "Aprobado" | "Revisión" | "No Aprobado";
  endDate: string;
  startDate: string;
}


export const evaluationSchema = z.object({
  _id: z.string().optional(),
  projectId: z.string(),
  date: z.string(),
  metrics: z.array(
    z.object({
      metricId: z.string(),
      value: z.number().min(0).max(100),
      observations: z.string(),
    })
  ),
  result: z.number().optional(),
  status: z.enum(["Borrador", "Completado", "Aprobado", "Rechazado"]),
});

export interface Evaluation {
  _id?: string; 
  projectId: string;
  projectName?: string; 
  date: string; 
  metrics: EvaluationMetric[];
  result?: number;
  status: "Borrador" | "Completado" | "Aprobado" | "Rechazado";
  notes?: string;
  createdAt?: string; 
  updatedAt?: string;
  description: string
}

export interface EvaluationMetric {
  metricId: string;
  metricName?: string; 
  value: number;
  observations: string;
  characteristic?: string;
  subcharacteristic?: string; 
}

export type Metric = z.infer<typeof metricSchema>;
export type MetricFormData = z.infer<typeof metricFormSchema>;
export type DashboardMetric = z.infer<typeof dashboardMetricSchema>;
