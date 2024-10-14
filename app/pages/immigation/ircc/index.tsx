import styles from './ircc.module.scss';
import { SearchSection } from './components/SearchSection';
import QrCode from '@/components/qr-code';

const IRCC = () => {
  return (
    <section className={styles.mainArea}>
      <div className="container">
        <h1>验证持牌加拿大移民顾问（RCIC）</h1>

        <div>
          <p>
            RCIC 是 Regulated Canadian Immigration Consultant 的缩写，中文意思是
            <b>持牌加拿大移民顾问</b>。它是加拿大移民、难民和公民部 (IRCC)
            认可的唯一可提供移民服务的移民专业人士。
            <br />
            在这里输入RCIC号，可以查询对应持牌顾问的详细信息，从而保护你的个人权益！
            信息来自于官网数据库。
          </p>
        </div>
        <div className="alert alert-danger" role="alert">
          ⚠️注意： 只有显示为“
          <strong>
            <u>Active</u>
          </strong>
          ” 状态的移民顾问并
          <strong>
            <u>和你本人签IMM5476文件</u>
          </strong>
          才可以被信任！
        </div>
      </div>

      <SearchSection />
      <div className="container mt-8">
        <h6>官网链接</h6>

        <div className="flex justify-between">
          <ul className="list-unstyled">
            <li>
              <a href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant?l=en-CA">
                Find an immigration consultant
              </a>
            </li>
            <li>
              <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/imm5476.html">
                Representative Form (IMM 5476)
              </a>
            </li>
            <li>
              <a href="https://secure-archive.college-ic.ca/default/search">
                Search form
              </a>
            </li>
          </ul>
          <QrCode />
        </div>
      </div>
    </section>
  );
};

export default IRCC;
