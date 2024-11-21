import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import MetaComponent from "../../components/MetaComponent";

const translations = {
  en: {
    welcomeBack: "Welcome Back",
    enterCredentials: "Enter your credentials to access your account",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    keepSignedIn: "Keep me signed in",
    signIn: "Sign In",
    noAccount: "Don't have an account?",
    createAccount: "Create one now",
    invalidCredentials: "Invalid email or password. Please try again."
  },
  ar: {
    welcomeBack: "مرحباً بعودتك",
    enterCredentials: "أدخل بيانات اعتماد للوصول إلى حسابك",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "name@example.com",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور",
    keepSignedIn: "البقاء متصلاً",
    signIn: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    createAccount: "أنشئ حساباً الآن",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى."
  }
};

const LoginPageComponent = ({ loginUserApiRequest,reduxDispatch, setReduxUserState  }) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t= translations[language];
  const isRTL = language === 'ar';
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
        setLoginUserResponseState({ loading: true });
      loginUserApiRequest(email, password, doNotLogout)
        .then((res) => {
            setLoginUserResponseState({ success: res.success, loading: false, error: "" });

            if (res.userLoggedIn) {
                reduxDispatch(setReduxUserState(res.userLoggedIn));
            }

            if (res.success === "user logged in" && !res.userLoggedIn.isAdmin) window.location.assign('/user') 
            else window.location.assign('/admin/orders')

        })
        .catch((er) =>
          setLoginUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data })
        );
    }

    setValidated(true);
  };
  
  return (
    <>
      <MetaComponent title={isRTL ? 'تسجيل الدخول' : 'Login'} />
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-900/90 to-gray-900/90 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md bg-gray-900/90 rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2">{t.welcomeBack}</h2>
          <p className="text-gray-500">{t.enterCredentials}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">
              {t.emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                ${validated && !document.getElementById('email').value 
                  ? "border-red-500" 
                  : "border-gray-300"}`}
              placeholder={t.emailPlaceholder}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-500 mb-1">
              {t.passwordLabel}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                ${validated && !document.getElementById('password').value 
                  ? "border-red-500" 
                  : "border-gray-300"}`}
              placeholder={t.passwordPlaceholder}
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="doNotLogout"
              name="doNotLogout"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="doNotLogout" className={`block text-sm text-gray-500 cursor-pointer ${isRTL ? 'mr-2' : 'ml-2'}`}>
              {t.keepSignedIn}
            </label>
          </div>

          {/* Error Message */}
          {loginUserResponseState && loginUserResponseState.error === "wrong credentials" && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
              {t.invalidCredentials}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loginUserResponseState.loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loginUserResponseState.loading ? (
              <svg 
                className={`animate-spin h-5 w-5 text-white ${isRTL ? 'ml-3 -mr-1' : '-ml-1 mr-3'}`}
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
            {t.signIn}
          </button>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600">
            {t.noAccount}{" "}
            <Link 
              to="/register" 
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {t.createAccount}
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};
export default LoginPageComponent;
