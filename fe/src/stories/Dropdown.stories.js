import Dropdown from '@components/Dropdown';

const myFunc = () => {
  alert('전달될 거예요');
};

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  args: {
    updateSelect,
  },
  argTypes: {
    updateSelect: {
      description: '자식 컴포넌트에서 선택된 아이템 값을 받아오기 위해 함수 전달',
      control: {
        type: 'function',
      },
    },
  },
};
export default meta;

const Template = (args) => <Dropdown {...args}></Dropdown>;
export const Primary = Template.bind({});
Primary.args = {
  updateSelect: myFunc,
};
