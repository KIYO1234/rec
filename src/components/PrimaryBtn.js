import Button from '@material-ui/core/Button';

export const PrimaryBtn = props => {
    return (
        <Button className={props.className} color='primary' variant='contained' onClick={props.onClick}>
            {props.label}
        </Button>
    )

}