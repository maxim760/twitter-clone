import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  visible?: boolean;
  apply?: boolean;
  applyTitle?: string;
  isModalPhoto?: boolean;
  onClose(): void;
  onApply?(): void;
}

export const ModalBlock: React.FC<ModalProps> = ({
  children,
  title,
  applyTitle = "Ок",
  visible = false,
  isModalPhoto = false,
  apply = false,
  onClose,
  onApply = () => {},
}: ModalProps): React.ReactElement | null => {
  if (!visible) {
    return null;
  }
  return (
    <Dialog
      data-testid="modal"
      open={visible}
      onClose={onClose}
      className={isModalPhoto ? "modal-add-tweet" : ""}
    >
      <DialogTitle id="form-dialog-title">
        <IconButton
          data-testid="closeModal"
          onClick={onClose}
          color="secondary"
          aria-label="close"
        >
          <CloseIcon style={{ fontSize: 26 }} />
        </IconButton>
        {title}
        {apply ? (
          <Button
            style={{
              fontWeight: 700,
              marginLeft: "auto",
              padding: "5px 15px",
              transitionDuration: "0.1s",
              transitionDelay: "0",
            }}
            color="secondary"
            data-testid="applyModal"
            variant="contained"
            onClick={onApply}
            aria-label="apply"
          >
            {applyTitle}
          </Button>
        ) : null}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
