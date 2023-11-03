import Button from '@common/Button';

const meta = {
  title: 'Button',
  component: Button,
};

export default meta;

const Template = (args) => <Button {...args} />;
export const Primary = Template.bind({});
