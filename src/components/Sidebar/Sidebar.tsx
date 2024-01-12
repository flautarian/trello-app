import React, { useState, FunctionComponent } from 'react';
import { Container } from './Sidebar.styles';
import { IBoard } from '../../models';

interface ISidebarProps {
    color: string;
    colorN: string;
    boards: IBoard[];
  }

const Sidebar: FunctionComponent<ISidebarProps> = ({color, colorN, boards}) => {

    const [boardList, setBoardList] = useState(boards);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    return (
        <Container color={color || ''} textColor={colorN || ''}>
            <button onClick={toggleSidebar}>Toggle Sidebar</button>
            {/* Your sidebar content here */}
        </Container>
    )
};

export default Sidebar;
