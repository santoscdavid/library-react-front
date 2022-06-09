import { Skeleton } from '@mui/material';

export default function Loading() {
    return <Skeleton animation="wave" variant="rectangular" height="heightAuto" sx={{ marginTop: '10px' }} />;
}
