import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import MetaComponent from "../../components/MetaComponent";

const translations = {
  en: {
    createAccount:"Create a new account",
    enterDetails: "Enter your details to create an account",
    firstName: "first name",
    lastName: "last name",
    emailAdress: "email address",
    password: "password",
    confirmPassword: "confirm password",
    submit:"submit",
    userExists:"This account already exists",
    userCreated: "Account created successfully",
    login: "login",
    hasAccount: "Already have an account?",
    firstNamePlaceholder: "John",
    lastNamePlaceholder: "Doe",
    emailPlaceholder: "name@example.com",
    passwordPlaceholder: "Enter your password",
    confirmPasswordPlaceholder: "Confirm your password",
    passwordRule: "Password must be at least 6 characters long",
  },
  ar: {
    createAccount: "أنشئ حساب جديد",
    enterDetails: "أدخل بياناتك لإنشاء حساب",
    firstName: "الاسم الأول",
    lastName: "الإسم الأخير",
    emailAdress: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    submit: "إنشاء حساب",
    userExists: "هذا الحساب موجود بالفعل",
    userCreated: "تم إنشاء الحساب بنجاح",
    login: "تسجيل الدخول",
    hasAccount: "هل لديك حساب؟",
    firstNamePlaceholder: "اسم",
    lastNamePlaceholder: "اللقب",
    emailPlaceholder: "name@example.com",
    passwordPlaceholder: "أدخل كلمة المرور",
    confirmPasswordPlaceholder: "تأكيد كلمة المرور",
    passwordRule: "يجب أن تكون كلمة المرور على الأقل 6 أحرف",
  }
};

const RegisterPageComponent = ({
  registerUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);

  const { language } = useContext(LanguageContext);
  const t= translations[language];
  const isRTL = language === 'ar';

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector("input[name=confirmPassword]");
    if (confirmPassword.value === password.value) {
      setPasswordsMatchState(true);
    } else {
      setPasswordsMatchState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    if (
      event.currentTarget.checkValidity() === true &&
      email &&
      password &&
      name &&
      lastName &&
      form.password.value === form.confirmPassword.value
    ) {
      setRegisterUserResponseState({ loading: true });
      registerUserApiRequest(name, lastName, email, password)
        .then((data) => {
          setRegisterUserResponseState({
            success: data.success,
            loading: false,
          });
          reduxDispatch(setReduxUserState(data.userCreated));
        })
        .catch((er) =>
          setRegisterUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };

  return (
    <>
    <MetaComponent title="Register" description="Register for an account" />
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-900/90 to-gray-900/90 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md bg-gray-900/90 rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2">{t.createAccount}</h2>
          <p className="text-gray-500">{t.enterDetails}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-1">
            {t.firstName}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                ${validated && !document.getElementById('name')?.value 
                  ? "border-red-500" 
                  : "border-gray-300"}`}
              placeholder={t.firstNamePlaceholder}
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-500 mb-1">
            {t.lastName}
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                ${validated && !document.getElementById('lastName')?.value 
                  ? "border-red-500" 
                  : "border-gray-300"}`}
              placeholder={t.lastNamePlaceholder}
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">
            {t.emailAdress}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                ${validated && !document.getElementById('email')?.value 
                  ? "border-red-500" 
                  : "border-gray-300"}`}
              placeholder={t.emailAdressPlaceholder}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-500 mb-1">
            {t.password}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                ${(!passwordsMatchState || (validated && !document.getElementById('password')?.value))
                  ? "border-red-500" 
                  : "border-gray-300"}`}
              placeholder={t.passwordPlaceholder}
            />
            <p className="text-sm text-gray-500 mt-1">{t.passwordRule}</p>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-500 mb-1">
            {t.confirmPassword}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                ${(!passwordsMatchState || (validated && !document.getElementById('confirmPassword')?.value))
                  ? "border-red-500" 
                  : "border-gray-300"}`}
              placeholder={t.confirmPasswordPlaceholder}
            />
          </div>

          {/* Error Messages */}
          {registerUserResponseState && registerUserResponseState.error === "user exists" && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
              {t.userExist}
            </div>
          )}

          {/* Success Message */}
          {registerUserResponseState && registerUserResponseState.success === "User created" && (
            <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm">
              {t.userCreated}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={registerUserResponseState.loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {registerUserResponseState.loading ? (
              <svg 
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : null}
            {t.submit}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            {t.hasAccount}{" "}
            <Link 
              to="/login" 
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {t.login}
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default RegisterPageComponent;