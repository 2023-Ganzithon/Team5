import Icon from '@common/Icon';
import { ICON_NAME } from '@constants/iconName';

// const options = Object.values(ICON_NAME);

const meta = {
  title: 'Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: ICON_NAME.CAMERA,
    iconColor: 'red',
  },
  argTypes: {
    name: {
      description: 'ICON_NAME 상수로 설정 (ex: ICON_NAME.CAMERA)',
      control: {
        type: 'select',
      },
    },
    iconColor: {
      description: 'Icon 색깔',
      control: 'color',
    },
    width: {
      description: 'width를 설정하지 않으면 svg 파일의 기존 width로 적용 (선택)',
      control: 'number',
    },
    height: {
      description: 'height를 설정하지 않으면 svg 파일의 기존 height로 적용 (선택)',
      control: 'number',
    },
  },
};

export default meta;

const Template = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: ICON_NAME.CAMERA,
};
