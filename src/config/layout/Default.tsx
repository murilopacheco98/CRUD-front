import React from "react";

interface LayoutDefaultProps {
  component: React.FC;
}

const LayoutDefault: React.FC<LayoutDefaultProps> = ({
  component: Component,
}) => {
  return (
    <React.Fragment>
      <Component />
    </React.Fragment>
  );
};

export default LayoutDefault;
