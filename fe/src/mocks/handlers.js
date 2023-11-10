import { HttpResponse, http } from 'msw';
// * test
export const handlers = [
  http.post('myPage/donationRegister', async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title');
    const body = formData.get('body');
    const shoppingmall = formData.get('shoppingmall');
    const star = formData.get('star');

    return HttpResponse.json({ title, body, shoppingmall, star });
  }),
];
