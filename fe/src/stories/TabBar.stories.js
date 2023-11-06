import TabBar from '@common/TabBar';
import { TAB_NAME } from '@constants/tabName';

const meta = {
  title: 'TabBar',
  component: TabBar,
  tags: ['autodocs'],
  args: {
    currentTab: TAB_NAME.HOME,
  },
  argTypes: {
    currentTab: {
      description: '현재 페이지에 해당하는 Tab (TAB_NAME 상수로 설정 ex: TAB_NAME.HOME)',
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

const Template = (args) => <TabBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentTab: TAB_NAME.HOME,
};
