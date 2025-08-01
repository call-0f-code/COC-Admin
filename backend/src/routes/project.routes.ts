import { NextFunction, Router, Request, Response } from "express";
import { addmembers, createProject, deleteProject, getMemberByprojectId, getProjectById, getProjects, removeMember, updateProjet } from "../controllers/project.controller";
import { Multer } from "multer";
import { validate } from "../middleware/validates";
import { createProjectSchema, memberIdSchema, updateProjectSchema } from "../validation/projects.validators";

function parseProjectData(req: Request, res: Response, next: NextFunction) {
    if (req.body.projectData) {
        try {
            const parse = JSON.parse(req.body.projectData);
            req.body.projectData = parse;
        } catch (e) {
            return res.status(400).json({ message: 'Invalid JSON in projectData field' });
        }
    }
    next();
}

export default function projetRouter(upload: Multer) {
    const router = Router();

  
    // create a project
    router.post('/', upload.single('image'), parseProjectData, validate( createProjectSchema ) , createProject);

    // delete project
    router.delete('/:projectId', deleteProject);

    // get All projects
    router.get('/', getProjects);

    // getProject BY Id
    router.get('/:projectId', getProjectById);

    // update Projets
    router.patch('/:projectId', upload.single('image'), parseProjectData, validate(updateProjectSchema) , updateProjet);

    // add member to project
    router.post('/:projectId/members', addmembers);

    // get All member in Projects
    router.get('/:projectId/members', getMemberByprojectId);

    // remove the member from the projects
    router.delete('/:projectId/members/:memberId', validate( memberIdSchema ) , removeMember);

    return router;
}