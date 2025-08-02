import { Request, Response } from "express"
import { ApiError } from "../utils/apiError";
import api from "../utils/api";
import FormData from 'form-data';
import { constants } from "buffer";
import { imageSchema } from "../validation/projects.validators";

export const createProject = async (req: Request, res: Response) => {
    
    const file = req.file;
    const parseFile = imageSchema.safeParse(file);
    const adminId = req.adminId;

    if ( !parseFile.success || !file) throw new ApiError("Image is not Uploaded in correct format !!!", 400);

    const  formData = new FormData();

    const data = { ...req.body.projectData, adminId };
    
    formData.append("projectData", JSON.stringify(data));
    formData.append("image", file.buffer, file.originalname);


    const response = await api.post('/projects',  formData , {
                headers: formData.getHeaders(), 
  
    });

    const project = response.data;

    res.status(200).json({
        success: true,
        data: project
    })

}

export const deleteProject = async (req: Request, res: Response) => {

    const projectId = req.params.projectId;

    if (!projectId) throw new ApiError('ProjectId is missing ', 400);

    const response = await api.delete(`/projects/${projectId}`);

    const project = response.data;

    res.status(200).json({
        success: true,
        data: project
    })
}

export const getProjects = async (req: Request, res: Response) => {

     const response = await api.get('/projects');

    const projects = response.data;

    res.status(200).json({
        success: true,
        data: projects
    })
        

}

export const getProjectById = async (req: Request, res: Response) => {

    const projectId = req.params.projectId;
    if (!projectId) throw new ApiError("ProjectId is missing", 400);

    const response = await api.get(`/projects/${projectId}`);
    const project = response.data;
    res.status(200).json({
        success: true,
        data: project
    })
}


export const updateProjet = async (req: Request, res: Response) => {

    const projectId = req.params.projectId;
    
    if (!projectId) throw new ApiError('The projectId is missing ', 400);
    const updatedById = req.adminId;

    const file = req.file;
    const formData = new FormData();

    if( file ){
        const parseFile = imageSchema.safeParse(file);
        if( !parseFile.success) throw new ApiError("File is not correct format " , 400);
        formData.append('image', file.buffer, file.originalname);
    }

      const data = {...req.body.projectData , updatedById}
 
    formData.append("projectData", JSON.stringify(data));

     const response = await api.patch(`/projects/${projectId}`,  formData , {
        headers: formData.getHeaders(),
    });

    const  project  = response.data;

    res.status(200).json({
        success: true,
        data: project
    })

}


export const addmembers = async (req: Request, res: Response) => {

    const projectId = req.params.projectId;
    if (!projectId) throw new ApiError("ProjectId is missing ", 400);
    
    const memberId = req.body;

    const response = await api.post(`/projects/${projectId}/members`,  memberId );

    const  membersProject = response.data;

    res.status(200).json({
        success: true,
        data: membersProject
    })
}

export const getMemberByprojectId = async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    if (!projectId) throw new ApiError("ProjectId is missing ", 400);

    const response = await api.get(`/projects/${projectId}/members`);

    const  membersProject = response.data;

    res.status(200).json({
        success: true,
        data: membersProject
    })
}

export const removeMember = async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    if (!projectId) throw new ApiError("ProjectId is missing ", 400);
    const memberId = req.params.memberId;
    
    if( !memberId ) throw new ApiError("memeberId is missaing" , 400);
    const response = await api.delete(`/projects/${projectId}/members/${memberId}`);

    const  removeMemeber  = response.data;

    res.status(200).json({
        success: true,
        data: removeMemeber
    })
}
