import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundColor : "#ffffffd8"
};

export default function BasicModal({head , body , open , Close}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={Close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="text-sm">{head}</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>{body}</Typography>
        </Box>
      </Modal>
    </div>
  );
}
