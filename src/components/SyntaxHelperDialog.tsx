import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";

const syntaxItems = [
  {
    label: "Process",
    description:
      "Any free-form text becomes a process when it ends with a semicolon.",
    pattern: "#;",
    examples: ["total = price * quantity;", "Send invoice to customer;"],
  },
  {
    label: "If / else",
    description:
      "Conditions and process text are free-form. The else branch is optional.",
    pattern: `if (#) {
  #;
} else {
  #;
}`,
    examples: [
      `if (score >= 50) {
  result = pass;
} else {
  result = retry;
}`,
      `if (order is paid) {
  Prepare shipment;
} else {
  Request payment;
}`,
    ],
  },
  {
    label: "For loop",
    description:
      "The parser preserves any loop expression placed between the parentheses.",
    pattern: `for (#) {
  #;
}`,
    examples: [
      `for (i = 0; i < 5; i = i + 1) {
  total = total + i;
}`,
      `for (each item) {
  Add item to total;
}`,
    ],
  },
  {
    label: "While loop",
    description:
      "The condition is checked before the body and may contain free-form text.",
    pattern: `while (#) {
  #;
}`,
    examples: [
      `while (items > 0) {
  items = items - 1;
}`,
      `while (queue has items) {
  Process next item;
}`,
    ],
  },
  {
    label: "Do / while loop",
    description:
      "The body runs before the condition. A trailing semicolon is required.",
    pattern: `do {
  #;
} while (#);`,
    examples: [
      `do {
  items = items - 1;
} while (items > 0);`,
      `do {
  Ask for confirmation;
} while (answer is missing);`,
    ],
  },
  {
    label: "Function",
    description:
      "Any declaration followed by a brace-delimited body is treated as a function.",
    pattern: `# #(#) {
  #;
}`,
    examples: [
      `int add(int x, int y) {
  result = x + y;
}`,
      `workflow prepare(order) {
  Validate order;
  Pack order;
}`,
    ],
  },
  {
    label: "Inline LaTeX",
    description:
      "Dollar-delimited LaTeX can appear anywhere inside free-form process text.",
    pattern: "# = $...$;",
    examples: ["formula = $x^2 + y^2$;", "sequence = $a_1 + a_2 + a_3$;"],
  },
] as const;

export const SyntaxHelperDialog: FC<{
  open: boolean;
  onClose: () => void;
}> = (props) => {
  const { onClose, open } = props;

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} scroll="body">
      <DialogTitle>Syntax helper</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={4}>
          <Paper variant="outlined" sx={{ padding: 2 }}>
            <Stack spacing={1}>
              <Typography component="h3" variant="h6">
                Free-form input with a few structural rules
              </Typography>
              <Typography>
                Most input is arbitrary. Outside recognized syntax blocks,
                everything before a terminating semicolon is displayed as
                process text.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Only if / else, for, while, do / while, declarations followed by
                brace-delimited bodies, and balanced parentheses or braces are
                parsed structurally. Inline LaTeX is supported between single
                dollar signs.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                // starts a comment, so the remaining text on that line is
                ignored.
              </Typography>
            </Stack>
          </Paper>

          <Stack spacing={2}>
            {syntaxItems.map((item) => (
              <Paper key={item.label} variant="outlined" sx={{ padding: 2 }}>
                <Stack spacing={2}>
                  <Stack spacing={0.5}>
                    <Typography component="h3" variant="h6">
                      {item.label}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </Stack>

                  <Stack spacing={1}>
                    <Typography variant="overline">Pattern</Typography>
                    <Paper
                      component="pre"
                      variant="outlined"
                      sx={(theme) => ({
                        margin: 0,
                        padding: 2,
                        overflow: "auto",
                        whiteSpace: "pre-wrap",
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.action.hover,
                        fontFamily: theme.typography.fontFamily,
                        fontSize: theme.typography.body2.fontSize,
                        lineHeight: theme.typography.body2.lineHeight,
                      })}
                    >
                      {item.pattern}
                    </Paper>
                  </Stack>

                  <Stack spacing={1}>
                    <Typography variant="overline">Examples</Typography>
                    {item.examples.map((example) => (
                      <Paper
                        key={example}
                        component="pre"
                        variant="outlined"
                        sx={(theme) => ({
                          margin: 0,
                          padding: 2,
                          overflow: "auto",
                          whiteSpace: "pre-wrap",
                          color: theme.palette.text.primary,
                          backgroundColor: theme.palette.action.hover,
                          fontFamily: theme.typography.fontFamily,
                        })}
                      >
                        {example}
                      </Paper>
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
