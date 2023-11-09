import Button from '@common/Button';
import { BUTTON_NAME } from '@constants/buttonName';
import { PATH } from '@constants/path';

const myFunc = () => {
  alert('hi');
};

const meta = {
  title: 'Button',
  component: Button,
  args: {
    text: BUTTON_NAME.HOME,
    path: PATH.HOME,
    eventName: myFunc,
  },
  argTypes: {
    text: {
      description: '버튼에 적용하고 싶은 텍스트 (BUTTON_NAME 상수 ex: BUTTON_NAME.HOME',
      control: {
        type: 'text',
      },
    },
    path: {
      description: '버튼 클릭 시 넘어가려는 페이지 (PATH 상수 ex: PATH.HOME',
      control: {
        type: 'text',
      },
    },
    eventName: {
      description: '버튼 클릭 시 실행되는 함수 (함수 상수 ex: eventName = {myFunc} ',
      control: {
        type: 'function',
      },
      required: false, // eventName은 선택
    },
  },
};
export default meta;
const Template = (args) => <Button {...args}></Button>;
export const Primary = Template.bind({});
Primary.args = {
  text: BUTTON_NAME.HOME,
  path: PATH.HOME,
};
