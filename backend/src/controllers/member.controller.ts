import { Request, Response } from "express";
import api from "../utils/api";
import { SigninSchema } from "../validation/member.validator";
import bcrypt from 'bcrypt';
import axios from "axios";
import config from "../config";
import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/apiError";


export const login = async(req: Request, res:Response) => {

    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
      throw new ApiError(parsedData.error.message, 500);
    }

    const { email, password } = parsedData.data;
    const check = await axios.get(`${config.API_URL}/api/v1/members/?email=${email}&password=${password}`);

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

    // Generate JWT token
    const token = jwt.sign({ adminId }, config.JWT_SECRET as string, { expiresIn: "1d" });

    // Send response
    res.status(200).json({
      success: true,
      message: "Signin successful",
      token,
    });
}

export const getunapprovedMembers = async(req: Request, res: Response) => {

  const members = await api.get('members/unapproved');

  if(!members.data.success) {
        throw new ApiError(members.data.message, 500);
  }

  res.json({
      success: true,
      members: members.data.unapprovedMembers
  })

}

export const approveMember = async(req: Request, res: Response) => {

    const {memberId} = req.params;
    const {isApproved} = req.body;
    const adminId = req.adminId;

    const approval = await api.patch(`/members/approve/${memberId}`, {isApproved, adminId});
    if(!approval.data.success) {
      throw new ApiError(approval.data.message, 500);
    }
    
    res.status(200).json({
      success: true,
      message: "Request approved successfully"
    })
}