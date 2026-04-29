import type { Bus } from "../types/bus";

const BASE_URL = "https://civatrainee.onrender.com";

const USERNAME = "civa";
const PASSWORD = "civa";

const authHeader = "Basic " + btoa(`${USERNAME}:${PASSWORD}`);

interface PageResponse<Bus> {
  content: Bus[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  
}

export interface BusesPageData {
  buses: Bus[];
  totalPages: number;
  currentPage: number;
  totalElements: number;
}

export const getBuses = async (page: number = 0, size: number = 5): Promise<BusesPageData> => {
  const url =  `${BASE_URL}/bus?pagina=${page}&longitud=${size}`;
  const res = await fetch(url,{
    method :"GET",
    headers:{
      "Content-Type":"application/json",
      Authorization:authHeader
    }
  });
  if(!res.ok){
    const msg= await res.text();
    throw new Error(`Error ${res.status}: ${msg}`);
  }
  const data: PageResponse<Bus> = await res.json();
  return{
    buses: data.content,
    totalPages: data.totalPages,
    currentPage: data.number,
    totalElements: data.totalElements
  }};
  export const getBusById = async (id: number): Promise<Bus> => {
  const url = `${BASE_URL}/bus/${id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Bus no encontrado (${res.status}): ${msg}`);
  }

  return await res.json();
  /*
  try {
    const url = `${BASE_URL}/bus?pagina=${page}&longitud=${size}`;
    console.log("🌐 Fetching URL:", url);
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Error ${res.status}: ${msg}`);
    }

    const data: PageResponse<Bus> = await res.json();
    
    console.log("✅ API Response:", {
      page: data.number,
      size: data.size,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      busesInPage: data.content.length
    });
    
    return {
      buses: data.content,
      totalPages: data.totalPages,
      currentPage: data.number,
      totalElements: data.totalElements,
    };
  } catch (err) {
    console.error("❌ getBuses error:", err);
    throw err;
  }*/
};