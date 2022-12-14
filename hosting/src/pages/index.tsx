import { useState, useContext } from "react";
import { Card, CardContent } from "@mui/material";

import Tabs from "@components/common/Tabs";
import MemeCreator from "@components/MemeCreator";
import TemplatesList from "@components/ElementsList";
import MemePreview from "@components/MemePreview";

import { TemplateModel } from "@shared/models/template";
import { AppContext } from "@components/AppContextProvider";
import RequiredSignedIn from "@components/common/RequiredSignedIn";
import { MemeModel } from "@shared/models/meme";

export default function IndexPage() {
  const { templates, favourites, memes } = useContext(AppContext);
  const [currentTemplate, setCurrentTemplate] = useState<TemplateModel | null>(
    null
  );
  const [meme, setMeme] = useState<MemeModel | null>(null);
  const handleTemplateClick = (template: TemplateModel) => {
    setMeme(null);
    setCurrentTemplate(template);
  };

  const handleMemeClick = (meme: MemeModel) => {
    setMeme(meme);
    setCurrentTemplate(null);
  };

  const onMemeDeleted = () => {
    setMeme(null);
  };

  return (
    <Card>
      <CardContent>
        <Tabs
          items={[
            {
              label: "Popular",
              render: () => (
                <TemplatesList
                  elements={templates}
                  handleElementClick={handleTemplateClick}
                />
              ),
            },
            {
              label: "Favourites",
              render: () => (
                <RequiredSignedIn message="Sign in to see your favourites memes">
                  <TemplatesList
                    elements={favourites}
                    handleElementClick={handleTemplateClick}
                  />
                </RequiredSignedIn>
              ),
            },
            {
              label: "My memes",
              render: () => (
                <RequiredSignedIn message="Sign in to save your memes">
                  <TemplatesList
                    elements={memes}
                    handleElementClick={handleMemeClick}
                  />
                </RequiredSignedIn>
              ),
            },
          ]}
        />
        <MemeCreator template={currentTemplate} />
        {meme && <MemePreview meme={meme} onDeleted={onMemeDeleted} />}
      </CardContent>
    </Card>
  );
}
