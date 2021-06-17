export interface User {
  email: string;
  password: string;
}

export interface AuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface News {
  id?: number;
  previewImage: string;
  title: string;
  shortDesc: string;
  content: string;
}

export interface Page {
  id?: number;
  name?: string;
  shortDesc?: string;
  content?: string;
  sectionId?: number;
  createTime?: Date;
  lastUpdateTime?: Date;
}

export interface Section {
  id?: number;
  title: string;
  pages: Page[];
}

export interface Document {
  id?: number;
  name: string;
  originName: string;
  descriptiveImage: string;
}

export interface SystemHealth {
  status: string;
  components: {
    db: {
      status: string;
      details: {
        database: string;
        hello: number;
      }
    },
    diskSpace: {
      status: string,
      details: {
        total: number,
        free: number | string,
        threshold: number
      }
    }
  };
}

export interface SystemCpu {
  status: string;
  description: string;
  baseUnit: string;
  measurements: [
    { statistic: string, value: number },
  ];
  availableTags: any[];
}

export interface ProcessUptime {
  name: string;
  baseUnit: string;
  measurements: [
    { statistic: string, value: number },
  ];
}
