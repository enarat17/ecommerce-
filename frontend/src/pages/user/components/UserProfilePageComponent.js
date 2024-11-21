import { useState, useEffect,useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";

const translations = {
  ar:{
    pageTitle:"تحديث الملف الشخصي",
    personalInformation:"معلومات شخصية",
    firstName:"الاسم الاول",
    lastName:"الاسم الاخير",
    email:"البريد الالكتروني",
    phoneNumber:"رقم الجوال",
    adressInformation:"معلومات العنوان",
    streetAdress:"عنوان الشارع",
    city:"المدينة",
    country:"البلد",
    zipCode:"الرمز البريدي",
    state:"الولاية",
    changePassword:"تغيير كلمة المرور",
    newPassword:"كلمة المرور الجديدة",
    confirmPassword:"تأكيد كلمة المرور",
    updateProfile:"تحديث الملف الشخصي",
    errMsg:"حدث خطأ ما",
    sucessMsg:"تم تحديث الملف الشخصي بنجاح",
  },
  en:{
    pageTitle:"Update Profile",
    personalInformation:"Personal Information",
    firstName:"First Name",
    lastName:"Last Name",
    email:"Email adress",
    phoneNumber:"Phone Number",
    adressInformation:"Adress Information",
    streetAdress:"Street Adress",
    city:"City",
    country:"Country",
    zipCode:"Zip Code",
    state:"State",
    changePassword:"Change Password",
    newPassword:"New Password",
    confirmPassword:"Confirm Password",
    updateProfile:"Update Profile",
    errMsg:"Something went wrong",
    sucessMsg:"Profile updated successfully",
  }
}

const UserProfilePageComponent = ({ updateUserApiRequest, fetchUser, userInfoFromRedux, setReduxUserState, reduxDispatch, localStorage, sessionStorage }) => {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({ success: "", error: "" });
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const [user, setUser] = useState({})
  const userInfo = userInfoFromRedux;
  const { language } = useContext(LanguageContext);
  const isRtl = language === 'ar';

  const t = translations[language];
  useEffect(() => {
    fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo._id])

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

    const name = form.name.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const country = form.country.value;
    const zipCode = form.zipCode.value;
    const city = form.city.value;
    const state = form.state.value;
    const password = form.password.value;

    if (event.currentTarget.checkValidity() === true && form.password.value === form.confirmPassword.value) {
      updateUserApiRequest(name, lastName, phoneNumber, address, country, zipCode, city, state, password).then(data => {
        setUpdateUserResponseState({ success: data.success, error: "" });
        reduxDispatch(setReduxUserState({ doNotLogout: userInfo.doNotLogout, ...data.userUpdated }));
        if (userInfo.doNotLogout) localStorage.setItem("userInfo", JSON.stringify({ doNotLogout: true, ...data.userUpdated }));
        else sessionStorage.setItem("userInfo", JSON.stringify({ doNotLogout: false, ...data.userUpdated }));
      })
        .catch((er) => setUpdateUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
    }

    setValidated(true);
  };

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r from-blue-900/90 to-gray-900/90" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-200 mb-8">{t.pageTitle}</h1>
          
          {/* Alert Messages */}
          {updateUserResponseState && updateUserResponseState.error !== "" && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {t.errMsg}
            </div>
          )}
          {updateUserResponseState && updateUserResponseState.success === "user updated" && (
            <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
              {t.sucessMsg}
            </div>
          )}

          <form noValidate className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.personalInformation}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.firstName}
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none
                      ${validated && !user.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {validated && !user.name && (
                    <p className="mt-1 text-sm text-red-500">{isRtl ? 'رجاء ادخل اسم':'please enter a name'}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.lastName}
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    defaultValue={user.lastName}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none
                      ${validated && !user.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {validated && !user.lastName && (
                    <p className="mt-1 text-sm text-red-500">{isRtl ? "رجاء ادخل اسم":"please enter a name"}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.email}
                </label>
                <input
                  disabled
                  value={user.email + "   if you want to change email, remove account and create new one with new email address"}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.phone}
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  defaultValue={user.phoneNumber}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.adressInformation}</h2>
              
              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.streetAddress}
                </label>
                <input
                  type="text"
                  name="address"
                  defaultValue={user.address}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.country}
                  </label>
                  <input
                    type="text"
                    name="country"
                    defaultValue={user.country}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.zipCode}
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    defaultValue={user.zipCode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.city}
                  </label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={user.city}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.state}
                  </label>
                  <input
                    type="text"
                    name="state"
                    defaultValue={user.state}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.changePassword}</h2>
              
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.newPassword}
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  minLength={6}
                  onChange={onChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none
                    ${!passwordsMatchState ? 'border-red-500' : 'border-gray-300'}`}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {isRtl ? 'يجب أن يكون الحد الأدنى 6 أحرف' : 'Minimum of 6 characters'}
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.confirmPassword}
                </label>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  minLength={6}
                  onChange={onChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none
                    ${!passwordsMatchState ? 'border-red-500' : 'border-gray-300'}`}
                />
                {!passwordsMatchState && (
                  <p className="mt-1 text-sm text-red-500">{isRtl ? "يجب ان تتطابق كلمتين المرور":"both passwords should match"}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                {t.updateProfile}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePageComponent;