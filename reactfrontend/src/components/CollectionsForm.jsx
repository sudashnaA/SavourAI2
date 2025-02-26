import Form from "./Form";

const CollectionsForm = ({mode, onSubmit, setTitle, buttonVal}) => {
    return (
        <>
        { mode &&
            <Form handleSubmit={onSubmit}>
                <div><input required onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title"></input> <input type="submit" value={buttonVal}></input></div>
            </Form>
        }
        </>
    )
}

export default CollectionsForm;