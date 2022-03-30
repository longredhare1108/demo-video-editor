import React, { useState } from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import {
    Typography,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { RenderVideo } from '../../state/feature/render-video/render-video';

import Audio_BGM from '../../assets/audio/Audio_BGM.m4a';
import Red_Music from '../../assets/audio/Red_Music.m4a';
import Buddha_Music from '../../assets/audio/Buddha_Music.m4a';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
    console.log('==> dest', destination);

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const Content = styled.div`
    margin-left: 200px;
    position: relative;
    top: 35vh;
`;

//item in template
const Item = styled.div`
    display: flex;
    user-select: none;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: '#fff';
    border: 5px ${(props) => (props.isDragging ? ' #4099ff' : 'solid #ddd')};
    &:hover {
        border-radius: 3232px;
    }
`;

const Clone = styled(Item)`
    + div {
        display: none !important;
    }
`;

//item in drop box
const Handle = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    user-select: none;
    margin: -0.5rem -0.5rem -0.5rem -0.5rem;
    padding: 0.5rem;
    line-height: 1.5;
    border-radius: 3px 0 0 3px;
    background: #fff;
    /* border-right: 1px solid #ddd; */
    color: #000;
    overflow: auto;
`;

//template style
const List = styled.div`
    border: 1px ${(props) => (props.isDraggingOver ? 'dashed #101' : 'solid #asd')};
    background: #fff;
    padding: 0.5rem 1.8rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

//template right
const Kiosk = styled(List)`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 200px;
`;
//color drop box
const Container = styled(List)`
    display: flex;
    margin: 0.5rem 0.5rem 1.5rem;
    background: #ccc;
    overflow: auto;
`;

//style of drop box
const Notice = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0.5rem;
    margin: 0 0.5rem 0.5rem;
    border: 1px solid transparent;
    line-height: 1.5;
    color: #aaa;
`;

// const Button = styled.button`
//     display: flex;
//     align-items: center;
//     align-content: center;
//     justify-content: center;
//     margin: 0.5rem;
//     padding: 0.5rem;
//     color: #000;
//     border: 1px solid #ddd;
//     background: #fff;
//     border-radius: 3px;
//     font-size: 1rem;
//     cursor: pointer;
// `;

const ButtonText = styled.div`
    margin: 0 1rem;
`;

const TEMPLATE = [
    {
        id: uuid(),
        content: `images/template/Bp1.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp2.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp3.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp3.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp3.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp4.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp4.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp4.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp4.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp4.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp5.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp5.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp5.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp6.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp6.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp6.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp6.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp7.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp7.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp7.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp7.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp8.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp8.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp9.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp9.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp9.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp9.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp9.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp9.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp10.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp10.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp10.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp11.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp11.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp11.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp11.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp12.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp12.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp12.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp13.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp13.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp13.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp13.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp13.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp14.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp14.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp14.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp15.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp15.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp15.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp15.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp15.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp16.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp16.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp16.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp17.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp17.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp18.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp18.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp18.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp18.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp18.png`,
    },
    {
        id: uuid(),
        content: `images/template/Bp18.png`,
    },
];

const ITEMS = [
    {
        id: uuid(),
        content: `images/template/Sh1.png`,
    },
    {
        id: uuid(),
        content: `images/template/Sh2.png`,
    },
    {
        id: uuid(),
        content: `images/template/Sh3.png`,
    },
    {
        id: uuid(),
        content: `images/template/Sh4.png`,
    },
    {
        id: uuid(),
        content: `images/template/Sh5.png`,
    },
    {
        id: uuid(),
        content: `images/template/Sh7.png`,
    },
    {
        id: uuid(),
        content: `images/template/Sh8.png`,
    },
    {
        id: uuid(),
        content: `images/template/Sh9.png`,
    },
    {
        id: uuid(),
        content: `images/template/Sh10.png`,
    },
    {
        id: uuid(),
        content: `images/template/Sh11.png`,
    },
];

export default function AnimaticCreator() {
    const [state, setState] = useState({ [uuid()]: [] });
    const [audioTrack, setAudioTrack] = useState(Audio_BGM);
    const [open, setOpen] = useState(true);

    const loadTemplate = () => {
        setState({ [Object.keys(state)]: TEMPLATE });
    };

    const handleClickOpenPopup = () => {
        setOpen(true);
    };

    const handleClosePopup = () => {
        setOpen(false);
    };

    const handleLoadTemplatePopup = () => {
        loadTemplate();
        handleClosePopup();
    };

    const getListImages = () => {
        let array = Object.values(state);
        let imageList = [];
        array.forEach((entry) => {
            for (const image of entry) {
                imageList.push({ src: image.content, duration: 5000 });
            }
        });
        return imageList;
    };

    const deleteImage = () => {
        let newState = [...state];
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                setState({
                    [destination.droppableId]: reorder(
                        state[source.droppableId],
                        source.index,
                        destination.index
                    ),
                });
                break;
            case 'ITEMS':
                setState({
                    [destination.droppableId]: copy(
                        ITEMS,
                        state[destination.droppableId],
                        source,
                        destination
                    ),
                });
                break;
            default:
                setState(
                    move(
                        state[source.droppableId],
                        state[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }
    };

    const handleAudioSelectButton = (e) => {
        setAudioTrack(e.target.value);
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClosePopup}
                    aria-labelledby="initial-setting-dialog-title"
                    aria-describedby="initial-setting-dialog-description"
                >
                    <DialogTitle id="initial-setting-dialog-title">
                        {'Welcome to RBOL Animatic Creator'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="initial-setting-dialog-description">
                            Recommend to load template for a quick start.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePopup} autoFocus>
                            Start new
                        </Button>
                        <Button onClick={handleLoadTemplatePopup}>Load template</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Typography align="center" variant="h2">
                Video Editor
            </Typography>
            <Droppable droppableId="ITEMS" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <Kiosk ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                        <Typography align="center">Scene Library</Typography>
                        {ITEMS.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <React.Fragment>
                                        <Item
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            isDragging={snapshot.isDragging}
                                            style={provided.draggableProps.style}
                                        >
                                            <img
                                                src={item.content}
                                                alt="new"
                                                loading="lazy"
                                                style={{ height: '100%', width: '100%' }}
                                            />
                                        </Item>
                                        {snapshot.isDragging && (
                                            <Clone>
                                                <img
                                                    src={item.content}
                                                    alt="new"
                                                    loading="lazy"
                                                    style={{ height: '100%', width: '100%' }}
                                                />
                                            </Clone>
                                        )}
                                    </React.Fragment>
                                )}
                            </Draggable>
                        ))}
                    </Kiosk>
                )}
            </Droppable>
            <Content>
                {Object.keys(state).map((list, i) => {
                    return (
                        <Droppable key={list} direction="horizontal" droppableId={list}>
                            {(provided, snapshot) => (
                                <Container
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {state[list].length
                                        ? state[list].map((item, index) => (
                                              <Draggable
                                                  key={item.id}
                                                  draggableId={item.id}
                                                  index={index}
                                              >
                                                  {(provided, snapshot) => (
                                                      <Item
                                                          ref={provided.innerRef}
                                                          {...provided.draggableProps}
                                                          isDragging={snapshot.isDragging}
                                                          style={provided.draggableProps.style}
                                                      >
                                                          <Handle {...provided.dragHandleProps}>
                                                              {/* <svg
                                                                          width="24"
                                                                          height="24"
                                                                          viewBox="0 0 24 24">
                                                                          <path
                                                                              fill="currentColor"
                                                                              d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                                                          />
                                                                      </svg> */}
                                                              <img
                                                                  src={item.content}
                                                                  alt="new"
                                                                  loading="lazy"
                                                                  style={{
                                                                      height: '90px',
                                                                      width: '160px',
                                                                  }}
                                                              />
                                                          </Handle>
                                                      </Item>
                                                  )}
                                              </Draggable>
                                          ))
                                        : !provided.placeholder && <Notice>Drop items here</Notice>}
                                    {provided.placeholder}
                                </Container>
                            )}
                        </Droppable>
                    );
                })}
            </Content>
            <Button
                style={{ marginLeft: '200px' }}
                onClick={() => {
                    console.log(state);
                    console.log(Object.keys(state));
                    console.log(getListImages());
                    loadTemplate();
                    console.log(state);
                }}
            >
                Load Template
            </Button>
            <RenderVideo listOfImages={getListImages()} audioFile={audioTrack} />
            <Box
                sx={{ minWidth: 120 }}
                width={200}
                position="absolute"
                top="30%"
                marginLeft="200px"
            >
                <FormControl fullWidth>
                    <InputLabel id="audio-select-label">Background Music</InputLabel>
                    <Select
                        labelId="audio-select-label"
                        id="audio-select"
                        value={audioTrack}
                        label="Audio"
                        onChange={handleAudioSelectButton}
                    >
                        <MenuItem value={Audio_BGM}>Audio_BGM_Voice</MenuItem>
                        <MenuItem value={Red_Music}>Red_Music</MenuItem>
                        <MenuItem value={Buddha_Music}>Buddha_Music</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </DragDropContext>
    );
}
