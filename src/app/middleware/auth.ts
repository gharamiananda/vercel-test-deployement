import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/appError";
import { UserRole } from "../modules/user/user.interface";
import User from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

interface AuthJwtPayload extends JwtPayload {
   email: string;
   roles: UserRole[];
}

const auth = (...requiredRoles: UserRole[]) => {
   return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
         const token = req.headers.authorization;

         if (!token) {
            throw new AppError(
               StatusCodes.UNAUTHORIZED,
               "You are not authorized!"
            );
         }

         try {
            const decoded = jwt.verify(
               token,
               config.jwt_access_secret as string
            ) as AuthJwtPayload;

            const { email, roles } = decoded;

            // 🔹 Find user (DO NOT check role here)
            const user = await User.findOne({
               email,
               isActive: true,
            });

            if (!user) {
               throw new AppError(
                  StatusCodes.NOT_FOUND,
                  "This user is not found!"
               );
            }

            // 🔹 Role authorization (ANY match)
            if (
               requiredRoles.length &&
               !roles.some((role) => requiredRoles.includes(role))
            ) {
               throw new AppError(
                  StatusCodes.FORBIDDEN,
                  "You are not authorized!"
               );
            }

            // 🔹 Attach user info to request
            req.user = decoded;
            next();
         } catch (error) {
            if (error instanceof TokenExpiredError) {
               return next(
                  new AppError(
                     StatusCodes.UNAUTHORIZED,
                     "Token has expired! Please login again."
                  )
               );
            }

            return next(
               new AppError(StatusCodes.UNAUTHORIZED, "Invalid token!")
            );
         }
      }
   );
};

export default auth;
