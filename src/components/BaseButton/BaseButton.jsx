import { Button } from '@mui/material';

function BaseButton({ title, click }) {
    return (
        <Button onClick={click} variant="success">
            {title}
        </Button>
    );
}

export default BaseButton;
