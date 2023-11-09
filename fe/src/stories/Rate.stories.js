import Rate from '@components/Rate';

const meta = {
  title: 'Rate',
  component: Rate,
  args: {
    size: 8,
    rate: undefined,
  },
  argTypes: {
    size: {
      description: '아이콘의 크기 설정 integer ex: 8',
      control: {
        type: 'number',
      },
    },
    rate: {
      description: '별점을 설정하고자 한다면 빈칸, 설정된 별점 값이 있다면 0~4 사이의 값으로 전달',
      control: {
        type: 'number',
      },
    },
    required: false,
    updateScore: {
      description: '별점을 설정하고, 설정된 별점 값을 부모 컴포넌트에서 받아오고 싶다면 함수 전달',
      control: {
        type: 'function',
      },
    },
    required: false,
  },
};
export default meta;

const Template = (args) => <Rate {...args}></Rate>;
export const Primary = Template.bind({});
Primary.args = {
  size: 8,
  rate: 3,
};
