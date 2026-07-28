import { FC, Fragment, ReactNode } from "react";
import { DiagramToken } from "~/core/lexer";
import { DiagramNode, DiagramNodeKind } from "~/core/parser";
import { StructogramBinaryBranch } from "./structogram/blocks/StructogramBinaryBranch";
import { StructogramError } from "./structogram/blocks/StructogramError";
import { StructogramFunction } from "./structogram/blocks/StructogramFunction";
import { StructogramLoopFirst } from "./structogram/blocks/StructogramLoopFirst";
import { StructogramLoopLast } from "./structogram/blocks/StructogramLoopLast";
import { StructogramProcess } from "./structogram/blocks/StructogramProcess";

const DiagramProcess: FC<{
  bodyTokens?: DiagramToken[];

  border: Partial<{
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }>;
}> = (props) => {
  return (
    <StructogramProcess border={props.border}>
      {props.bodyTokens
        ?.map((token) => token.text)
        .join("")
        .trim() || undefined}
    </StructogramProcess>
  );
};

export const DiagramLoopFirst: FC<{
  conditionTokens?: DiagramToken[];
  body: DiagramNode[];

  border: Partial<{
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }>;
}> = (props) => {
  const { conditionTokens, body, ...rest } = props;

  let conditionText: string | undefined = undefined;
  if (conditionTokens !== undefined && conditionTokens.length > 0) {
    conditionText = conditionTokens
      .map((token) => token.text)
      .join("")
      .trim();
  }
  let bodyNode: ReactNode | ReactNode[] = (
    <DiagramProcess border={{ top: true, left: true }} />
  );
  if (body.length > 0) {
    bodyNode = body.map((subnode, index) => (
      <Diagram
        key={`subnode-${index}`}
        border={{ top: true, left: true }}
        node={subnode}
      />
    ));
  }

  return (
    <StructogramLoopFirst {...rest} condition={conditionText}>
      {bodyNode}
    </StructogramLoopFirst>
  );
};

type DiagramLoopLastProps = {
  conditionTokens?: DiagramToken[];
  body: DiagramNode[];

  border: Partial<{
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }>;
};
export const DiagramLoopLast: FC<DiagramLoopLastProps> = (props) => {
  const { conditionTokens, body, ...rest } = props;

  let conditionText: string | undefined = undefined;
  if (conditionTokens !== undefined && conditionTokens.length > 0) {
    conditionText = conditionTokens
      .map((token) => token.text)
      .join("")
      .trim();
  }

  let bodyNode: ReactNode | ReactNode[] = (
    <DiagramProcess border={{ bottom: true, left: true }} />
  );
  if (body.length > 0) {
    bodyNode = body.map((subnode, index) => (
      <Diagram
        key={`subnode-${index}`}
        node={subnode}
        border={{ bottom: true, left: true }}
      />
    ));
  }
  return (
    <StructogramLoopLast {...rest} condition={conditionText}>
      {bodyNode}
    </StructogramLoopLast>
  );
};

export const DiagramIfElse: FC<{
  conditionTokens?: DiagramToken[];
  bodyIf: DiagramNode[];
  bodyElse: DiagramNode[];

  border: Partial<{
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }>;
}> = (props) => {
  return (
    <StructogramBinaryBranch
      border={props.border}
      condition={
        props.conditionTokens
          ?.map((token) => token.text)
          .join("")
          .trim() || undefined
      }
      childrenIf={
        props.bodyIf.length === 0 ? (
          <DiagramProcess border={{ top: true }} />
        ) : (
          props.bodyIf.map((subnode, index) => (
            <Diagram
              key={`index-${index}`}
              border={{ top: true }}
              node={subnode}
            />
          ))
        )
      }
      childrenElse={
        props.bodyElse.length === 0 ? (
          <DiagramProcess border={{ top: true }} />
        ) : (
          props.bodyElse.map((subnode, index) => (
            <Diagram
              key={`index-${index}`}
              border={{ top: true }}
              node={subnode}
            />
          ))
        )
      }
    />
  );
};

type DiagramFunctionProps = {
  declarationTokens: DiagramToken[];
  body: DiagramNode[];

  border: Partial<{
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }>;
};
const DiagramFunction: FC<DiagramFunctionProps> = (props) => {
  const { declarationTokens, body, ...rest } = props;

  let declarationText: string | undefined = undefined;
  if (declarationTokens !== undefined && declarationTokens.length > 0) {
    declarationText = declarationTokens
      .map((token) => token.text)
      .join("")
      .trim();
  }

  let bodyNode: ReactNode | ReactNode[] = (
    <DiagramProcess border={{ top: true, left: true, right: true }} />
  );
  if (body.length > 0) {
    bodyNode = body.map((subnode, index) => (
      <Diagram
        key={`subnode-${index}`}
        node={subnode}
        border={{ top: true, left: true, right: true }}
      />
    ));
  }

  return (
    <StructogramFunction {...rest} declaration={declarationText}>
      {bodyNode}
    </StructogramFunction>
  );
};

export const Diagram: FC<{
  node: DiagramNode;

  border: Partial<{
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }>;
}> = (props) => {
  switch (props.node.kind) {
    case DiagramNodeKind.ERROR:
      return (
        <StructogramError
          border={props.border}
          caretOffset={props.node.caretOffset}
          context={props.node.context}
          reason={props.node.reason}
          lineNumber={props.node.lineNumber}
          charNumber={props.node.charNumber}
        />
      );
    case DiagramNodeKind.FUNCTION:
      return (
        <DiagramFunction
          declarationTokens={props.node.declaration}
          body={props.node.body}
          border={props.border}
        />
      );
    case DiagramNodeKind.LOOP_FIRST:
      return (
        <DiagramLoopFirst
          border={props.border}
          conditionTokens={props.node.condition}
          body={props.node.body}
        />
      );
    case DiagramNodeKind.LOOP_LAST:
      return (
        <DiagramLoopLast
          border={props.border}
          conditionTokens={props.node.condition}
          body={props.node.body}
        />
      );
    case DiagramNodeKind.IF_ELSE:
      return (
        <DiagramIfElse
          border={props.border}
          conditionTokens={props.node.condition}
          bodyIf={props.node.bodyIf}
          bodyElse={props.node.bodyElse}
        />
      );
    case DiagramNodeKind.PROCESS:
      return (
        <DiagramProcess border={props.border} bodyTokens={props.node.body} />
      );
    default:
      return <Fragment />;
  }
};
