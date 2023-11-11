import { ReactComponent as Camera } from '@assets/camera.svg';
import { ReactComponent as DropDownArrow } from '@assets/dropDownArrow.svg';
import { ReactComponent as DropUpArrow } from '@assets/dropUpArrow.svg';
import { ReactComponent as Home } from '@assets/home.svg';
import { ReactComponent as LeftArrow } from '@assets/leftArrow.svg';
import { ReactComponent as Map } from '@assets/map.svg';
import { ReactComponent as Message } from '@assets/message.svg';
import { ReactComponent as Person } from '@assets/person.svg';
import { ReactComponent as Point } from '@assets/point.svg';
import { ReactComponent as Point2 } from '@assets/point2.svg';
import { ReactComponent as Review } from '@assets/review.svg';
import { ReactComponent as RightArrow } from '@assets/rightArrow.svg';
import { ReactComponent as Search } from '@assets/search.svg';
import { ReactComponent as Star } from '@assets/star.svg';
import { ReactComponent as Setting } from '@assets/setting.svg';
import { ICON_NAME } from '@constants/iconName';
import PropTypes from 'prop-types';

const ICONS = {
  [ICON_NAME.CAMERA]: Camera,
  [ICON_NAME.DROP_DOWN_ARROW]: DropDownArrow,
  [ICON_NAME.DROP_UP_ARROW]: DropUpArrow,
  [ICON_NAME.HOME]: Home,
  [ICON_NAME.LEFT_ARROW]: LeftArrow,
  [ICON_NAME.MAP]: Map,
  [ICON_NAME.MESSAGE]: Message,
  [ICON_NAME.PERSON]: Person,
  [ICON_NAME.POINT]: Point,
  [ICON_NAME.POINT2]: Point2,
  [ICON_NAME.REVIEW]: Review,
  [ICON_NAME.RIGHT_ARROW]: RightArrow,
  [ICON_NAME.SEARCH]: Search,
  [ICON_NAME.STAR]: Star,
  [ICON_NAME.SETTING]: Setting,
};

const Icon = ({ name, iconColor = 'black', ...rest }) => {
  const IconComponent = ICONS[name];

  if (IconComponent) return <IconComponent fill={iconColor} {...rest} />;

  return null;
};

export default Icon;

Icon.propTypes = {
  name: PropTypes.oneOf([
    'camera',
    'dropDownArrow',
    'dropUPArrow',
    'home',
    'leftArrow',
    'map',
    'message',
    'person',
    'point',
    'point2',
    'review',
    'rightArrow',
    'search',
    'star',
    'setting',
  ]).isRequired,
  iconColor: PropTypes.string,
};
