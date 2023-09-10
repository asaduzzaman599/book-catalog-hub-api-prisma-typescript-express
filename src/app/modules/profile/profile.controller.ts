import catchAsync from "../../../shared/catchAsync"
import responseData from "../../../shared/response"
import { IValidateUser } from "../auth/auth.interface"
import { ProfileService } from "./profile.service"

const findUserProfile = catchAsync(async (req, res) => {
 const user = req.user as IValidateUser
 const result = await ProfileService.findUser(user)

 return responseData({ message: "Profile retrieved successfully",result:   result}, res);
})


export const ProfileController = {
  findUserProfile
}