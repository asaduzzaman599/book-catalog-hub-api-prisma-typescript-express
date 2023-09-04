import catchAsync from "../../../shared/catchAsync"
import responseData from "../../../shared/response"
import { AuthService } from "./auth.service"

const signup = catchAsync(async (req, res)=>{
  const user = req.body

  const result = await AuthService.signUp(user)

  return responseData({
    data: result,
    message: 'User created successfully!'
  }, req)

})

const signIn = catchAsync(async (req, res)=>{

  const userCredential = req.body

  const result = await AuthService.signIn(userCredential)

  return responseData({
    message: "User signin successfully!",
    token: result
  }, res)

})


export const AuthController = {
  signup,
  signIn
} 