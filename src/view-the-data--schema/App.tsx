import { JsonSchemaViewer } from "@stoplight/json-schema-viewer";
import {
  injectStyles,
  Box,
  Provider as MosaicProvider,
} from "@stoplight/mosaic";
import schema from "./../../schema.json";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  injectStyles();
  return (
    <>
      <MosaicProvider>
        <Box
          mx="auto"
          // py={20}
          // px={8}
          style={{ maxWidth: 800 }}>
          <JsonSchemaViewer
            name="Site Submission Schema"
            schema={schema}
            hideTopBar={false}
            emptyText="No schema defined"
            expanded={true}
            defaultExpandedDepth={0}
            renderRootTreeLines={true}
          />
        </Box>
      </MosaicProvider>
    </>
  );
}

export default App;
