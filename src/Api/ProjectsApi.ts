import { isAxiosError } from "axios";
import Api from "../Lib/Axios";
import { type Project, type ProjectFormData } from "../Types/Index";

export async function getProjects() {
  try {
    const { data } = await Api.get("/projects");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al obtener los proyectos");
  }
}

export const getProjectById = async (id: string): Promise<Project> => {
  try {
    const response = await Api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al obtener el proyecto");
  }
};

export const createProject = async (
  projectData: ProjectFormData
): Promise<Project> => {
  try {
    const response = await Api.post("/projects", projectData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al crear el proyecto");
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    const response = await Api.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al eliminar el proyecto");
  }
};

export const updateProject = async (
  id: string,
  projectData: ProjectFormData
): Promise<Project> => {
  try {
    const response = await Api.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al actualizar el proyecto");
  }
};
