import { useState } from "react";
import { Card, CardContent } from "@mui/material";

import Tabs from "@components/common/Tabs";
import MemeCreator from "@components/MemeCreator";
import FavouritesMemes from "@components/FavouritesMemes";
import PopularMemes from "@components/PopularMemes";
import MyMemes from "@components/MyMemes";

import { TemplateModel } from "@shared/models/template";

export default function IndexPage() {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateModel | null>(
    null
  );
  const handleTemplateClick = (template: TemplateModel) => {
    if (template.id !== currentTemplate.id) {
      setCurrentTemplate(template);
    }
  };

  return (
    <Card>
      <CardContent>
        <Tabs
          items={[
            {
              label: "Popular",
              render: () => (
                <PopularMemes handleTemplateClick={handleTemplateClick} />
              ),
            },
            {
              label: "Favourites",
              render: () => (
                <FavouritesMemes handleTemplateClick={handleTemplateClick} />
              ),
            },
            {
              label: "My memes",
              render: () => <MyMemes />,
            },
          ]}
        />
        <MemeCreator template={currentTemplate} />
      </CardContent>
    </Card>
  );
}
