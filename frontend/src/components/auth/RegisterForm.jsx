import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <div className="w-full lg:w-1/2 h-screen bg-dark flex items-center justify-center p-8">
            {/* Form Box */}
            <div className="w-full max-w-md">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-light">Welcome!</h1>
                        <p className="text-sm text-light">Already have an account?{' '}
                            <button
                            onClick={() => window.location.href = '/login'} 
                            className="text-light font-semibold hover:underline">Log in</button>
                        </p>
                    </div>
                    <p className="text-light">Create your account to get started.</p>
                </div>

                {/* Register Form */}
                <form className="space-y-4">
                    {/* First Name and Last Name Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <input 
                        type="text" 
                        placeholder="Firstname"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        
                        <input 
                        type="text" 
                        placeholder="Lastname"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Username Input */}
                    <div>
                        <input 
                        type="text" 
                        placeholder="Username"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <input 
                        type="email" 
                        placeholder="Email"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible className="text-xl" />
                            ) : (
                                <AiOutlineEye className="text-xl" />
                            )}
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible className="text-xl" />
                            ) : (
                                <AiOutlineEye className="text-xl" />
                            )}
                        </button>
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mt-1 mr-2 text-primary focus:ring-primary"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition-colors mt-6"
                    >
                        Register
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-light"></div>
                        <span className="px-3 text-light text-sm">Or continue with</span>
                        <div className="flex-1 border-t border-light"></div>
                    </div>

                    {/* Social Register Buttons */}
                    <div className="flex gap-4 justify-center">
                        <button className="flex items-center justify-center w-14 h-14 border border-gray-300 rounded-lg bg-white hover:bg-gray-300 transition-colors">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-7 h-7" />
                        </button>
                        <button className="flex items-center justify-center w-14 h-14 border border-gray-300 rounded-lg bg-white hover:bg-gray-300 transition-colors">
                            <FaApple className="text-3xl text-black" />
                        </button>
                        <button className="flex items-center justify-center w-14 h-14 border border-gray-300 rounded-lg bg-white hover:bg-gray-300 transition-colors">
                            <FaFacebook className="text-3xl" style={{ color: '#1877F2' }} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}