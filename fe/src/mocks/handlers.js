import { HttpResponse, http } from 'msw';
import reviewDetail from './json/reviewDetail.json';

// * test
export const handlers = [
  http.get(`/review/1/`, ({ request }) => {
    return HttpResponse.json(reviewDetail);
  }),
];
