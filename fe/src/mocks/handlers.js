import { HttpResponse, http } from 'msw';
import home from './json/home.json';

// * test
export const handlers = [
  http.get('/', ({ request }) => {
    return HttpResponse.json(home);
  }),
];
