import { Box, Modal } from "@mui/material";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "12px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const CModal = ({
  isOpen,
  children,
  width = 400,
}: {
  isOpen: boolean;
  children: JSX.Element;
  width?: number;
}) => {
  return (
    <Modal open={isOpen}>
      <Box sx={{ ...style, width }}>{children}</Box>
    </Modal>
  );
};

export default CModal;
