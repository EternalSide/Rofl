import { BADGE_CRITERIA } from "@/constants";
import React from "react";

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface Job {
  id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}

export interface Country {
  name: {
    common: string;
  };
}

export interface ParamsProps {
  params: { username: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface TagPageProps {
  params: { tagName: string };
  searchParams: { [key: string]: string | undefined };
}

export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

export interface ChappiProps {
  questionText: string;
  questionId: string;
}
