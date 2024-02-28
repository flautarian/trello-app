import React, { useState, FunctionComponent, useEffect, useRef } from 'react';
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

const OptionsComponent: FunctionComponent<IOptionsProps> = ({
  handleBgColorChange,
  backgroundColor,
}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { t } = useTranslation(['home']);

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!sidebarOpen)
        return;
      if (event.button == 0 && componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setSidebarOpen(!sidebarOpen);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <Container>
      <MenuButton
        onClick={() => setSidebarOpen(!sidebarOpen)}
        data-tooltip-id={"style-select-btn-tooltip"}
        data-tooltip-content={t("lang_select")}>
        <Edit2></Edit2>
      </MenuButton>
      <CirclePickerContainer color={backgroundColor} display={sidebarOpen ? 1 : 0} ref={componentRef}>
        <CirclePicker onChangeComplete={color => { handleBgColorChange(color) }} />
      </CirclePickerContainer>
      <Tooltip noArrow={true} place="bottom" id={"style-select-btn-tooltip"} hidden={sidebarOpen} />
    </Container>
  );
};

export default OptionsComponent;
