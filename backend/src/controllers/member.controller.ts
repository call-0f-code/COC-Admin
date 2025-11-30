import { Request, Response } from "express";
import api from "../utils/api";
import bcrypt from 'bcrypt';
import config from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ApiError } from "../utils/apiError";
import { success } from "zod";
import { sendApprovalEmail } from "../utils/nodeMailer";
import { setRefreshCookie, signAccessToken, signRefreshToken } from "../utils/tokens";


export const login = async(req: Request, res:Response) => {

    const { email, password } = req.body;
    const check = await api.get(`/members/?email=${email}`);

    const adminId = check.data.user.id;
    const hashedPassword = check.data.user.accounts[0];
    const isManager = check.data.user.isManager;
    const isApproved = check.data.user.isApproved;

    if(!isManager || !isApproved) {
      throw new ApiError("Unauthorized access detected", 403);
    }
    
    const isPasswordValid = await bcrypt.compare(password, hashedPassword.password);
    if(!isPasswordValid) {
        throw new ApiError("Invalid password", 403)
    }

    const token = signAccessToken(adminId);
    const refreshToken = signRefreshToken(adminId);
     await setRefreshCookie(res,refreshToken);

    // Send response
    res.status(200).json({
      success: true,
      message: "Signin successful",
      token
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
    const {isApproved,memberEmail,memberName} = req.body;
    const adminId = req.adminId;


    if(!isApproved===undefined || !memberId || !memberEmail || !memberName) {
      throw new ApiError(" required field missing", 400);
    }

    await api.patch(`/members/approve/${memberId}`, {isApproved, adminId});

    await sendApprovalEmail(memberEmail,memberName);
    
    res.status(200).json({
      success: true,
      message: "Request approved successfully"
    })
}

export const getAllMembers = async(req: Request, res: Response) => {

  const [approvedMembers, unapprovedMembers] = await Promise.all([
    api.get('/members/'),
    api.get('/members/unapproved')
  ]);

  const members = [
  ...approvedMembers.data.user,
  ...unapprovedMembers.data.unapprovedMembers
];
  
  res.json({
    success: true,
    members
  })
}

export const tokenRefresh = async(req:Request,res:Response) =>{
  const token = req.cookies.refresh_token;
  if(!token){
    throw new ApiError('NO refresh token',401);
  }
  const decoded = jwt.verify(token,config.REFRESH_SECRET) as JwtPayload;

  if(!decoded){
    throw new ApiError('Invalid or expired refresh token',401);
  }
  const adminId = decoded.adminId;
  const newToken = signAccessToken(adminId);
  const refreshToken = signRefreshToken(adminId);
  setRefreshCookie(res,refreshToken);

  res.status(200).json({
    success: true,
    message: "Signin successful",
    token:newToken,
  });

}

export const logout = async(req:Request,res:Response)=>{
  res.clearCookie('refresh_token',{path:'/api/v1/members/refresh'})
  res.status(200).json({message:"logged out"});
}