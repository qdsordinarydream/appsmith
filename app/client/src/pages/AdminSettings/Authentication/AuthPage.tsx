import React from "react";
import { useHistory } from "react-router-dom";
import { SettingCategories } from "ee/pages/AdminSettings/config/types";
import styled from "styled-components";
import {
  ENABLE,
  ADMIN_AUTH_SETTINGS_SUBTITLE,
  ADMIN_AUTH_SETTINGS_TITLE,
  createMessage,
  EDIT,
  AUTHENTICATION_METHOD_ENABLED,
} from "ee/constants/messages";
import { Button, Callout, Divider, Icon, Text, Tooltip } from "@appsmith/ads";
import { adminSettingsCategoryUrl } from "ee/RouteBuilder";
import AnalyticsUtil from "ee/utils/AnalyticsUtil";

export const Wrapper = styled.div`
  flex-basis: calc(100% - ${(props) => props.theme.homePage.leftPane.width}px);
  padding: var(--ads-v2-spaces-7);
  height: calc(100vh - ${(props) => props.theme.homePage.header}px);
  overflow: auto;
`;

export const SettingsFormWrapper = styled.div`
  max-width: 40rem;
`;

export const SettingsHeader = styled(Text)``;

export const SettingsSubHeader = styled(Text)`
  margin-bottom: 24px;
`;

const MethodCard = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0 0;

  > .ads-v2-icon {
    margin-right: 8px;
    object-fit: cover;
    border-radius: 50%;
    padding: 5px;
    align-self: baseline;
  }
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  object-fit: cover;
  border-radius: 50%;
  padding: 5px;
  align-self: baseline;
`;

const MethodDetailsWrapper = styled.div`
  color: var(--ads-v2-color-fg-muted);
  width: 492px;
  margin-right: 60px;
`;

const MethodTitle = styled(Text)`
  display: flex;
  align-items: center;
  margin: 0 0 4px;
  color: var(--ads-v2-color-fg);
  gap: var(--ads-v2-spaces-2);

  svg {
    cursor: pointer;
  }
`;

const MethodDets = styled(Text)``;

export interface banner {
  actionLabel: string;
  title: string;
}

export interface AuthMethodType {
  id: string;
  category?: string;
  label: string;
  subText?: string;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  isConnected?: boolean;
  calloutBanner?: banner;
  icon?: string;
  // 修改isFeatureEnabled的类型，使其始终返回true
  isFeatureEnabled: boolean | true;
}

const ButtonWrapper = styled.div`
  min-width: 100px;
  text-align: right;
`;

export function ActionButton({ method }: { method: AuthMethodType }) {
  const history = useHistory();
  // 不使用onUpgrade，直接使用点击处理函数，忽略isFeatureEnabled属性
  
  const onClickHandler = (method: AuthMethodType) => {
    AnalyticsUtil.logEvent(
      method.isConnected
        ? "ADMIN_SETTINGS_EDIT_AUTH_METHOD"
        : "ADMIN_SETTINGS_ENABLE_AUTH_METHOD",
      {
        method: method.label,
      },
    );
    history.push(
      adminSettingsCategoryUrl({
        category: SettingCategories.AUTHENTICATION,
        selected: method.category,
      }),
    );
  };

  return (
    <ButtonWrapper>
      <Button
        className={`t--settings-sub-category-${method.category}`}
        data-testid="btn-auth-account"
        kind={"secondary"}
        onClick={() => onClickHandler(method)}
        size="md"
      >
        {createMessage(
          method.isConnected
            ? EDIT
            : ENABLE
        )}
      </Button>
    </ButtonWrapper>
  );
}

export function AuthPage({ authMethods }: { authMethods: AuthMethodType[] }) {
  // 确保所有认证方法的isFeatureEnabled属性都为true
  const processedAuthMethods = authMethods.map(method => ({
    ...method,
    isFeatureEnabled: true,
  }));
  
  return (
    <Wrapper>
      <SettingsFormWrapper>
        <SettingsHeader
          color="var(--ads-v2-color-fg-emphasis-plus)"
          kind="heading-l"
          renderAs="h1"
        >
          {createMessage(ADMIN_AUTH_SETTINGS_TITLE)}
        </SettingsHeader>
        <SettingsSubHeader
          color="var(--ads-v2-color-fg-emphasis)"
          kind="body-m"
          renderAs="h2"
        >
          {createMessage(ADMIN_AUTH_SETTINGS_SUBTITLE)}
        </SettingsSubHeader>
        {processedAuthMethods &&
          processedAuthMethods.map((method) => {
            return (
              <div key={method.id}>
                <MethodCard>
                  {method.icon ? (
                    <Icon name={method.icon} size="lg" />
                  ) : (
                    <Image alt={method.label} src={method.image} />
                  )}
                  <MethodDetailsWrapper>
                    <MethodTitle
                      color="var(--ads-v2-color-fg)"
                      kind="heading-s"
                      renderAs="p"
                    >
                      {method.label}&nbsp;
                      {/* 不再显示EnterpriseTag，无论isFeatureEnabled的值如何 */}
                      {method.isConnected && (
                        <Tooltip
                          content={createMessage(
                            AUTHENTICATION_METHOD_ENABLED,
                            method.label,
                          )}
                          placement="right"
                        >
                          <Icon
                            className={`${method.category}-green-check`}
                            color="var(--ads-v2-color-fg-success)"
                            name="oval-check-fill"
                            size="md"
                          />
                        </Tooltip>
                      )}
                    </MethodTitle>
                    <MethodDets
                      color="var(--ads-v2-color-fg)"
                      kind="body-s"
                      renderAs="p"
                    >
                      {method.subText}
                    </MethodDets>
                    {method.calloutBanner && (
                      <Callout
                        kind="info"
                        links={[
                          {
                            children: method.calloutBanner.actionLabel,
                            to: "",
                          },
                        ]}
                      >
                        {method.calloutBanner.title}
                      </Callout>
                    )}
                  </MethodDetailsWrapper>
                  <ActionButton method={method} />
                </MethodCard>
                <Divider />
              </div>
            );
          })}
      </SettingsFormWrapper>
    </Wrapper>
  );
}
