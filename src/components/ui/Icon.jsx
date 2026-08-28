import GlobeIcon from '../../assets/icons/globe.svg?react';
import ChevronDownIcon from '../../assets/icons/chevron-down.svg?react';
import CloseIcon from '../../assets/icons/close.svg?react';
import SalesGrowthIcon from '../../assets/icons/sales-growth.svg?react';
import CheckCircleIcon from '../../assets/icons/check-circle.svg?react';
import PlayIcon from '../../assets/icons/play.svg?react';
import EbayIcon from '../../assets/icons/marketplace-ebay.svg?react';
import AmazonIcon from '../../assets/icons/marketplace-amazon.svg?react';
import AiSparkleIcon from '../../assets/icons/ai-sparkle.svg?react';
import VerifiedBadgeIcon from '../../assets/icons/verified-badge.svg?react';
import CommunityPeopleIcon from '../../assets/icons/community-people.svg?react';
import HandshakeIcon from '../../assets/icons/handshake.svg?react';
import BriefcaseIcon from '../../assets/icons/briefcase.svg?react';
import DeliveryScooterIcon from '../../assets/icons/delivery-scooter.svg?react';
import HomeIcon from '../../assets/icons/home.svg?react';
import LaptopCodeIcon from '../../assets/icons/laptop-code.svg?react';
import GraduationCapIcon from '../../assets/icons/graduation-cap.svg?react';
import SeedlingIcon from '../../assets/icons/seedling.svg?react';
import ChatBubbleIcon from '../../assets/icons/chat-bubble.svg?react';
import StarIcon from '../../assets/icons/star.svg?react';
import RobotIcon from '../../assets/icons/robot.svg?react';
import MagnifierIcon from '../../assets/icons/magnifier.svg?react';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg?react';
import CheckIcon from '../../assets/icons/check.svg?react';
import HeadsetIcon from '../../assets/icons/headset.svg?react';
import VideoCameraIcon from '../../assets/icons/video-camera.svg?react';
import OpenBookIcon from '../../assets/icons/open-book.svg?react';
import ShieldIcon from '../../assets/icons/shield.svg?react';
import DiscordIcon from '../../assets/icons/social-discord.svg?react';
import YoutubeIcon from '../../assets/icons/social-youtube.svg?react';
import FacebookIcon from '../../assets/icons/social-facebook.svg?react';
import PhoneIcon from '../../assets/icons/phone.svg?react';
import MailIcon from '../../assets/icons/mail.svg?react';
import MapPinIcon from '../../assets/icons/map-pin.svg?react';

/**
 * The site's icon set, from the brand's own SVGs.
 *
 * Every source file is authored with `fill="currentColor"`, so icons inherit
 * the text colour of whatever they sit in — which is what lets the same file
 * work on the paper bands and the ink bands without a second copy.
 *
 * Inlined as components rather than <img> for exactly that reason, and because
 * 34 separate icon requests would cost more than the bytes they save.
 */
const ICONS = {
  globe: GlobeIcon,
  chevronDown: ChevronDownIcon,
  close: CloseIcon,
  salesGrowth: SalesGrowthIcon,
  checkCircle: CheckCircleIcon,
  play: PlayIcon,
  ebay: EbayIcon,
  amazon: AmazonIcon,
  aiSparkle: AiSparkleIcon,
  verified: VerifiedBadgeIcon,
  people: CommunityPeopleIcon,
  handshake: HandshakeIcon,
  briefcase: BriefcaseIcon,
  scooter: DeliveryScooterIcon,
  home: HomeIcon,
  laptopCode: LaptopCodeIcon,
  graduationCap: GraduationCapIcon,
  seedling: SeedlingIcon,
  chat: ChatBubbleIcon,
  star: StarIcon,
  robot: RobotIcon,
  magnifier: MagnifierIcon,
  arrowRight: ArrowRightIcon,
  check: CheckIcon,
  headset: HeadsetIcon,
  videoCamera: VideoCameraIcon,
  openBook: OpenBookIcon,
  shield: ShieldIcon,
  discord: DiscordIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  phone: PhoneIcon,
  mail: MailIcon,
  mapPin: MapPinIcon,
};

/**
 * @param {object} props
 * @param {keyof typeof ICONS} props.name
 * @param {string} [props.label] Accessible name. Omit for decorative icons,
 *   which are then hidden from assistive tech.
 */
export default function Icon({ name, label, className = 'size-4', ...rest }) {
  const Glyph = ICONS[name];

  if (!Glyph) {
    // Loud in development, silent in production rather than crashing a section.
    if (import.meta.env.DEV) console.warn(`[Icon] unknown icon: "${name}"`);
    return null;
  }

  return (
    <Glyph
      className={className}
      // The source files hard-code height/width="1em"; the class controls size.
      height={undefined}
      width={undefined}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true', focusable: 'false' })}
      {...rest}
    />
  );
}
