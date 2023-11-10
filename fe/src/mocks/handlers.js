import { HttpResponse, http } from 'msw';
import pointHistory from './json/pointHistory.json';

// * test
export const handlers = [
  http.get('myPage/myPoint', () => {
    return HttpResponse.json(pointHistory);
  }),
  http.post('myPage/donationRegister', async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const title = formData.get('title');
    const comment = formData.get('comment');
    const goal = formData.get('goal');

    return HttpResponse.json({ name, title, comment, goal });
  }),
];
