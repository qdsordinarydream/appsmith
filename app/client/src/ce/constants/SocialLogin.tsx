import {
  DingTalkOAuthURL,
  GithubOAuthURL,
  GoogleOAuthURL,
} from "ee/constants/ApiConstants";

import GithubLogo from "assets/images/Github.png";
import GoogleLogo from "assets/images/Google.png";
import DingtalkLogo from "assets/images/Dingtalk.jpeg";

export interface SocialLoginButtonProps {
  url: string;
  name: string;
  logo: string;
  label?: string;
}

export const GoogleSocialLoginButtonProps: SocialLoginButtonProps = {
  url: GoogleOAuthURL,
  name: "Google",
  logo: GoogleLogo,
};

export const DingTalkSocialLoginButtonProps: SocialLoginButtonProps = {
  url: DingTalkOAuthURL,
  name: "DingTalk",
  logo: DingtalkLogo,
};

export const GithubSocialLoginButtonProps: SocialLoginButtonProps = {
  url: GithubOAuthURL,
  name: "Github",
  logo: GithubLogo,
};

export const SocialLoginButtonPropsList: Record<
  string,
  SocialLoginButtonProps
> = {
  google: GoogleSocialLoginButtonProps,
  github: GithubSocialLoginButtonProps,
  dingtalk: DingTalkSocialLoginButtonProps,
};

export type SocialLoginType = keyof typeof SocialLoginButtonPropsList;