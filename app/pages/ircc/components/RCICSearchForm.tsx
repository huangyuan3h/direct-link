'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';

export interface RCICSearchFormProps {
  onSubmit: (rcic: string) => void;
}

export const RCICSearchForm: React.FC<RCICSearchFormProps> = ({ onSubmit }) => {
  const [rcicId, setRcicId] = useState('');

  const handleRcicIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setRcicId(e.target.value);
  };

  const handleClickSearch = () => {
    onSubmit(rcicId);
  };

  return (
    <div className="form-group">
      <label>RCIC 编号</label>
      <input
        type="rcic"
        className="form-control"
        aria-describedby="RCICHelp"
        placeholder="例如：R534829"
        value={rcicId}
        onChange={handleRcicIdChange}
        maxLength={7}
      />
      <small id="RCICHelp" className="form-text text-muted">
        RCIC 是一个持牌移民顾问的唯一编号，一般以R开头的6位数字，
        例如：R534829，R421239（这是一个反例）
      </small>
      <div className="pt-4 flex flex-row-reverse">
        <Button variant="primary" onClick={handleClickSearch}>
          开始验证
        </Button>
      </div>
    </div>
  );
};
