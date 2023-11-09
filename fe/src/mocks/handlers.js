import { HttpResponse, http } from 'msw';
import pointHistory from './json/pointHistory.json';

// * test
export const handlers = [
  http.get('myPage/myPoint', () => {
    return HttpResponse.json(pointHistory);
  }),
];
