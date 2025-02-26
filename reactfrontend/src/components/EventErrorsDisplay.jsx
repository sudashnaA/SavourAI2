import FormErrors from "./FormErrors";

const EventErrorsDisplay = ({eventErrors}) => {
    return (
        <>{(eventErrors) && ( eventErrors.status === 400 ? <FormErrors errors={eventErrors.response.data.errors}/> : <h2>A network error was encountered</h2>)}</>
    )
}

export default EventErrorsDisplay;