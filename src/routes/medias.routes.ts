import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controllers/medias.controller'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middewares'
import { wrapAsync } from '~/utils/handlers'

const mediaRouter = Router()

mediaRouter.post('/upload-image', accessTokenValidator, verifiedUserValidator, wrapAsync(uploadImageController))
mediaRouter.post('/upload-video', accessTokenValidator, verifiedUserValidator, wrapAsync(uploadVideoController))

export default mediaRouter
