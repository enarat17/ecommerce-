import axios from "axios";
import { Member } from "@/components/types/MembersTableColumns";

const siteName = process.env.NEXT_PUBLIC_DEVELOPMENT_SITE;
//landing-page

interface Service {
  _id: string;
  title_AR: string;
  title_EN: string;
  description_AR: string;
  description_EN: string;
  icon: string;
}
export interface LandingPageData {
  intro_AR: string;
  intro_EN: string;
  coverImage: File;
}
export const fetchLandingPageData = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/landingContent`, {
      withCredentials: true,
    });
    return response.data.data.data[0];
  } catch (error) {
    throw error;
  }
};

export const updateLandingPageData = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/landingContent/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//about us

interface aboutUsData {
  aboutUs_AR: string;
  aboutUs_EN: string;
  ourVision_AR: string;
  ourVision_EN: string;
  messege_AR: string;
  messege_EN: string;
  goals_AR: string;
  goals_EN: string;
  coverImage: File;
}

interface updateAboutUsData {
  id: string;
  data: FormData;
}
export const fetchAboutUsInfo = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/aboutUs`, {
      withCredentials: true,
    });
    return response.data.data.data[0];
  } catch (error) {
    throw error;
  }
};

export const updateAboutUsInfo = async ({ id, data }: updateAboutUsData) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/aboutUs/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//privacy policy

interface privacyPolicyData {
  description_AR: string;
  description_EN: string;
  coverImage: File;
}

interface updatePrivacyPolicyData {
  id: string;
  data: FormData;
}

export const fetchPrivacyPolicyInfo = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/privacyPolicy`, {
      withCredentials: true,
    });
    return response.data.data.data[0];
  } catch (error) {
    throw error;
  }
};

export const updatePrivacyPolicyInfo = async ({
  id,
  data,
}: updatePrivacyPolicyData) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/privacyPolicy/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//terms and conditions

interface termsAndConditionsData {
  description_AR: string;
  description_EN: string;
  coverImage: File;
}

interface upadateTermsAndConditionsData {
  id: string;
  data: FormData;
}

export const fetchTermsAndConditionsInfo = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/termsAndConditions`, {
      withCredentials: true,
    });
    return response.data.data.data[0];
  } catch (error) {
    throw error;
  }
};

export const updateTermsAndConditionsInfo = async ({
  id,
  data,
}: upadateTermsAndConditionsData) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/termsAndConditions/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//team requests

export const fetchTeamMembers = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/members`, {
      withCredentials: true,
    });
    return response.data.data.data[0];
  } catch (error) {
    throw error;
  }
};

export const addNewTeamMember = async (data: FormData) => {
  try {
    const response = await axios.post(`${siteName}/api/v1/members`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTeamMember = async ({
  data,
  id,
}: {
  data: FormData;
  id: string;
}) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/members/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTeamMember = async (id: string) => {
  try {
    const response = await axios.delete(`${siteName}/api/v1/members/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOneMember = async (id: string) => {
  try {
    const response = await axios.get(`${siteName}/api/v1/members/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateMembersImage = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/members/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//clients
interface Client {
  name_AR: string;
  name_EN: string;
  clientImage: File;
}

interface updateClientsData {
  id: string;
  data: FormData;
}
export const fetchClients = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/clients`, {
      withCredentials: true,
    });
    return response.data.data.data[0];
  } catch (error) {
    throw error;
  }
};

export const fetchOneClient = async (id: string) => {
  try {
    const response = await axios.get(`${siteName}/api/v1/clients/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateClient = async ({ id, data }: updateClientsData) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/clients/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const AddClient = async (data: FormData) => {
  try {
    const response = await axios.post(`${siteName}/api/v1/clients`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateClientsImage = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/clients/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// header images
interface headerImages {
  HR_Store: File;
  Financial_Store: File;
  storePage: File;
  loggingPage: File;
  blogsPage: File;
  businessServices: File;
  accountingServices: File;
  auditingServices: File;
  financialServices: File;
  HrServices: File;
  servicesPage: File;
}
export const fetchHeaderImages = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/headerImages`);
    return response.data.data.data[0];
  } catch (error) {
    throw error;
  }
};

export const updateHeaderImages = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/headerImages/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//dashborad analysis

export const fetchAnalysis = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/content/analysis`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//conact us requests

export const fetchContactUs = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/contacts`);
    return response.data.data.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateContactUs = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/contacts/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateContactUsImage = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/contacts/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


// emails 
export const fetchAdminEmails = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/admin-emails`);
    return response.data.data.data;
  } catch (error) {
    console.log(error);
  }
};


export const updateAdminEmails = async (emailsData:any) => {
  try {
    const response = await axios.patch(
      `${siteName}/api/v1/admin-emails`,
      emailsData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};