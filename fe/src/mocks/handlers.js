import { HttpResponse, http } from 'msw';
import people from './json/dummy.json';

// * test
export const handlers = [
  http.get('/people', () => {
    return HttpResponse.json(people);
  }),
];
