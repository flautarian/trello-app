import React, { useState, FunctionComponent, useContext, useEffect } from 'react';
import {
  Container,
  Header,
  CloseButton,
  Title,
  AddCardButton,
  CardContainer,
} from './List.styles';
import CardComponent from '../Card/Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { IList, ICard } from '../../models';
import trelloCtx from '../../providers/TrelloContextProvider/TrelloContextProvider';
import { TrelloActionEnum } from '../../action/TrelloActions';
import { AnimationName } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent';

interface IListProps {
  list: IList;
  indexList: number;
}

const ListComponent: FunctionComponent<IListProps> = ({ list, indexList }) => {

  const [isEditingName, setEditingName] = useState(false);

  const { trelloState, updateState, currentBoardIndex } = useContext(trelloCtx);

  const [animation, setAnimation] = useState<AnimationName>("appear");



  const getItemStyle = (
    isdragging: boolean,
    draggableStyle: any,
  ) => ({
    background: 'white',
    padding: '0px',
    marginBottom: '5px',
    borderRadius: '5px',
    border: '1px solid rgb(178,185,197)',
    borderBottom: '2px solid rgb(178,185,197)',
    transform: 'rotate 45',
    ...draggableStyle,
  });

  const handleNameChange = (evt: any) => {
    const { value } = evt.target;
    updateState({
      type: TrelloActionEnum.EDIT_LIST,
      payload: {
        indexBoard: currentBoardIndex,
        indexList,
        editListValue: value
      }
    });
  };

  return (
    <Draggable key={currentBoardIndex + "-" + indexList} draggableId={`${indexList}`} index={indexList}>
      {(provided, snapshot) => (
        <Container
          $colorl={trelloState.colors.bgColorFromLsL}
          $isdragging={snapshot.isDragging ? 1 : 0}
          ref={provided.innerRef}
          $animation={animation}
          $xorigin='0%' 
          $yorigin='25%' 
          $xtarget='0%'
          $ytarget='0%'
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Header $colord={trelloState.colors.bgColorFromLsD} $isdragging={snapshot.isDragging ? 1 : 0}>
            {isEditingName ? (
              <input
                type="text"
                defaultValue={list.listTitle}
                onBlur={() => setEditingName(false)}
                onKeyPress={evt => {
                  if (evt.key === 'Enter') {
                    setEditingName(false);
                    handleNameChange(evt);
                  }
                }}
              />
            ) : (
              <Title onClick={() => setEditingName(true)}>
                {list.listTitle}
              </Title>
            )}
            <CloseButton
              onClick={() =>
                updateState({
                  type: TrelloActionEnum.REMOVE_LIST,
                  payload: {
                    indexBoard: currentBoardIndex,
                    indexList
                  },
                })
              }>
              &times;
            </CloseButton>
          </Header>
          <Droppable
            droppableId={`${indexList}`}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{minHeight: 70}}
                >
                {list.cards.map((card: ICard, cardIndex: number) => (
                  <Draggable
                    key={cardIndex}
                    index={cardIndex}
                    draggableId={`draggable-${indexList}-${cardIndex}`}>
                    {(provided, snapshot) => (
                      <CardContainer
                        $bgcolor={trelloState.colors.bgColorFromLs}
                        $bghovercolor={trelloState.colors.bgColorFromLsD}
                        onClick={() => {console.log("test");}}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        <CardComponent
                          key={cardIndex}
                          card={card}
                          indexCard={cardIndex}
                          indexList={indexList}
                        />
                      </CardContainer>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddCardButton
            onClick={evt =>
              updateState({
                type: TrelloActionEnum.ADD_CARD,
                payload: {
                  indexBoard: currentBoardIndex,
                  indexList,
                },
              })
            }
          >
            + Add a card
          </AddCardButton>
        </Container>
      )}
    </Draggable>
  );
};

export default ListComponent;
