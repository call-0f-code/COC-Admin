import { Request, Response } from "express";
import api from "../utils/api";
import bcrypt from 'bcrypt';
import config from "../config";
import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/apiError";
import { success } from "zod";


export const login = async(req: Request, res:Response) => {

    const { email, password } = req.body;
    const check = await api.get(`/members/?email=${email}`);

    const adminId = check.data.user.id;
    const hashedPassword = check.data.user.accounts[0];
    const isManager = check.data.user.isManager;

    if(!isManager) {
      throw new ApiError("Unauthorized access detected", 403);
    }
    
    const isPasswordValid = await bcrypt.compare(password, hashedPassword.password);
    if(!isPasswordValid) {
        throw new ApiError("Invalid password", 403)
    }


    const token = jwt.sign({ adminId }, config.JWT_SECRET(), { expiresIn: "1d" });

    // Send response
    res.status(200).json({
      success: true,
      message: "Signin successful",
      token,
    });
}

export const getunapprovedMembers = async(req: Request, res: Response) => {

  const members = await api.get('/members/unapproved');

  res.status(200).json({
      success: true,
      members: members.data.unapprovedMembers
  })

}

export const approveMember = async(req: Request, res: Response) => {

    const {memberId} = req.params;
    const {isApproved} = req.body;
    const adminId = req.adminId;

    if(!isApproved===undefined || !memberId) {
      throw new ApiError(" required field missing", 400);
    }

    await api.patch(`/members/approve/${memberId}`, {isApproved, adminId});
    
    res.status(200).json({
      success: true,
      message: "Request approved successfully"
    })
}

export const getAllMembers = async(req: Request, res: Response) => {

  const approvedMembers = await api.get('/members/');
  const unapprovedMembers = await api.get('/members/unapproved');

  const members = [
  ...approvedMembers.data.user,
  ...unapprovedMembers.data.unapprovedMembers
];
  
  res.json({
    success: true,
    members
  })
}