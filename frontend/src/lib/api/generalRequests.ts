// "use server";

import axios from "axios";
import { Inquiry } from "../types/inquiry";

const siteName = process.env.NEXT_PUBLIC_DEVELOPMENT_SITE;

//landing page content
export const fetchLandingPageData = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/content/landingPage`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLandingPageContent = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/landingContent`);
    return response.data.data.data[0];
  } catch (error) {
    throw error;
  }
};
//about-us
export const fetchAboutUsInfo = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/aboutUs`);
    return response.data.data.data[0];
  } catch (error) {
    throw error;
  }
};

//contact-us

export const fetchContactUsInfo = async () => {
  try {
    const response = await axios.get(`${siteName}/api/v1/contacts`);
    return response.data.data.data[0];
  } catch (error) {
    throw error;
  }
};

//contact-us and join-us request
export const postInquiry = async (inquiry: FormData) => {
  try {
    const response = await axios.post(
      `${siteName}/api/v1/contacts/contact_us`,
      inquiry
    );
    return response;
  } catch (error) {
    throw error;
  }
};
