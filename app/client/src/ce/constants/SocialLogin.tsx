import { GithubOAuthURL } from "ee/constants/ApiConstants";

import GithubLogo from "assets/images/Github.png";
import GoogleLogo from "assets/images/Google.png";
export interface SocialLoginButtonProps {
  url: string;
  name: string;
  logo: string;
  label?: string;
}

// todo 这里还需要修改参数
export const GoogleSocialLoginButtonProps: SocialLoginButtonProps = {
  url: "/api/v1/oauth/dingtalk/authorize", // 直接跳转到钉钉授权端点
  name: "DingDing",
  logo: GoogleLogo,
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
};

export type SocialLoginType = keyof typeof SocialLoginButtonPropsList;
