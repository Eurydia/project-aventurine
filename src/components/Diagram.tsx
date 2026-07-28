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

type DiagramIfElseProps = {
  conditionTokens?: DiagramToken[];
  bodyIf: DiagramNode[];
  bodyElse: DiagramNode[];

  border: Partial<{
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }>;
};
export const DiagramIfElse: FC<DiagramIfElseProps> = (props) => {
  const { conditionTokens, bodyIf, bodyElse, ...rest } = props;

  let conditionText: string | undefined;
  if (conditionTokens !== undefined && conditionTokens.length > 0) {
    conditionText = conditionTokens
      .map((token) => token.text)
      .join("")
      .trim();
  }
  let bodyNodeIf: ReactNode | ReactNode[] = (
    <DiagramProcess border={{ top: true }} />
  );
  if (bodyIf.length > 0) {
    bodyNodeIf = bodyIf.map((subnode, index) => (
      <Diagram key={`index-${index}`} border={{ top: true }} node={subnode} />
    ));
  }

  let bodyNodeElse: ReactNode | ReactNode[] = (
    <DiagramProcess border={{ top: true }} />
  );
  if (bodyElse.length > 0) {
    bodyNodeElse = bodyElse.map((subnode, index) => (
      <Diagram key={`index-${index}`} border={{ top: true }} node={subnode} />
    ));
  }

  return (
    <StructogramBinaryBranch
      {...rest}
      condition={conditionText}
      childrenIf={bodyNodeIf}
      childrenElse={bodyNodeElse}
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

type DiagramProps = {
  node: DiagramNode;

  border: Partial<{
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }>;
};
export const Diagram: FC<DiagramProps> = (props) => {
  const { node, ...rest } = props;

  switch (node.kind) {
    case DiagramNodeKind.ERROR:
      return (
        <StructogramError
          {...rest}
          caretOffset={node.caretOffset}
          context={node.context}
          reason={node.reason}
          lineNumber={node.lineNumber}
          charNumber={node.charNumber}
        />
      );
    case DiagramNodeKind.FUNCTION:
      return (
        <DiagramFunction
          declarationTokens={node.declaration}
          body={node.body}
          {...rest}
        />
      );
    case DiagramNodeKind.LOOP_FIRST:
      return (
        <DiagramLoopFirst
          {...rest}
          conditionTokens={node.condition}
          body={node.body}
        />
      );
    case DiagramNodeKind.LOOP_LAST:
      return (
        <DiagramLoopLast
          {...rest}
          conditionTokens={node.condition}
          body={node.body}
        />
      );
    case DiagramNodeKind.IF_ELSE:
      return (
        <DiagramIfElse
          {...rest}
          conditionTokens={node.condition}
          bodyIf={node.bodyIf}
          bodyElse={node.bodyElse}
        />
      );
    case DiagramNodeKind.PROCESS:
      return <DiagramProcess {...rest} bodyTokens={node.body} />;
  }
  return <Fragment />;
};
