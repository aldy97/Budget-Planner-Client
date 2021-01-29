import React from "react";
import { Progress, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface ProgressBarProps {
  threshold: number;
  changeThreshold: React.Dispatch<React.SetStateAction<number>>;
}

function ProgressBar({ threshold, changeThreshold }: ProgressBarProps): JSX.Element {
  const handlePlusBtnClick = (): void => {
    changeThreshold(threshold + 10 > 100 ? 100 : threshold + 10);
  };
  const handleMinusBtnClick = (): void => {
    changeThreshold(threshold - 10 < 0 ? 0 : threshold - 10);
  };
  return (
    <>
      <Progress percent={threshold} data-test='bar' />
      <Button.Group>
        <Button onClick={handleMinusBtnClick} icon={<MinusOutlined />} />
        <Button onClick={handlePlusBtnClick} icon={<PlusOutlined />} />
      </Button.Group>
    </>
  );
}

export default ProgressBar;
