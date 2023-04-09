import React from "react";

type SmartTextProps = {
  text: string;
  length: number;
};
const SmartText = ({ text, length }: SmartTextProps) => {
  const [showLess, setShowLess] = React.useState(true);

  if (text.length < length) {
    return <p>{text}</p>;
  }

  return (
    <div>
      <div className="">
        <p
          dangerouslySetInnerHTML={{
            __html: showLess ? `${text.slice(0, length)}...` : text,
          }}
        />
        <a
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setShowLess(!showLess)}
        >
          &nbsp;View {showLess ? "More..." : "Less"}
        </a>
      </div>
    </div>
  );
};

export default SmartText;
