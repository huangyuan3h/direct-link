export type PartnerType = {
  userName: string;
  thumbnailUrl: string;
  career: string;
  summary: string;
  personalAchievements: string;
  workExperience: string;
  professionalField: string;
};

export const mockData: PartnerType = {
  userName: '江海虹',
  thumbnailUrl: '/images/mock.png',
  career: '荣誉教授，博士生导师',
  summary:
    '江海虹是一位具有国际视野和丰富经验的学者和实践家，在多个领域做出了突出贡献。他是一位杰出的行业领袖，为推动全球纺织产业发展和促进国际贸易和文化交流做出了重要贡献。',
  workExperience:
    '* 长期在中国大陆、香港、英国、尼日利亚、美国和加拿大等国的政府机关、高等院校、研究咨询机构、大型跨国集团、中外资企业，以及自创企业任职。',
  personalAchievements: `* 在全球纺织经济发展模型和供应链管理、国别产业竞争力分析和区域经济发展战略研究等领域取得了丰硕成果。
* 为多家政府机构、企业和组织提供咨询服务，帮助他们制定和实施发展战略。
* 在国际学术期刊上发表论文多篇，并出版专著多部。
* 讲授多门课程，培养了众多优秀人才。`,
  professionalField: `
* 全球纺织经济发展模型和供应链管理
* 国别产业竞争力分析和区域经济发展战略研究
* WTO规则与“贸易救济措施”应对咨询
* 纺织品服装国际贸易实操
* 海外品牌中国化与中国品牌国际化项目运作
* 大数据时代贸易、零售与消费领域和时尚流行趋势预测项目开发
* 基于“设计思维”的创意产业设计管理和国际文化贸易等课程教学`,
};
