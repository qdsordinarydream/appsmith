import { useSelector } from "react-redux";
import { getInstanceId } from "ee/selectors/organizationSelectors";
import {
  CUSTOMER_PORTAL_URL_WITH_PARAMS,
  PRICING_PAGE_URL,
} from "constants/ThirdPartyConstants";
import type { EventName } from "ee/utils/analyticsUtilTypes";
import AnalyticsUtil from "ee/utils/AnalyticsUtil";
import { getAppsmithConfigs } from "ee/configs";
import { pricingPageUrlSource } from "ee/utils/licenseHelpers";
import type {
  RampFeature,
  RampSection,
} from "utils/ProductRamps/RampsControlList";
import { useIsCloudBillingEnabled } from "hooks";
import { WORKSPACE_SETTINGS_LICENSE_PAGE_URL } from "constants/routes";

interface Props {
  logEventName?: EventName;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logEventData?: any;
  featureName?: RampFeature;
  sectionName?: RampSection;
  isEnterprise?: boolean;
}

const useOnUpgrade = (props: Props) => {
  const { logEventData, logEventName } = props;

  // 简化的onUpgrade函数，只记录事件但不执行任何跳转操作
  const onUpgrade = () => {
    // 只记录事件，不执行任何升级相关操作
    AnalyticsUtil.logEvent(
      logEventName || "ADMIN_SETTINGS_UPGRADE",
      logEventData,
    );
    // 不执行任何跳转或升级验证
  };

  return { onUpgrade };
};

export default useOnUpgrade;
