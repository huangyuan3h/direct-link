import { Row, Button } from 'react-bootstrap';
import styles from './ircc.module.scss';
import { SearchSection } from './components/SearchSection';

const IRCC = () => {
  return (
    <section className={styles.mainArea}>
      <h3>验证加拿大持牌加拿大移民顾问</h3>

      <Row>
        <div className="col-md-8">
          <p>
            RCIC 是 Regulated Canadian Immigration Consultant 的缩写，中文意思是
            <b>持牌加拿大移民顾问</b>。它是加拿大移民、难民和公民部 (IRCC)
            认可的唯一可提供移民服务的移民专业人士。
            <br />
            在这里输入RCIC号，可以查询对应持牌顾问的详细信息，从而保护你的个人权益！
            信息来自于官网数据库。
            <br />
            <b>
              只有显示为“Active”
              状态的移民顾问并和你本人签IMM5476文件才可以被信任！
            </b>
          </p>
        </div>
      </Row>
      <SearchSection />
    </section>
  );
};

export default IRCC;
