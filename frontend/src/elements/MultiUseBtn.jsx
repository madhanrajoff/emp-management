import React from "react";

import Button from "@material-ui/core/Button";

const ActionBtn = ({
  className = null,
  style = null,
  variant = null,
  actionBtnText,
  actionBtnType = "button",
  actionBtnFunc,
  fullWidth = false,
  color = "primary",
  size = "medium",
  disabled = false
}) => (
  <Button
    className={className}
    style={style}
    variant={variant}
    onClick={actionBtnFunc}
    type={actionBtnType}
    fullWidth={fullWidth}
    color={color}
    size={size}
    disabled={disabled}
  >
    {actionBtnText}
  </Button>
);

export { ActionBtn };
