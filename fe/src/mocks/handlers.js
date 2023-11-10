import { HttpResponse, http } from 'msw';
import reviewHome from './json/reviewHome.json';

// * test
export const handlers = [
  http.get('/review', ({ request }) => {
    return HttpResponse.json(reviewHome);
  }),
];
