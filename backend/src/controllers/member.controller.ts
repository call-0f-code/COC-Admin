import { Request, Response } from "express";
import api from "../utils/api";
import { SigninSchema } from "../validation/member.validator";
import bcrypt from 'bcrypt';
import config from "../config";
import jwt from 'jsonwebtoken';


export const login = async(req: Request, res:Response) => {

    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: parsedData.error.message,
      });
    }

    const { email, password } = parsedData.data;
    const check = await api.get(`/members/?email=${email}&password=${password}`);

    if(!check.data.success) {
      return res.status(400).json({message: "Error signing in"});
    }

    const adminId = check.data.user.id;
    const hashedPassword = check.data.user.accounts[0];
    const isManager = check.data.user.isManager;

    if(!isManager) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access detected"
      })
    }

    const isPasswordValid = await bcrypt.compare(password, hashedPassword.password);
    if(!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Invalid password"
      })
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
  const members = await api.get('/members/unapproved');


  if(!members.data.success) {
    return res.status(400).json({
        success: false,
        message: members.data.message
    })
  }

  res.json({
      members: members.data.unapprovedMembers
  })

}

export const approveMember = async(req: Request, res: Response) => {

    const {memberId} = req.params;
    const {isApproved} = req.body;
    const adminId = req.adminId;

    const approval = await api.patch(`/members/approve/${memberId}`, {isApproved, adminId});
    if(!approval.data.success) {
        res.status(400).json({
            success: false,
            message: approval.data.message
        })
        return;
    }
    
    res.status(200).json({
      success: true,
      message: "Request approved successfully"
    })
}