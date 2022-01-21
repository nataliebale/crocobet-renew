export type Platform = 'desktop' | 'mobile';

export interface ApiResponse {
  code: number; // TODO make typing strict
  data: any;
  description: string; // TODO make typing strict
}
