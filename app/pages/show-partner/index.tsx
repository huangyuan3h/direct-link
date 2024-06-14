import { mockData } from './mockData';
import styles from './show-partner.module.scss';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { Envelope, Wechat } from 'react-bootstrap-icons';

export const ShowPartner: React.FC = () => {
  const {
    userName,
    thumbnailUrl,
    career,
    summary,
    personalAchievements,
    workExperience,
    professionalField,
  } = mockData;
  return (
    <section className={styles.mainArea}>
      <div className="row">
        <div className="col-md-8">
          <div className="flex">
            <div className={styles.thumbnail}>
              <Image
                src={thumbnailUrl}
                width={200}
                height={200}
                loading="lazy"
                alt="Picture of the author"
                className="border border-4 rounded-circle"
              />
            </div>
            <div className={styles.userMain}>
              <p className="h2">{userName}</p>
              <p className="h6">{career}</p>
              <p>
                <em>{summary}</em>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mt-4 ml-8 flex flex-col">
            <div className="flex items-center">
              <Envelope />
              <div className="ml-2">xxx@xx.com</div>
            </div>
            <div className="flex items-center">
              <Wechat />
              <div className="ml-2">xxx@xx.com</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 row">
        <div className="col-12">
          <p className="h4">个人成就</p>
          <Markdown>{personalAchievements}</Markdown>
        </div>
      </div>
      <div className="p-4 row">
        <div className="col-12">
          <p className="h4">工作经历</p>
          <Markdown>{workExperience}</Markdown>
        </div>
      </div>
      <div className="p-4 row">
        <div className="col-12">
          <p className="h4">专业领域</p>
          <Markdown>{professionalField}</Markdown>
        </div>
      </div>
    </section>
  );
};
