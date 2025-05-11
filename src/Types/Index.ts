import z from "zod";

export const metricSchema = z.object({
  _id: z.string(),
  caracteristica: z.string().min(1, "La característica es obligatoria"),
  subcaracteristica: z.string().min(1, "La subcaracterística es obligatoria"),
  metrica: z.string().min(1, "La métrica es obligatoria"),
  descripcion: z.string().optional(),
  fechaCreacion: z.string().datetime(),
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

export type Metric = z.infer<typeof metricSchema>;
export type MetricFormData = z.infer<typeof metricFormSchema>;
export type DashboardMetric = z.infer<typeof dashboardMetricSchema>;
