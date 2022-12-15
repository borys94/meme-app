import { useState, useContext, useEffect, useRef } from "react";
import { Stack, Box, Divider } from "@mui/material";

import { useAddMemeMutation } from "@stores/api/user";
import { AppContext } from "@components/AppContextProvider";
import TemplateEditor from "@components/TemplateEditor";

import { TemplateModel, TemplateText } from "@shared/models/template";
import generateMeme from "@utils/generateMeme";
import canvasUtils from "@utils/canvas";
import { createEmptyText } from "@utils/createEmptyText";
import { dispatchMouseDownEvent } from "@utils/dispatchMouseDownEvent";
import { useDocument, QUERIES } from "@services/queries";

import ButtonList from "./ButtonList";

interface Props {
  templateId: string | null;
}

export default function MemeCreator({ templateId }: Props) {
  const textRefs = useRef([]);
  const { user } = useContext(AppContext);
  const [template] = useDocument<TemplateModel>(QUERIES.GET_TEMPLATE, {
    templateId,
  });
  const [shouldFocusLastInput, setShouldFocusLastInput] = useState(false);
  const [texts, setTexts] = useState<TemplateText[]>([]);
  const [addMemeRequest, { isLoading: isAddMemeLoading }] =
    useAddMemeMutation();

  const uploadMeme = async () => {
    if (user) {
      const canvas = await getCanvasMeme();
      await addMemeRequest({
        userId: user.id,
        templateId: template.id,
        image: canvas.toDataURL(),
      });
    }
  };

  const downloadMeme = async () => {
    canvasUtils.download(await getCanvasMeme());
  };

  const addText = () => {
    setTexts([
      ...texts,
      createEmptyText(texts.length ? texts[texts.length - 1] : null),
    ]);
    setShouldFocusLastInput(true);
  };

  const getCanvasMeme = () => generateMeme(template, textRefs.current);

  useEffect(() => {
    if (shouldFocusLastInput) {
      if (textRefs.current.length && textRefs.current[0]) {
        dispatchMouseDownEvent(textRefs.current[0]);
      }
      setShouldFocusLastInput(false);
    }
  }, [shouldFocusLastInput]);

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Divider sx={{ mb: 4 }} />
      {template && (
        <Box>
          <Stack
            direction={{ md: "row", xs: "column" }}
            justifyContent="center"
          >
            <TemplateEditor
              template={template}
              textRefs={textRefs}
              texts={texts}
              onChange={setTexts}
            />
            <Stack>
              <ButtonList
                templateId={template.id}
                likes={template.likes}
                hasUploadButton={!!user}
                isUploading={isAddMemeLoading}
                onAddText={addText}
                onDownload={downloadMeme}
                onUpload={uploadMeme}
              />
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
