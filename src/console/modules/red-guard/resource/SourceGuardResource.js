import { SourceGuardResource } from './'

export default {
  // websietList
  getWebsiteList: params =>
    SourceGuardResource.get('/V4/cloudsafe.hwws.domain.list', {
      params: {
        ...params
      }
    }),
  getWebsiteInfo: params =>
    SourceGuardResource.get('/V4/cloudsafe.hwws.domain.info', {
      params: {
        ...params
      }
    }),
  // console tab basic
  putCleanCache: params =>
    SourceGuardResource.put('V4/Web.Domain.DashBoard.saveCache', {
      ...params
    }),
  getWafConfig: (domainId, params) =>
    SourceGuardResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cloud_waf`,
      {
        ...params
      }
    ),
  putWafConfig: (domainId, params) =>
    SourceGuardResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cloud_waf`,
      {
        ...params
      }
    ),
  getWafRules: (domainId, params) =>
    SourceGuardResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cloud_waf.rules`,
      {
        ...params
      }
    ),
  putWafRules: (domainId, params, id) =>
    SourceGuardResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cloud_waf.rules.${id}`,
      {
        ...params
      }
    ),
  addWafRules: (domainId, params) =>
    SourceGuardResource.post(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cloud_waf.rules`,
      {
        ...params
      }
    ),
  delWafRules: (domainId, id) =>
    SourceGuardResource.delete(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cloud_waf.rules.${id}`,
      {}
    ),
  getAntiModify: domainId =>
    SourceGuardResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.anti_modify`,
      {}
    ),
  putAntiModify: (domainId, params) =>
    SourceGuardResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.anti_modify`,
      {
        ...params
      }
    ),
  getContentReplace: domainId =>
    SourceGuardResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.content_replace`,
      {}
    ),
  putContentReplace: (domainId, params) =>
    SourceGuardResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.content_replace`,
      {
        ...params
      }
    ),
  getSafeSnap: domainId =>
    SourceGuardResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.safe_snap`,
      {}
    ),
  putSafeSnap: (domainId, params) =>
    SourceGuardResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.safe_snap`,
      {
        ...params
      }
    ),
  //console tab pages
  getWafIntercept: domainId =>
    SourceGuardResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.waf_block_diy_page`,
      {}
    ),
  putWafIntercept: (domainId, params) =>
    SourceGuardResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.waf_block_diy_page`,
      {
        ...params
      }
    ),
  delWebsite: params =>
    SourceGuardResource.delete('/V4/cloudsafe.hwws.domain.del', {
      data: {
        ...params
      }
    }),
  getWebHoneyPot: domainId =>
    SourceGuardResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.web_honeypot`,
      {}
    ),
  getWebHoneyPotRules: domainId =>
    SourceGuardResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.web_honeypot.rules`,
      {}
    ),
  putWebHoneyPot: (domainId, params) =>
    SourceGuardResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.web_honeypot`,
      {
        ...params
      }
    ),
  putWebHoneyPotRules: (domainId, params, id) =>
    SourceGuardResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.web_honeypot.rules.${id}`,
      {
        ...params
      }
    ),
  postWebHoneyPotRules: (domainId, params) =>
    SourceGuardResource.post(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.web_honeypot.rules`,
      {
        ...params
      }
    ),
  delWebHoneyPotRules: (domainId, id) =>
    SourceGuardResource.delete(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.web_honeypot.rules.${id}`,
      {}
    ),
  getAttackTotal: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAttackTimesAndAttackNameTimes',
      {
        params: {
          ...params
        }
      }
    ),
  getAttackTrend: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAPTAttackLineDays',
      {}
    ),
  getAttackIp: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAttackIpTimes', {
      params: {
        ...params
      }
    }),
  getDefenseCount: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafWebSiteCount', {}),
  getWafAttackSite: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAttackSite', {}),
  getWafAttackLogs: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAttackLogs', {
      params: {
        ...params
      }
    }),
  getAttackIpTopFive: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAttackIpTop5', {
      params: {
        ...params
      }
    }),
  getAttackNameTopTen: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAttackNameTop10', {
      params: {
        ...params
      }
    }),
  getWafAttackLine: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAttackLine', {
      params: {
        ...params
      }
    }),
  getwafAttackLogDetail: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAttackLogDetail', {
      params: {
        ...params
      }
    }),
  getWafScanLogs: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafscanlogs', {
      params: {
        ...params
      }
    }),
  getWafScanDetails: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafscanlogsDetail', {
      params: {
        ...params
      }
    }),
  getWafAttackSeniorTimes: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAttackSeniorTimes', {
      params: {
        ...params
      }
    }),
  getwafAttackOrdinaryTimes: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAttackOrdinaryTimes',
      {
        params: {
          ...params
        }
      }
    ),
  getwafAPTIpAttackLink: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAPTIpAttackLink', {
      params: {
        ...params
      }
    }),
  getwafAPTIpList: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAPTIpList', {
      params: {
        ...params
      }
    }),
  wafAttackIpTopProvince: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAttackIpTopProvince',
      {
        params: {
          ...params
        }
      }
    ),
  getwafAttackIpTopCountry: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAttackIpTopCountry',
      {
        params: {
          ...params
        }
      }
    ),
  getwafAttackIpList: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAttackIpList', {
      params: {
        ...params
      }
    }),
  getwafAttackTactics: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAPTHackerPortraitAttackTactics',
      {
        params: {
          ...params
        }
      }
    ),
  getwafHackerAttackName: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAPTHackerPortraitAttackNameTop10',
      {
        params: {
          ...params
        }
      }
    ),
  getwafAPTFingerPrint: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAPTFingerPrint', {
      params: {
        ...params
      }
    }),
  getwafAPTAssociationAttackIP: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAPTFingerPrintAssociationAttackIP',
      {
        params: {
          ...params
        }
      }
    ),
  getwafAPTIpAssociationInfo: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAPTIpAssociationInfo',
      {
        params: {
          ...params
        }
      }
    ),
  getwafAPTVisitLine: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAPTVisitLine', {
      params: {
        ...params
      }
    }),
  getwafAPTAttackLine: params =>
    SourceGuardResource.get('/V4/Web.Domain.Report.Hwws.wafAPTAttackLine', {
      params: {
        ...params
      }
    }),
  queryDomainInfo: params =>
    SourceGuardResource.get('/V4/Web.Domain.Info', {
      params: {
        ...params
      }
    }),
  getwafAPTIpAssociationInfo: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAPTIpAssociationInfo',
      {
        params: {
          ...params
        }
      }
    ),
  getwafAPTFingerPrintAssociationAttackIP: params =>
    SourceGuardResource.get(
      '/V4/Web.Domain.Report.Hwws.wafAPTFingerPrintAssociationAttackIP',
      {
        params: {
          ...params
        }
      }
    )
}
