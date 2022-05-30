import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Row, Col } from 'react-bootstrap'

const ItemTypes = {
    FILE: 'file',
}
const style = {
    border: '1px solid gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: '#203038',
    cursor: 'move',
    width: "100%",
}
export const Card = ({ _id, name, path, format, duration, index, moveCard }) => {
    const ref = useRef(null)

    // const nameChange = (e) => {
    //     name = e.target.value
    // }

    const saveChanges = (e) => {

    }

    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.FILE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
            console.log(name)

        },
        changeName(){

        }
    })
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.FILE,
        item: () => {
            return { _id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <Row ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
            <Col xs={2}>
                <Row xs={2}></Row>
               <div style={{color:"white", fontSize:"30px", position:"middle"}}>#{`${index + 1}`}</div>
            </Col>
            <Col>
            { (() => {
                    switch(format){
                        default: return 0;
                        case "image" :
                            return <img src={`${path}`} alt="" style={{maxWidth:"33%", maxHeight: "100%"}}/>
                        case "video" :
                            return <video src={`${path}`} alt="" style={{maxWidth:"33%", maxHeight: "100%"}}/>
                    }
            }) () }
            </Col>
            <Col>
                <form action="">

                    <input type="text" />

                    {/*<Button onClick={}>HELLO</Button>*/}
                </form>
            </Col>
        </Row>
    )
}