import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Department } from '../../shared/models/department.model';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const departments: Department[] = [
  {
    id: 1,
    name: 'Heart Care',
    description: 'Provides diagnosis and treatment for heart conditions and blood circulation issues.',
  },
  {
    id: 2,
    name: 'Children’s Health',
    description: 'Offers medical care and wellness services for newborns, kids, and teenagers.',
  },
  {
    id: 3,
    name: 'Bone & Joint Care',
    description: 'Treats injuries and disorders related to bones, joints, muscles, and ligaments.',
  },
  {
    id: 4,
    name: 'Brain & Nerve Care',
    description: 'Manages conditions affecting the brain, spine, and overall nervous system.',
  },
  {
    id: 5,
    name: 'Cancer Center',
    description: 'Provides screening, diagnosis, and treatment for different types of cancer.',
  },
  {
    id: 6,
    name: 'Skin Care Clinic',
    description: 'Offers treatment for skin, hair, and nail conditions and cosmetic concerns.',
  },
  {
    id: 7,
    name: 'Digestive Health',
    description: 'Treats issues related to the stomach, liver, intestines, and digestive system.',
  },
  {
    id: 8,
    name: 'Hormone & Diabetes Care',
    description: 'Helps manage hormone disorders, including diabetes and thyroid issues.',
  },
  {
    id: 9,
    name: 'Mental Wellness',
    description: 'Provides care for emotional, psychological, and behavioral health conditions.',
  },
  {
    id: 10,
    name: 'Kidney Health Clinic',
    description: 'Diagnoses and treats kidney diseases and related urinary system disorders.',
  }
]

    return { departments };
  }

  post(reqInfo: RequestInfo): Observable<ResponseOptions> | undefined {
    if (reqInfo.url.endsWith('/api/login')) {
      return this.handleLogin(reqInfo);
    }
    return undefined;
  }

  get(reqInfo: RequestInfo): Observable<ResponseOptions> | undefined {
    if (reqInfo.url.endsWith('/api/departments')) {
      return this.handleItems(reqInfo);
    }
    return undefined;
  }

  private handleLogin(reqInfo: RequestInfo): Observable<ResponseOptions> {
    const { email, password } = reqInfo.utils.getJsonBody(reqInfo.req) ?? {};

    if (password && String(password).trim() !== '') {
      const body = {
        token: 'fake-jwt-token-12345',
        user: { email },
      };
      const options: ResponseOptions = { status: STATUS.OK, body };
      return reqInfo.utils.createResponse$(() => options);
    }

    const options: ResponseOptions = {
      status: STATUS.UNAUTHORIZED,
      body: { error: 'Invalid credentials' },
    };
    return reqInfo.utils.createResponse$(() => options);
  }

  private handleItems(reqInfo: RequestInfo): Observable<ResponseOptions> {
    const req = reqInfo.req as Request;
    const authHeader = req.headers.get('Authorization');

    if (authHeader !== 'Bearer fake-jwt-token-12345') {
      const unauthorized: ResponseOptions = {
        status: STATUS.UNAUTHORIZED,
        body: { error: 'Missing or invalid token' },
      };
      return reqInfo.utils.createResponse$(() => unauthorized);
    }

    const db = reqInfo.utils.getDb() as { departments: Department[] };
    const departments = db?.departments ?? [];

    const options: ResponseOptions = {
      status: STATUS.OK,
      body: departments,
    };
    return reqInfo.utils.createResponse$(() => options);
  }
}
