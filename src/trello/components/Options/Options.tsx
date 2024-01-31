import React, { useState, FunctionComponent } from 'react';
import {
  Container,
  MenuButton,
  CirclePickerContainer,
} from './Options.styles';
import { CirclePicker } from 'react-color';
import { Edit2 } from 'react-feather';
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';

interface IOptionsProps {
  handleBgColorChange: any;
  backgroundColor: string;
}

const Options: FunctionComponent<IOptionsProps> = ({
  handleBgColorChange,
  backgroundColor,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation(['home']);

  return (
    <Container>
      <MenuButton 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        data-tooltip-id={"style-select-btn-tooltip"}
        data-tooltip-content={t("lang_select")}>
        <Edit2></Edit2>
      </MenuButton>
      <CirclePickerContainer color={backgroundColor} display={sidebarOpen}>
        <CirclePicker
          onChangeComplete={color => {
            handleBgColorChange(color);
            setSidebarOpen(false);
          }}
        />
      </CirclePickerContainer>
      <Tooltip noArrow={true} place="bottom" id={"style-select-btn-tooltip"} />
    </Container>
  );
};

export default Options;
