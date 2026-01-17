import { AuthController } from "../../controller/auth.controller";
import { ImageController } from "../../controller/Image.controller";
import { AuthRepository } from "../../repository/authRepository";
import { ImageRepository } from "../../repository/ImageRepository";
import { AuthService } from "../../services/auth.Service";
import { ImageService } from "../../services/Image.service";
import { IAuthController } from "../interfaces/controllers/IAuth.Controller";
import { IImageController } from "../interfaces/controllers/IImage.controller";
import { IAuthRepository } from "../interfaces/repository/IAuthRepository";
import { IImageRepository } from "../interfaces/repository/IImageRepository";
import { IAuthService } from "../interfaces/services/IAuth.service";
import { IImageService } from "../interfaces/services/IImage.service";
import { TYPES } from "../types";
import { container } from "tsyringe";

container.registerSingleton<IAuthService>(TYPES.IAuthServices, AuthService);
container.registerSingleton<IAuthController>(TYPES.IAuthController, AuthController);
container.registerSingleton<IAuthRepository>(TYPES.IAuthRepository, AuthRepository);
container.registerSingleton<IImageController>(TYPES.IImageController, ImageController);
container.registerSingleton<IImageService>(TYPES.IImageService, ImageService);
container.registerSingleton<IImageRepository>(TYPES.IImageRepository, ImageRepository);

export { container };
