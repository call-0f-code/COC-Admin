import { Request, Response } from "express"
import { ApiError } from "../utils/apiError";
import api from "../utils/api";
import FormData from 'form-data';
import { constants } from "buffer";
import { createProjectSchema, imageSchema, memberIdSchema, updateProjectSchema } from "../Validators/projects.validators";
import axios from "axios";

export const createProject = async (req: Request, res: Response) => {

    const file = req.file;
    const parseFile = imageSchema.safeParse(file);
    // const adminId = req.AdminId;
    const adminId = "4037653b-a434-460f-8a81-ca8cb46375aa";

    if ( !parseFile || !file) throw new ApiError("Image is not Uploaded in correct format !!!", 401);

    const parseData = createProjectSchema.safeParse(req.body.projectData);
    if( !parseData.success ) throw new ApiError(" Send the correct data" , 401);

    const  formData = new FormData();

    let data = req.body.projectData;
    data.adminId = adminId

    formData.append("projectData", JSON.stringify(req.body.projectData));
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

    if (!projectId) throw new ApiError('ProjectId is missing ', 401);

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
    if (!projectId) throw new ApiError("ProjectId is missing", 401);

    const response = await api.get(`/projects/${projectId}`);
    const project = response.data;
    res.status(200).json({
        success: true,
        data: project
    })
}


export const updateProjet = async (req: Request, res: Response) => {

    const projectId = req.params.projectId;

    if (!projectId) throw new ApiError('The projectId is missing ', 401);

     // const adminId = req.AdminId;
    const adminId = "4037653b-a434-460f-8a81-ca8cb46375aa";

    const file = req.file;
    const formData = new FormData();

    if( file ){
        const parseFile = imageSchema.safeParse(file);
        if( !parseFile.success) throw new ApiError("File is not correct format !!!" , 401);
        formData.append('image', file.buffer, file.originalname);
    }

    const parseData = updateProjectSchema.safeParse(req.body.projectData);
    if( !parseData.success ) throw new ApiError("Send The data in correct format")

    let data = req.body.projectData;
    data.updatedById = adminId;
 
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
    if (!projectId) throw new ApiError("ProjectId is missing ", 401);

    const parseData = memberIdSchema.safeParse(req.body);

    if( !parseData.success) throw new ApiError('Send data in correct format' , 401);
    
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
    if (!projectId) throw new ApiError("ProjectId is missing ", 401);

    const response = await api.get(`/projects/${projectId}/members`);

    const  membersProject = response.data;

    res.status(200).json({
        success: true,
        data: membersProject
    })
}

export const removeMember = async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    if (!projectId) throw new ApiError("ProjectId is missing ", 401);
    const memberId = req.params.memberId;

    const response = await api.delete(`/projects/${projectId}/members/${memberId}`);

    const  removeMemeber  = response.data;

    res.status(200).json({
        success: true,
        data: removeMemeber
    })
}